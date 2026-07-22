import { useMemo, useState } from "react";
import { AlertTriangle, CalendarDays, Check, CheckCircle2, ChevronDown, Clock3, CreditCard, FileCheck2, IdCard, Info, MapPin, QrCode, ShieldCheck, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BackButton } from "../components/common/BackButton";
import { AppointmentPicker } from "../components/situations/AppointmentPicker";
import "../styles/situationFlows.css";

type Reason = "expiry" | "change" | "lost" | "damaged" | "first" | "other";
type Person = "self" | "child" | "represented";
type Speed = "standard" | "five-days" | "one-day";

const reasons: { value: Reason; label: string; note: string }[] = [
  { value: "expiry", label: "Končí nebo skončila platnost", note: "Běžná výměna průkazu" },
  { value: "change", label: "Změnily se údaje", note: "Například trvalý pobyt nebo příjmení" },
  { value: "lost", label: "Průkaz jsem ztratil/a nebo mi byl odcizen", note: "Nejdříve zneplatníme původní doklad" },
  { value: "damaged", label: "Průkaz je poškozený", note: "Původní průkaz vezmete na přepážku" },
  { value: "first", label: "Jde o první občanský průkaz", note: "Typicky pro dítě" },
  { value: "other", label: "Jiný důvod", note: "Podrobnosti ověří úředník" },
];

const speedLabels: Record<Speed, string> = { standard: "Do 30 dnů", "five-days": "Do 5 pracovních dnů", "one-day": "Do 24 hodin pracovního dne" };

