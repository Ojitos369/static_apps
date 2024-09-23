# Python
from langchain_community.chat_models.ollama import ChatOllama
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage

# User
from app.core.bases.apis import PostApi, GetApi, get_d, pln, prod_mode


class Llama(GetApi):
    def main(self):
        chat = ChatOllama(model="llama3.1")
        msg = self.data["msg"]
        pln("user:", msg)
        messages = [
            SystemMessage(content="Eres un agente serio. Eres directo y tus respuestas son concisas y breves."),
            HumanMessage(content=msg)
        ]
        response = chat.invoke(messages)
        respuesta = response.content
        
        pln("llama:", respuesta)

        self.response = {
            "msg": respuesta
        }