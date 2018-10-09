import { Note } from "../models/Note";

export const helloNotes: Note[] = [
    Note.newNote("Instrukcja", "czyli jak działa i co potrafi ta apka", "top1", null),
    /**/Note.newNote("Tworzenie notatek", "Głównym celem niniejszej aplikacji jest tworzenie nowych notatek (składających się z dwóch części: nagłówka i opisu).", "2", "top1"),
    /****/Note.newNote("notatki zagnieżdżone", 'Podstawowym bajerem (czyt. featurem) jest możliwość tworzenia notatek "zagnieżdżonych". Czyli notatka "zawiera się" w innej notatce.', "4", "2"),
    /****/Note.newNote("pamiętanie notatek, nawet po resecie (!)", 'Notatki przechowywane są w pamięci przeglądarki (o ile nie jest w trybie prywatnym). \nOdświeżenie strony, zamknięcie zakładki czy nawet przeglądarki, nie spowodują wykasowania notatek :)\n\n', "5", "2"),
    /**/Note.newNote("Zarządzanie","","22","top1"),
    /****/Note.newNote("przenoszenie","","221","22"),
    /****/Note.newNote("poziom w górę",'notatkę można szybko wynieść o jeden poziom w górę (spłycając poziom zagnieżdżenia)',"222","221"),
    /****/Note.newNote("dowolnie, wedgług uznania :)",'Przenoszenie notatek względem siebie na zasadzie "wytnij>wklej".\nWycina się notatkę (właśc. kopiuje do schowka aplikacji), a następnie wkleja jako podNotatkę innej notatki',"223","221"),
    /**/Note.newNote("usuwanie", "1. ...pojedyńczej notki\n2. ...wszystkich podrzędnych/zagnieżdżonych","232","22"),
    /****/Note.newNote("...I inne bajery...","...takie jak rozwijanie czy zmiana statusu (przekreślanie)...","233","22"),
    
    // Note.newNote("CV autora", "...2018.10.07...", "cv-top", null),
]