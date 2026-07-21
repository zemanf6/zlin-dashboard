import { useRef, useState } from "react";
import {
  Camera,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  LampDesk,
  Leaf,
  MapPin,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CityLocationPicker, type CityLocation } from "../components/cityReport/CityLocationPicker";
import { BackButton } from "../components/common/BackButton";
import "../styles/cityReport.css";

const reportCategories = [
  { id: "road", label: "Silnice nebo chodník", icon: CircleAlert },
  { id: "lighting", label: "Veřejné osvětlení", icon: LampDesk },
  { id: "waste", label: "Nepořádek nebo odpad", icon: Trash2 },
  { id: "greenery", label: "Zeleň a veřejný prostor", icon: Leaf },
  { id: "other", label: "Jiný problém", icon: MapPin },
] as const;

export function CityReportPage() {
  const navigate = useNavigate();
  const fileInput = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState("other");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<CityLocation | null>(null);
  const [description, setDescription] = useState("");
  const [photoNames, setPhotoNames] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const canSubmit = Boolean(address.trim()) && Boolean(location);

  if (isSubmitted) {
    return <main className="city-report-page"><div className="city-report-page__inner"><section className="city-report-success">
      <span><CheckCircle2 size={42} /></span>
      <p>Podnět byl odeslán</p>
      <h1>Děkujeme, předáme ho odpovědnému odboru</h1>
      <div><small>Číslo podnětu</small><strong>PO-2026-005104</strong></div>
      <p>O změně stavu vás upozorníme v portálu. Podnět a odpovědi města najdete také v sekci Moje podání.</p>
      <button type="button" onClick={() => navigate("/moje-podani", { state: { cityReportSubmitted: true } })}>Zobrazit v mých podáních <ChevronRight size={18} /></button>
      <button className="city-report-success__secondary" type="button" onClick={() => navigate("/")}>Zpět na nástěnku</button>
    </section></div></main>;
  }

  return <main className="city-report-page"><div className="city-report-page__inner">
    <BackButton label="Zpět na nástěnku" onClick={() => navigate("/")} />
    <header className="city-report-hero"><p>Podněty občanů</p><h1>Nahlásit problém ve městě</h1><span>Stačí vybrat typ problému, uvést místo a krátce popsat, co je potřeba opravit.</span></header>
    <form className="city-report-form" onSubmit={(event) => { event.preventDefault(); if (canSubmit) setIsSubmitted(true); }}>
      <section className="city-report-card">
        <div className="city-report-heading"><b>1</b><div><p>Co se stalo?</p><h2>Vyberte typ problému</h2></div></div>
        <div className="city-report-categories" role="group" aria-label="Typ problému">{reportCategories.map((item) => { const Icon = item.icon; return <button className={category === item.id ? "is-active" : ""} type="button" aria-pressed={category === item.id} onClick={() => setCategory(item.id)} key={item.id}><span><Icon size={22} /></span><strong>{item.label}</strong></button>; })}</div>
      </section>
      <section className="city-report-card">
        <div className="city-report-heading"><b>2</b><div><p>Kde je problém?</p><h2>Uveďte přesné místo</h2></div></div>
        <CityLocationPicker value={address} location={location} onValueChange={setAddress} onLocationChange={setLocation} />
      </section>
      <section className="city-report-card">
        <div className="city-report-heading"><b>3</b><div><p>Co potřebujeme vědět?</p><h2>Popište problém</h2></div></div>
        <label className="city-report-description"><span>Popis problému <small>(volitelné)</small></span><textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={5} maxLength={600} placeholder="Doplňte, co přesně se na místě děje…" /><small>{description.length}/600 znaků</small></label>
        <input ref={fileInput} type="file" accept="image/*" multiple hidden onChange={(event) => { const names = Array.from(event.target.files ?? []).map((file) => file.name); setPhotoNames((current) => [...current, ...names]); event.target.value = ""; }} />
        <button className="city-report-photo" type="button" onClick={() => fileInput.current?.click()}><Camera size={20} /><span><strong>{photoNames.length > 0 ? "Přidat další fotografie" : "Přidat fotografie"}</strong><small>Volitelné · můžete vybrat více souborů</small></span></button>
        {photoNames.length > 0 && <div className="city-report-photo-list">{photoNames.map((name, index) => <div key={`${name}-${index}`}><span><Camera size={17} /><strong>{name}</strong></span><button type="button" onClick={() => setPhotoNames((current) => current.filter((_, itemIndex) => itemIndex !== index))} aria-label={`Odebrat ${name}`}><X size={17} /></button></div>)}</div>}
      </section>
      <div className="city-report-submit"><p>Po odeslání můžete stav podnětu sledovat v <strong>Mých podáních</strong>.</p><button type="submit" disabled={!canSubmit}><Send size={18} /> Odeslat podnět</button></div>
    </form>
  </div></main>;
}
