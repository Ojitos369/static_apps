# Python
import os
import json

# Ojitos369
from ojitos369.utils import print_json as pj

# User
from app.core.bases.apis import PostApi, GetApi, get_d, pln
from .chat import Chat as ChatGPT

class HelloWorld(GetApi):
    def main(self):
        self.response = {
            'message': 'Hola desde gpt'
        }

class Chat(PostApi):
	def main(self):
		valid_key = os.environ.get("GPT_CON_CHAT_KEY")
		message = self.data["message"]
		key = self.data["key"]
		origen = self.data["origen"]
		if key != valid_key:
			self.status = 403
			raise self.MYE("Key invalida")

		if not message:
			self.status = 400
			raise self.MYE("Mensaje vacio")

		chat = ChatGPT(origen=origen)
		message = chat.run_chat(message)
		
		self.response = {
			"message": message,
		}
		
		