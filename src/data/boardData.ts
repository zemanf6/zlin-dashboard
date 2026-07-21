import type { LucideIcon } from "lucide-react";
import { BusFront, CalendarDays, Landmark, Trees } from "lucide-react";

export type BoardPost = {
  id: string;
  category: "news" | "events" | "transport" | "city";
  categoryLabel: string;
  title: string;
  body: string;
  date: string;
  time: string;
  author: string;
  authorRole: string;
  imageUrl?: string;
  articleUrl: string;
  icon: LucideIcon;
  featured?: boolean;
};

export const boardPosts: BoardPost[] = [
  {
    id: "summer-cinema",
    category: "events",
    categoryLabel: "Kultura a akce",
    title: "Letní kino v parku Komenského",
    body: "Přijďte v pátek do parku Komenského na letní kino pod širým nebem. Promítání začíná ve 21:00, vstup je zdarma. Doporučujeme vzít si vlastní deku nebo skládací židli.",
    date: "18. 7. 2026",
    time: "10:00",
    author: "Město Zlín",
    authorRole: "Kulturní program",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80",
    articleUrl: "https://www.zlin.eu/aktuality",
    icon: CalendarDays,
    featured: true,
  },
  {
    id: "tomas-bata-street",
    category: "transport",
    categoryLabel: "Doprava",
    title: "Oprava povrchu na třídě T. Bati",
    body: "Oprava proběhne v úseku mezi ulicemi Dlouhá a Díly. Doprava zůstane průjezdná jedním jízdním pruhem, v dopravní špičce proto počítejte s možným zdržením.",
    date: "17. 7. 2026",
    time: "14:25",
    author: "Odbor dopravy",
    authorRole: "Magistrát města Zlína",
    imageUrl: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    articleUrl: "https://www.zlin.eu/aktuality",
    icon: BusFront,
  },
  {
    id: "park-renewal",
    category: "city",
    categoryLabel: "Rozvoj města",
    title: "Začíná obnova dětského hřiště v Jižních Svazích",
    body: "Během obnovy přibydou nové herní prvky, bezpečný povrch, lavičky a stromy. Po dobu prací bude hřiště uzavřené; nejbližší náhradní hřiště je v ulici Podlesí.",
    date: "15. 7. 2026",
    time: "09:10",
    author: "Město Zlín",
    authorRole: "Rozvoj města",
    imageUrl: "https://images.unsplash.com/photo-1596997000103-e597b3ca50df?auto=format&fit=crop&w=1200&q=80",
    articleUrl: "https://www.zlin.eu/aktuality",
    icon: Trees,
  },
  {
    id: "office-hours",
    category: "news",
    categoryLabel: "Z radnice",
    title: "Rozšířené úřední hodiny osobních dokladů",
    body: "Pro vyřízení občanských průkazů a cestovních pasů rozšiřujeme v srpnu středeční úřední hodiny do 18:00. Konkrétní čas si můžete rezervovat na portálu.",
    date: "14. 7. 2026",
    time: "08:30",
    author: "Magistrát města Zlína",
    authorRole: "Oddělení osobních dokladů",
    articleUrl: "https://www.zlin.eu/aktuality",
    icon: Landmark,
  },
];
