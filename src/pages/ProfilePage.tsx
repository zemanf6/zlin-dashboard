import { useState } from "react";
import {
  Bell,
  CalendarDays,
  Check,
  CheckCircle2,
  Home,
  Info,
  Mail,
  Pencil,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import { useNotifications } from "../context/useNotifications";
import { notificationCategories } from "../data/notificationData";
import { BackButton } from "../components/common/BackButton";

export function ProfilePage() {
  const navigate = useNavigate();
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [email, setEmail] = useState("jan.novak@email.cz");
  const [phone, setPhone] = useState("+420 777 123 456");
  const [showSaved, setShowSaved] = useState(false);
  const { preferences, togglePreference } = useNotifications();
  const alertCategories = notificationCategories.filter((category) => category.group === "alerts");
  const boardCategories = notificationCategories.filter((category) => category.group === "board");
  const allEnabled = (categories: typeof notificationCategories, channel: "portal" | "email" | "sms") => categories.every((category) => preferences[category.id][channel]);
  const setChannelForGroup = (categories: typeof notificationCategories, channel: "portal" | "email" | "sms") => {
    const enabled = !allEnabled(categories, channel);
    categories.forEach((category) => {
      if (preferences[category.id][channel] !== enabled) togglePreference(category.id, channel);
    });
  };
  const renderPreferenceTable = (categories: typeof notificationCategories) => <div className="profile-notification-table-wrap">
    <table className="profile-notification-table">
      <thead><tr><th scope="col">Kategorie</th>{(["portal", "email", "sms"] as const).map((channel) => <th scope="col" key={channel}><label><span>{channel === "portal" ? <><Bell size={16} /> Portál</> : channel === "email" ? <><Mail size={16} /> E-mail</> : <><Phone size={16} /> SMS</>}</span><input type="checkbox" checked={allEnabled(categories, channel)} onChange={() => setChannelForGroup(categories, channel)} aria-label={`Nastavit ${channel} pro tuto skupinu`} /><small>Vše</small></label></th>)}</tr></thead>
      <tbody>{categories.map((category) => <tr key={category.id}><th scope="row"><strong>{category.label}</strong><small>{category.description}</small>{category.required && <b>Důležité</b>}</th>{(["portal", "email", "sms"] as const).map((channel) => { const isLocked = channel === "portal" && category.portalLocked; return <td className={isLocked ? "is-locked" : ""} key={channel}><input type="checkbox" checked={preferences[category.id][channel]} disabled={isLocked} onChange={() => togglePreference(category.id, channel)} aria-label={`${category.label} – ${channel}`} />{isLocked && <small>Vždy zapnuto</small>}</td>; })}</tr>)}</tbody>
    </table>
  </div>;

  const saveContact = () => {
    setIsEditingContact(false);
    setShowSaved(true);
    window.setTimeout(() => setShowSaved(false), 2500);
  };

  return (
    <main className="profile-page">
      <div className="profile-page__inner">
        <BackButton label="Zpět na nástěnku" onClick={() => navigate("/")} />

        <header className="profile-hero">
          <div className="profile-avatar" aria-hidden="true"><UserRound size={34} /></div>
          <div><p>Můj profil</p><h1>Jan Novák</h1><span>Údaje, které portál používá pro vyřízení vašich městských služeb.</span></div>
          <div className="profile-verified"><ShieldCheck size={21} /><span><strong>Ověřená identita</strong><small>Přihlášení prostřednictvím Identity občana</small></span></div>
        </header>

        <div className="profile-layout">
          <div className="profile-main">
            <section className="profile-card">
              <div className="profile-card__heading"><span><UserRound size={22} /></span><div><p>Základní údaje</p><h2>Údaje z ověřené identity</h2></div></div>
              <div className="profile-identity-grid">
                <div><span><UserRound size={18} /></span><div><small>Jméno a příjmení</small><strong>Jan Novák</strong></div><Check size={17} /></div>
                <div><span><CalendarDays size={18} /></span><div><small>Datum narození</small><strong>15. 1. 1982</strong></div><Check size={17} /></div>
                <div className="profile-identity-grid__wide profile-identity-grid__address"><span><Home size={18} /></span><div><small>Adresa trvalého pobytu</small><strong>Dlouhá 123, 760 01 Zlín</strong><button type="button" onClick={() => navigate("/zivotni-situace/stehuji-se")}><Pencil size={14} /> Změnit trvalý pobyt</button></div><Check size={17} /></div>
              </div>
              <div className="profile-source-note"><Info size={18} /><p>Tyto údaje používáme ke správnému přiřazení poplatků, sazeb a místní příslušnosti. Měnit je lze pouze v příslušné státní evidenci.</p></div>
            </section>

            <section className="profile-card">
              <div className="profile-card__heading profile-card__heading--action">
                <span><Mail size={22} /></span><div><p>Kontaktní údaje</p><h2>Kam vám můžeme napsat nebo zavolat</h2></div>
                {!isEditingContact && <button type="button" onClick={() => setIsEditingContact(true)}><Pencil size={16} /> Upravit</button>}
              </div>
              {isEditingContact ? (
                <div className="profile-contact-form">
                  <label><span><Mail size={17} /> E-mail</span><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
                  <label><span><Phone size={17} /> Telefon</span><input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} /></label>
                  <div><button className="profile-button profile-button--secondary" type="button" onClick={() => setIsEditingContact(false)}><X size={16} /> Zrušit</button><button className="profile-button profile-button--primary" type="button" onClick={saveContact}><Save size={16} /> Uložit změny</button></div>
                </div>
              ) : (
                <div className="profile-contact-list">
                  <div><span><Mail size={19} /></span><div><small>E-mail</small><strong>{email}</strong></div></div>
                  <div><span><Phone size={19} /></span><div><small>Telefon</small><strong>{phone}</strong></div></div>
                </div>
              )}
            </section>

            <section className="profile-card">
              <div className="profile-card__heading"><span><Bell size={22} /></span><div><p>Upozornění a nástěnka</p><h2>Co a jak vám máme posílat</h2></div></div>
              <p className="profile-notification-lead">Zvoneček je určený pro osobní a důležité informace. Běžné novinky a pozvánky najdete na městské nástěnce.</p>
              <h3 className="profile-preference-title">Důležitá upozornění</h3>
              <p className="profile-preference-help">Informace určené přímo vám nebo relevantní pro vaši adresu a celé město.</p>
              {renderPreferenceTable(alertCategories)}
              <h3 className="profile-preference-title">Příspěvky z nástěnky</h3>
              <p className="profile-preference-help">Vyberte, zda chcete na nové příspěvky upozornit i mimo portál. Samotné příspěvky zůstávají vždy dostupné na nástěnce.</p>
              {renderPreferenceTable(boardCategories)}
            </section>
          </div>

          <aside className="profile-sidebar">
            <CheckCircle2 size={24} />
            <h2>Profil je kompletní</h2>
            <p>Máme všechny údaje potřebné pro služby dostupné v tomto portálu.</p>
            <dl><div><dt>Identita</dt><dd>Ověřena</dd></div><div><dt>Trvalé bydliště</dt><dd>Zlín</dd></div><div><dt>Kontaktní e-mail</dt><dd>Doplněn</dd></div></dl>
          </aside>
        </div>

        {showSaved && <div className="profile-toast" role="status"><CheckCircle2 size={19} /> Kontaktní údaje byly uloženy</div>}
      </div>
    </main>
  );
}
