# Python
import unicodedata

# User
from app.core.bases.apis import PostApi, GetApi, get_d, pln, prod_mode


class Codificar(GetApi, PostApi):
    def main(self):
        self.show_me()
        self.text = self.data["text"]
        self.get_unicode()
        self.cod()
        self.response = {
            "text": self.text,
        }

    def get_unicode(self):
        self.text = self.text.upper()
        tl = self.text.split()
        total = ""
        for palabra in tl:
            unicode_list = [hex(ord(c))[2:] for c in palabra]
            unicode = "-".join(unicode_list)
            print(unicode)
            total += unicode + " "
            print(total)
        total = total[:-1] if total else total
        print(total)
        self.text =total.upper()

    def cod(self):
        rep = {
            "1": "31",
            "2": "32",
            "3": "33",
            "4": "34",
            "5": "35",
            "6": "36",
            "7": "37",
            "8": "38",
            "9": "39",
            "A": "41",
            "B": "42",
            "C": "43",
            "D": "44",
            "E": "45",
            "F": "46",
            "-": "--",
            " ": " ",
        }
        final = ""
        for c in self.text:
            final += rep.get(c, c) + "-"
        final = final[:-1]
        final = final.replace("----", "--").replace("- -", " ")
        self.text = final


class Decodificar(GetApi, PostApi):
    def main(self):
        self.show_me()
        self.text = self.data["text"]
        self.decod()
        self.response = {
            "text": self.text,
        }
    
    def decod(self):
        palabras = self.text.split()
        total = ""
        for palabra in palabras:
            letras = palabra.split("--")
            for letra in letras:
                cods = letra.split("-")
                lc = ""
                for cod in cods:
                    if len(cod) > 2:
                        sep = []
                        for i in range(0, len(cod), 2):
                            sep.append(cod[i:i+2])
                        for s in sep:
                            lc += chr(int(s, 16))
                    else:
                        lc += chr(int(cod, 16))
                char = ""
                try:
                    char = chr(int(lc, 16))
                except:
                    char = chr(int(lc[0]+"0", 16))
                if self.is_emoji(char):
                    total += " " + char
                else:
                    total += char

            total += " "
        total = total[:-1] if total else total
        self.text = total
    
    def is_emoji(self, text):
        valids = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        return not all((c in valids) for c in text)


"""

"""
