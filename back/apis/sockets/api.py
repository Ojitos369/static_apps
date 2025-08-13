# apis/sockets/api.py
import httpx
import json
from core.bases.apis import WebSocketApi

class ChatSocketApi(WebSocketApi):
    """
    Lógica de chat que opera de forma 100% asíncrona con un LLM.
    """
    async def stream_llm_response(self, client, data):
        """Generador asíncrono que obtiene el stream del LLM."""
        async with client.stream("POST", self.link, json=data, timeout=None) as response:
            response.raise_for_status()
            async for line in response.aiter_lines():
                if line:
                    yield line

    async def consultar(self, user_message, group_id):
        self.link = "http://localhost:11434/api/generate"
        self.model = "deepseek-r1:1.5b"
        instrucciones = "Eres llmemory, solo daras la respuesta, los roles los manejo por fuera\n"
        data = {
            "model": self.model,
            "prompt": f"{instrucciones}Prompt: {user_message}",
            "stream": True
        }
        
        pensando = False
        
        async with httpx.AsyncClient() as client:
            try:
                async for response_line in self.stream_llm_response(client, data):
                    try:
                        rs = json.loads(response_line)
                    except json.JSONDecodeError:
                        print(f"Error decodificando JSON: {response_line}")
                        continue

                    message = rs.get("response", "")
                    done = rs.get("done", False)

                    if done:
                        await self.manager.broadcast_to_group("-done-", group_id)
                        print("\n--- Stream Done ---")
                        break

                    if "<think>" in message:
                        print("-pensando-")
                        pensando = True
                        message = message.replace("<think>", "")
                    
                    if "</think>" in message:
                        print("-pensando-\n\n")
                        pensando = False
                        message = message.replace("</think>", "")
                    print(message, end="")
                    
                    if not pensando and message:
                        await self.manager.broadcast_to_group(message, group_id)

            except httpx.RequestError as e:
                print(f"Error al conectar con el LLM: {e}")
                error_msg = "Error: No se pudo conectar con el modelo de lenguaje."
                await self.manager.broadcast_to_group(error_msg, group_id)
                await self.manager.broadcast_to_group("-done-", group_id)

    async def on_receive(self, data: str):
        group_id = self.data.get('group_id')
        await self.consultar(data, group_id)

    async def on_connect(self):
        pass

    async def on_disconnect(self):
        pass
