import { useMemo, useState } from "react";
import {
  Baby, BadgeCheck, CalendarDays, CarFront, ChevronRight, CircleHelp, Dog,
  HeartHandshake, House, IdCard, MapPinHouse, Search, Stamp, UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../components/common/BackButton";
import "../styles/lifeSituations.css";

type Situation = {
  id: string;
  title: string;
  description: string;
  category: "home" | "documents" | "family" | "support" | "events";
  mode: string;
  icon: LucideIcon;
  keywords: string;
};

const categories = [
  { id: "all", label: "Všechny situace" },
  { id: "home", label: "Bydlení a město" },
  { id: "documents", label: "Doklady a doprava" },
  { id: "family", label: "Rodina" },
  { id: "support", label: "Pomoc a péče" },
  { id: "events", label: "Akce a podnikání" },
] as const;

const situations: Situation[] = [
  { id: "moving", title: "Stěhuji se nebo měním trvalý pobyt", description: "Změna adresy, návazné doklady, poplatek za odpad i parkování na jednom místě.", category: "home", mode: "Začnete online", icon: MapPinHouse, keywords: "stěhování adresa trvalý pobyt bydliště" },
  { id: "parking", title: "Potřebuji parkovací oprávnění", description: "Rezidentní parkování, nové vozidlo, změna registrační značky nebo prodloužení.", category: "home", mode: "Vyřídíte online", icon: CarFront, keywords: "parkování auto vozidlo rezident spz" },
  { id: "dog", title: "Pořídil jsem si psa", description: "Přihlášení psa, výběr sazby, úhrada poplatku a pozdější změny údajů.", category: "home", mode: "Vyřídíte online", icon: Dog, keywords: "pes poplatek přihlášení změna" },
  { id: "id-card", title: "Potřebuji nový občanský průkaz", description: "Výměna, ztráta nebo končící platnost. Zjistíte, co přinést a kam přijít.", category: "documents", mode: "Je nutná návštěva", icon: IdCard, keywords: "občanka občanský průkaz výměna ztráta" },
  { id: "passport", title: "Potřebuji cestovní pas", description: "Běžné i zrychlené vydání pasu, potřebné doklady, cena a rezervace termínu.", category: "documents", mode: "Je nutná návštěva", icon: Stamp, keywords: "pas cestovní doklad zahraničí" },
  { id: "driver", title: "Řeším řidičský průkaz", description: "Vydání, výměna, ztráta nebo vyzvednutí hotového řidičského průkazu.", category: "documents", mode: "Online i osobně", icon: BadgeCheck, keywords: "řidičák řidičský průkaz výměna vyzvednutí" },
  { id: "child", title: "Narodilo se mi dítě", description: "Rodný list, trvalý pobyt dítěte a další kroky, na které je dobré nezapomenout.", category: "family", mode: "Průvodce krok za krokem", icon: Baby, keywords: "narození dítě rodný list miminko" },
  { id: "wedding", title: "Chci uzavřít manželství", description: "Termín a místo obřadu, potřebné doklady, poplatky a kontakt na matriku.", category: "family", mode: "Začnete online", icon: UsersRound, keywords: "svatba manželství obřad matrika" },
  { id: "bereavement", title: "Zemřel mi blízký", description: "Citlivý a přehledný postup k matrice, úmrtnímu listu a městskému hřbitovu.", category: "family", mode: "Průvodce krok za krokem", icon: HeartHandshake, keywords: "úmrtí úmrtní list pohřeb matrika hřbitov" },
  { id: "help", title: "Potřebuji pomoc nebo péči", description: "Kontakty a možnosti pomoci pro seniory, pečující, rodiny a lidi v obtížné situaci.", category: "support", mode: "Najdeme správnou pomoc", icon: CircleHelp, keywords: "sociální pomoc senior péče rodina nouze" },
  { id: "event", title: "Chci uspořádat akci nebo shromáždění", description: "Zjistíte, zda potřebujete oznámení, zábor veřejného prostoru, dopravní omezení nebo další povolení.", category: "events", mode: "Průvodce podle typu akce", icon: CalendarDays, keywords: "akce shromáždění festival koncert trh demonstrace zábor veřejný prostor povolení" },
];

export function LifeSituationsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]["id"]>("all");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const search = query.trim().toLocaleLowerCase("cs-CZ");
    return situations.filter((item) => (activeCategory === "all" || item.category === activeCategory) && (!search || `${item.title} ${item.description} ${item.keywords}`.toLocaleLowerCase("cs-CZ").includes(search)));
  }, [activeCategory, query]);

  return <main className="life-page"><div className="life-page__inner">
    <BackButton className="life-page__back" label="Zpět na nástěnku" onClick={() => navigate("/")} />
    <header className="life-hero">
      <div><p>Průvodce službami města</p><h1>Co potřebujete vyřešit?</h1><span>Vyberte situaci, ve které se právě nacházíte. Ukážeme vám srozumitelný postup, potřebné doklady i možnosti vyřízení.</span></div>
      <House size={70} strokeWidth={1.2} aria-hidden="true" />
    </header>
    <section className="life-finder" aria-label="Vyhledání životní situace">
      <label><Search size={22} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Napište například „stěhuji se“ nebo „potřebuji pas“" /><span>{filtered.length} výsledků</span></label>
      <div className="life-categories" role="group" aria-label="Kategorie">{categories.map((item) => <button className={activeCategory === item.id ? "is-active" : ""} type="button" aria-pressed={activeCategory === item.id} onClick={() => setActiveCategory(item.id)} key={item.id}>{item.label}</button>)}</div>
    </section>
    <section className="life-results">
      <div className="life-results__heading"><div><p>Nejčastější životní situace</p><h2>Jednoduše podle toho, co řešíte</h2></div><span>Postup · formuláře · kontakty</span></div>
      {filtered.length > 0 ? <div className="life-grid">{filtered.map((item) => {
        const Icon = item.icon;
        const path = item.id === "moving" ? "/zivotni-situace/stehuji-se" : item.id === "dog" ? "/zivotni-situace/poridil-jsem-si-psa" : null;
        return <button className="life-card" type="button" onClick={path ? () => navigate(path) : undefined} key={item.id}><span className="life-card__icon"><Icon size={27} /></span><span className="life-card__content"><small>{item.mode}</small><strong>{item.title}</strong><span>{item.description}</span><b>Co mám udělat <ChevronRight size={17} /></b></span></button>;
      })}</div> : <div className="life-empty"><Search size={32} /><h3>Takovou situaci jsme nenašli</h3><p>Zkuste kratší výraz nebo zobrazte všechny situace.</p><button type="button" onClick={() => { setQuery(""); setActiveCategory("all"); }}>Zobrazit všechny situace</button></div>}
    </section>
  </div></main>;
}