export function IdCardSituationPage() {
  const navigate = useNavigate();
  const [reason, setReason] = useState<Reason | "">("");
  const [person, setPerson] = useState<Person>("self");
  const [speed, setSpeed] = useState<Speed>("standard");
  const [selectedDay, setSelectedDay] = useState<number | null | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState("");
  const [paymentChoice, setPaymentChoice] = useState<"qr" | "office" | "">("");
  const [submitted, setSubmitted] = useState(false);

  const fee = useMemo(() => {
    if (speed === "five-days") return person === "child" ? 300 : 500;
    if (speed === "one-day") return person === "child" ? 500 : 1000;
    if (person === "child") return 100;
    return reason === "lost" || reason === "damaged" ? 200 : 0;
  }, [person, reason, speed]);

  const checklist = useMemo(() => {
    const items = [person === "self" ? "Dosavadní občanský průkaz, pokud ho máte" : person === "child" ? "Rodný list dítěte a doklad zákonného zástupce" : "Doklad zastoupení a váš doklad totožnosti"];
    if (reason === "change") items.push("Doklad ke změně, pokud údaj ještě není v registrech");
    if (reason === "damaged") items.push("Poškozený občanský průkaz");
    if (reason === "lost") items[0] = "Jiný doklad totožnosti, pokud ho máte";
    items.push("Fotografii nosit nemusíte – pořídí ji úředník");
    return items;
  }, [person, reason]);

  const appointmentReady = selectedDay === null || Boolean(selectedDay && selectedTime);
  const paymentReady = fee === 0 || Boolean(paymentChoice);
  const ready = Boolean(reason && appointmentReady && paymentReady);
  const appointment = selectedDay ? `${selectedDay}. 8. 2026 · ${selectedTime}` : "Bez rezervace";

  if (submitted) return <main className="situation-page"><div className="situation-page__inner situation-success"><span><CheckCircle2 size={40} /></span><p>Příprava návštěvy je hotová</p><h1>Máte vše připravené pro žádost o občanský průkaz</h1><div className="situation-success__appointment">{selectedDay ? <CalendarDays size={23} /> : <MapPin size={23} />}<span><small>{selectedDay ? "Rezervovaný termín" : "Návštěva bez rezervace"}</small><strong>{selectedDay ? appointment : "Přijďte během úředních hodin"}</strong><b>L. Váchy 602, Zlín–Prštné</b></span></div><ul><li><Check size={17} /> {reasons.find((item) => item.value === reason)?.label}</li><li><Check size={17} /> Vyřízení {speedLabels[speed].toLocaleLowerCase("cs-CZ")}</li><li><Check size={17} /> {fee === 0 ? "Správní poplatek se neplatí" : paymentChoice === "qr" ? `Platba ${fee.toLocaleString("cs-CZ")} Kč byla připravena QR kódem` : `Poplatek ${fee.toLocaleString("cs-CZ")} Kč zaplatíte na přepážce`}</li></ul><button type="button" onClick={() => navigate("/moje-podani")}>Zobrazit přípravu v Mých podáních</button><button className="situation-link-button" type="button" onClick={() => navigate("/zivotni-situace")}>Zpět na životní situace</button></div></main>;

  return <main className="situation-page"><div className="situation-page__inner">
    <BackButton className="situation-back" label="Zpět na životní situace" onClick={() => navigate("/zivotni-situace")} />
    <header className="situation-hero situation-hero--id"><div><p>Doklady a doprava</p><h1>Potřebuji nový občanský průkaz</h1><span>Vyberte svou situaci. Ukážeme vám správný postup, cenu a co si vzít s sebou. Návštěvu úřadu si můžete rovnou naplánovat.</span></div><aside><small>Začíná na</small><strong>{fee.toLocaleString("cs-CZ")} Kč</strong><span>výsledná cena podle zvolené varianty</span></aside></header>
    <div className="situation-facts"><span><Clock3 size={19} /><b>Vyřízení od 24 hodin do 30 dnů</b></span><span><MapPin size={19} /><b>Žádost podáte na L. Váchy 602</b></span><span><ShieldCheck size={19} /><b>Osobní návštěva je nutná</b></span></div>
    <section className="situation-explainer"><Info size={21} /><div><strong>Proč nejde žádost dokončit celou online?</strong><p>Při podání je nutné ověřit totožnost, pořídit aktuální fotografii a biometrické údaje. Online si ale připravíte správnou variantu a můžete si rezervovat konkrétní čas.</p></div></section>
    <div className="situation-layout"><form className="situation-form" onSubmit={(event) => { event.preventDefault(); if (ready) setSubmitted(true); }}><p className="form-required-note"><span>*</span> Povinné: vyberte důvod, způsob návštěvy a u zpoplatněné varianty také způsob úhrady.</p>
      <section className="situation-step"><header><b>1</b><div><p>Důvod výměny</p><h2>Proč potřebujete nový průkaz?</h2></div></header><div className="id-reason-list">{reasons.map((item) => <button className={reason === item.value ? "is-active" : ""} type="button" aria-pressed={reason === item.value} onClick={() => setReason(item.value)} key={item.value}><span className="id-choice-radio">{reason === item.value && <Check size={15} />}</span><span><strong>{item.label}</strong><small>{item.note}</small></span></button>)}</div>{reason === "lost" && <div className="id-warning"><AlertTriangle size={19} /><span><strong>Ztrátu nebo odcizení nahlaste co nejdříve</strong><small>Při návštěvě původní průkaz zneplatníme. Pokud hrozí zneužití, nečekejte na rezervovaný termín.</small></span></div>}</section>
      <section className="situation-step"><header><b>2</b><div><p>Žadatel a rychlost</p><h2>Pro koho průkaz vyřizujete?</h2></div></header><div className="situation-choice-grid">{([["self", "Pro sebe"], ["child", "Pro dítě mladší 15 let"], ["represented", "Pro zastupovanou osobu"]] as [Person, string][]).map(([value, label]) => <button className={person === value ? "is-active" : ""} type="button" onClick={() => setPerson(value)} key={value}><UserRound size={19} /><span>{label}</span>{person === value && <Check size={16} />}</button>)}</div><h3 className="situation-subheading">Jak rychle průkaz potřebujete?</h3><div className="id-speed-grid">{(["standard", "five-days", "one-day"] as Speed[]).map((value) => <button className={speed === value ? "is-active" : ""} type="button" onClick={() => setSpeed(value)} key={value}><Clock3 size={18} /><span><strong>{speedLabels[value]}</strong><small>{value === "standard" ? "Nejnižší poplatek" : value === "five-days" ? "Zrychlené vydání" : "Vyzvednutí pouze na Ministerstvu vnitra v Praze"}</small></span>{speed === value && <Check size={16} />}</button>)}</div>{speed === "one-day" && <div className="id-warning id-warning--info"><Info size={19} /><span><strong>Žádost podáte ve Zlíně, průkaz vyzvednete v Praze</strong><small>Doklad vydaný do 24 hodin pracovního dne se vyzvedává pouze na Ministerstvu vnitra.</small></span></div>}</section>
      <section className="situation-step"><header><b>3</b><div><p>Co vzít s sebou</p><h2>Váš osobní seznam dokladů</h2></div></header>{reason ? <ul className="id-checklist">{checklist.map((item) => <li key={item}><FileCheck2 size={18} /><span>{item}</span></li>)}</ul> : <div className="id-empty-step"><IdCard size={28} /><span><strong>Nejprve vyberte důvod výměny</strong><small>Seznam dokladů upravíme podle vaší situace.</small></span></div>}</section>
      <section className="situation-step"><header><b>4</b><div><p>Návštěva úřadu</p><h2>Chcete si rezervovat termín?</h2></div></header><AppointmentPicker selectedDay={selectedDay ?? null} selectedTime={selectedTime} onChange={(day, time) => { setSelectedDay(day); setSelectedTime(time); }} /></section>
      <section className="situation-more"><h2>Podrobnější informace</h2><details><summary>Jak bude návštěva probíhat? <ChevronDown size={17} /></summary><p>Úředník zkontroluje doklady, pořídí fotografii a biometrické údaje a nechá vás potvrdit žádost. Při běžném průběhu zabere podání přibližně 15 minut.</p></details><details><summary>Kde si hotový průkaz vyzvednu? <ChevronDown size={17} /></summary><p>U běžného a pětidenního vydání si zvolíte místo převzetí podle dostupných možností. Průkaz do 24 hodin pracovního dne se vyzvedává pouze na Ministerstvu vnitra v Praze.</p></details><details><summary>Co když končí platnost? <ChevronDown size={17} /></summary><p>O nový průkaz můžete požádat už před skončením platnosti. U běžné výměny v zákonné lhůtě se správní poplatek neplatí.</p></details><details><summary>Úřední hodiny a kontakt <ChevronDown size={17} /></summary><p>Pracoviště osobních dokladů najdete na adrese L. Váchy 602, Zlín–Prštné. Rezervace není povinná; konkrétní čas však omezí čekání.</p></details></section>
      <button className="situation-submit" type="submit" disabled={!ready}>Dokončit přípravu návštěvy <CheckCircle2 size={18} /></button>{!ready && <p className="id-submit-hint">{!reason ? "Nejprve vyberte důvod, proč nový průkaz potřebujete." : !appointmentReady ? "V kroku 4 vyberte termín nebo možnost přijít bez rezervace." : "V souhrnu vyberte způsob úhrady poplatku."}</p>}
    </form>
    <aside className="situation-payment id-summary"><header><span><IdCard size={23} /></span><div><p>Shrnutí vaší volby</p><h2>{fee.toLocaleString("cs-CZ")} Kč</h2></div></header><div className="situation-payment__details"><span>Důvod<strong>{reason ? reasons.find((item) => item.value === reason)?.label : "Zatím nevybráno"}</strong></span><span>Žadatel<strong>{person === "self" ? "Jan Novák" : person === "child" ? "Dítě mladší 15 let" : "Zastupovaná osoba"}</strong></span><span>Rychlost<strong>{speedLabels[speed]}</strong></span><span>Návštěva<strong>{selectedDay === undefined ? "Zatím nevybráno" : selectedDay ? `${selectedDay}. 8. v ${selectedTime || "—"}` : "Bez rezervace"}</strong></span><span>Převzetí<strong>{speed === "one-day" ? "Ministerstvo vnitra, Praha" : "Dle volby při podání"}</strong></span></div>{fee > 0 ? <><p className="id-payment-title">Jak chcete poplatek uhradit?</p><div className="payment-choice"><button className={paymentChoice === "qr" ? "is-active" : ""} type="button" onClick={() => setPaymentChoice("qr")}><QrCode size={20} /><span><strong>Zaplatím QR kódem</strong><small>Bankovním převodem před návštěvou</small></span>{paymentChoice === "qr" && <Check size={17} />}</button><button className={paymentChoice === "office" ? "is-active" : ""} type="button" onClick={() => setPaymentChoice("office")}><CreditCard size={20} /><span><strong>Zaplatím na místě</strong><small>Při podání žádosti na přepážce</small></span>{paymentChoice === "office" && <Check size={17} />}</button></div>{paymentChoice === "qr" && <div className="situation-qr"><QrCode size={126} strokeWidth={1.4} /><span>Naskenujte v bankovní aplikaci</span><dl><div><dt>Částka</dt><dd>{fee.toLocaleString("cs-CZ")} Kč</dd></div><div><dt>Účet města</dt><dd>000000-123456789 / 0800</dd></div><div><dt>Variabilní symbol</dt><dd>0201154470</dd></div><div><dt>Zpráva</dt><dd>Občanský průkaz</dd></div></dl></div>}{paymentChoice === "office" && <div className="situation-payment__paid"><CreditCard size={20} /><span><strong>Zaplatíte při návštěvě</strong><small>Úředník vás provede úhradou poplatku.</small></span></div>}</> : <div className="situation-payment__paid"><ShieldCheck size={20} /><span><strong>Bez správního poplatku</strong><small>Pro vybranou běžnou variantu se poplatek neplatí.</small></span></div>}</aside>
    </div>
  </div></main>;
}
