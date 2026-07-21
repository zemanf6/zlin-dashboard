import { useState } from "react";
import {
  AlertTriangle,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  Inbox,
  MessageSquareText,
  Paperclip,
  RotateCcw,
  Trash2,
  XCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { BackButton } from "../components/common/BackButton";
import "../styles/submissions.css";

type SubmissionStatus = "pending" | "approved" | "withdrawn" | "expired" | "resolved" | "ready" | "visit";

type Submission = {
  id: string;
  title: string;
  category: string;
  submittedAt: string;
  status: SubmissionStatus;
  document: string;
  department?: string;
  resolution?: string;
};

const initialSubmissions: Submission[] = [
  {
    id: "EO-2026-008041",
    title: "Příprava změny trvalého pobytu",
    category: "Evidence obyvatel",
    submittedAt: "21. 7. 2026 v 16:12",
    status: "visit",
    document: "najemni-smlouva.pdf",
    department: "Evidence obyvatel, L. Váchy 602",
  },
  {
    id: "OD-2026-007183",
    title: "Vydání řidičského průkazu",
    category: "Osobní doklady",
    submittedAt: "8. 7. 2026 v 10:42",
    status: "ready",
    document: "potvrzeni-o-podani.pdf",
    department: "Oddělení řidičských průkazů, L. Váchy 602",
  },
  {
    id: "PO-2026-003912",
    title: "Nesvítící lampa u přechodu",
    category: "Podnět – veřejné osvětlení",
    submittedAt: "2. 7. 2026 v 20:14",
    status: "resolved",
    document: "foto-lampy.jpg",
    department: "Technické služby Zlín",
    resolution: "Vadné svítidlo bylo vyměněno a osvětlení je znovu v provozu.",
  },
  {
    id: "PO-2026-004821",
    title: "Žádost o úlevu 300 Kč",
    category: "Poplatek za komunální odpad",
    submittedAt: "18. 6. 2026 v 14:32",
    status: "pending",
    document: "potvrzeni-o-studiu.pdf",
  },
  {
    id: "PO-2026-001347",
    title: "Žádost o úlevu 400 Kč",
    category: "Poplatek za komunální odpad",
    submittedAt: "12. 2. 2026 v 09:08",
    status: "approved",
    document: "prukaz-ztp.pdf",
  },
  {
    id: "PO-2025-009204",
    title: "Žádost o osvobození od poplatku",
    category: "Poplatek za komunální odpad",
    submittedAt: "4. 11. 2025 v 16:20",
    status: "expired",
    document: "potvrzeni-o-pobytu.pdf",
  },
];

const statusContent = {
  pending: { label: "Čeká na posouzení", icon: Clock3 },
  approved: { label: "Schváleno", icon: CheckCircle2 },
  withdrawn: { label: "Staženo", icon: XCircle },
  expired: { label: "Platnost skončila", icon: Clock3 },
  resolved: { label: "Vyřešeno", icon: CheckCircle2 },
  ready: { label: "Připraveno k vyzvednutí", icon: BadgeCheck },
  visit: { label: "Čeká na osobní dokončení", icon: CalendarDays },
};

export function SubmissionsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const submittedCityReport = Boolean((location.state as { cityReportSubmitted?: boolean } | null)?.cityReportSubmitted);
  const newCityReport: Submission = { id: "PO-2026-005104", title: "Nový podnět z portálu", category: "Podnět občana", submittedAt: "21. 7. 2026 v 14:48", status: "pending", document: "foto-problemu.jpg", department: "Čeká na předání" };
  const [submissions, setSubmissions] = useState(() => submittedCityReport ? [newCityReport, ...initialSubmissions] : initialSubmissions);
  const [selectedId, setSelectedId] = useState(submittedCityReport ? newCityReport.id : initialSubmissions[0].id);
  const [isWithdrawConfirmOpen, setIsWithdrawConfirmOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed" | "expired">("all");
  const visibleSubmissions = submissions.filter((item) => filter === "all" || filter === "active" && ["pending", "ready", "visit"].includes(item.status) || filter === "completed" && ["approved", "resolved"].includes(item.status) || filter === "expired" && ["expired", "withdrawn"].includes(item.status));
  const selected = submissions.find((item) => item.id === selectedId) ?? submissions[0];
  const StatusIcon = statusContent[selected.status].icon;

  const withdrawSubmission = () => {
    setSubmissions((items) =>
      items.map((item) => item.id === selected.id ? { ...item, status: "withdrawn" } : item),
    );
    setIsWithdrawConfirmOpen(false);
  };

  return (
    <main className="submissions-page">
      <div className="submissions-page__inner">
        <BackButton className="submissions-page__back" onClick={() => navigate(-1)} />

        <header className="submissions-hero">
          <div className="submissions-hero__icon"><Inbox size={28} /></div>
          <div>
            <p>Osobní přehled</p>
            <h1>Moje podání</h1>
            <span>Sledujte stav žádostí, dokumenty a odpovědi úřadu na jednom místě.</span>
          </div>
          <div className="submissions-hero__summary">
            <strong>{submissions.filter((item) => item.status === "pending").length}</strong>
            <span>čeká na vyřízení</span>
          </div>
        </header>

        <section className="submissions-overview" aria-label="Přehled podání">
          <div><strong>{submissions.length}</strong><span>všechna podání</span></div><div><strong>{submissions.filter((item) => ["pending", "ready", "visit"].includes(item.status)).length}</strong><span>aktivní</span></div><div><strong>{submissions.filter((item) => ["approved", "resolved"].includes(item.status)).length}</strong><span>dokončená</span></div>
          <nav aria-label="Filtrovat podání">{[["all","Všechna"],["active","Aktivní"],["completed","Dokončená"],["expired","Ukončená"]].map(([value,label]) => <button className={filter === value ? "is-active" : ""} type="button" onClick={() => setFilter(value as typeof filter)} key={value}>{label}</button>)}</nav>
        </section>

        <div className="submissions-layout">
          <section className="submissions-list" aria-label="Seznam podání">
            <div className="submissions-list__header">
              <div><p>Podání a žádosti</p><h2>Poslední aktivita</h2></div>
              <span>{visibleSubmissions.length} podání</span>
            </div>
            {visibleSubmissions.map((submission) => {
              const itemStatus = statusContent[submission.status];
              const ItemIcon = itemStatus.icon;
              return (
                <button
                  className={"submission-item" + (selected.id === submission.id ? " submission-item--active" : "")}
                  type="button"
                  key={submission.id}
                  onClick={() => setSelectedId(submission.id)}
                >
                  <span className={"submission-item__status submission-status--" + submission.status}><ItemIcon size={17} />{itemStatus.label}</span>
                  <strong>{submission.title}</strong>
                  <small>{submission.category}</small>
                  <span className="submission-item__meta">{submission.submittedAt}<ChevronRight size={17} /></span>
                </button>
              );
            })}
          </section>

          <section className="submission-detail" aria-label="Detail podání">
            <div className="submission-detail__top">
              <div>
                <p>Číslo podání {selected.id}</p>
                <h2>{selected.title}</h2>
              </div>
              <span className={"submission-detail__status submission-status--" + selected.status}><StatusIcon size={18} />{statusContent[selected.status].label}</span>
            </div>

            {selected.status === "pending" && (
              <div className="submission-detail__notice submission-detail__notice--pending">
                <Clock3 size={20} />
                <div><strong>{selected.category.startsWith("Podnět") ? "Podnět je v pořádku přijat" : "Žádost je v pořádku přijata"}</strong><span>{selected.category.startsWith("Podnět") ? "Nyní ho předáme pracovišti, které má dané místo nebo problém na starosti." : "Úřad nyní kontroluje doložené údaje. V tuto chvíli není potřeba nic doplňovat."}</span></div>
              </div>
            )}
            {selected.status === "visit" && (
              <div className="submission-detail__notice submission-detail__notice--visit">
                <CalendarDays size={20} />
                <div><strong>Online příprava je hotová</strong><span>Změnu dokončíte osobně na evidenci obyvatel, L. Váchy 602. Máte rezervovaný termín 28. 7. 2026 v 10:20.</span></div>
              </div>
            )}
            {selected.status === "approved" && (
              <div className="submission-detail__notice submission-detail__notice--approved">
                <CheckCircle2 size={20} />
                <div><strong>Úleva byla schválena</strong><span>Nová sazba poplatku je 500 Kč.</span></div>
              </div>
            )}
            {selected.status === "withdrawn" && (
              <div className="submission-detail__notice">
                <RotateCcw size={20} />
                <div><strong>Podání jste stáhli</strong><span>Úřad se jím už nebude zabývat. V případě potřeby můžete vytvořit nové.</span></div>
              </div>
            )}
            {selected.status === "expired" && (
              <div className="submission-detail__notice submission-detail__notice--expired">
                <Clock3 size={20} />
                <div><strong>Platnost podání vypršela</strong><span>Podání se vztahovalo k minulému poplatkovému období. Pro aktuální období vytvořte nové.</span></div>
              </div>
            )}
            {selected.status === "resolved" && (
              <div className="submission-detail__notice submission-detail__notice--approved">
                <CheckCircle2 size={20} />
                <div><strong>Podnět byl vyřešen</strong><span>{selected.resolution}</span></div>
              </div>
            )}
            {selected.status === "ready" && (
              <div className="submission-detail__notice submission-detail__notice--ready">
                <BadgeCheck size={20} />
                <div><strong>Řidičský průkaz je připraven k vyzvednutí</strong><span>Vyzvedněte si ho na pracovišti L. Váchy 602. Vezměte si s sebou platný doklad totožnosti, rezervace termínu není nutná.</span></div>
              </div>
            )}

            <div className="submission-detail__grid">
              <div><span>Agenda</span><strong>{selected.category}</strong></div>
              <div><span>Odesláno</span><strong>{selected.submittedAt}</strong></div>
              <div><span>Žadatel</span><strong>Jan Novák</strong></div>
              <div><span>Způsob podání</span><strong>Portál občana</strong></div>
              {selected.department && <div><span>Odpovědné pracoviště</span><strong>{selected.department}</strong></div>}
            </div>

            <div className="submission-section">
              <h3><Paperclip size={19} /> Přiložené dokumenty</h3>
              <button className="submission-document" type="button">
                <span><FileText size={21} /></span>
                <span><strong>{selected.document}</strong><small>{selected.document.endsWith(".pdf") ? "PDF · 1,2 MB" : "JPG · 2,4 MB"}</small></span>
                <span>Zobrazit</span>
              </button>
            </div>

            <div className="submission-section">
              <h3><MessageSquareText size={19} /> Komunikace a průběh</h3>
              <ol className="submission-timeline">
                {selected.status === "visit" && <li className="submission-timeline__office"><i /><div><strong>Čeká na osobní dokončení</strong><span>Termín 28. 7. 2026 v 10:20</span><p>Údaje a dokument byly předány evidenci obyvatel. Na přepážce prokážete totožnost a podepíšete přihlašovací lístek.</p></div></li>}
                {selected.status === "ready" && <li className="submission-timeline__office"><i /><div><strong>Doklad je připraven k vyzvednutí</strong><span>21. 7. 2026 v 11:20</span><p>Řidičský průkaz je uložen na pracovišti L. Váchy 602.</p></div></li>}
                {selected.status === "approved" && <li className="submission-timeline__office"><i /><div><strong>Úleva byla schválena</strong><span>18. 2. 2026 v 11:45</span><p>Doklady jsme ověřili a nárok na snížení sazby byl uznán.</p></div></li>}
                {selected.status === "withdrawn" && <li><i /><div><strong>Podání staženo žadatelem</strong><span>Dnes v 15:06</span></div></li>}
                {selected.status === "expired" && <li><i /><div><strong>Platnost podání vypršela</strong><span>1. 1. 2026 v 00:00</span><p>Podání nebylo možné převést do nového poplatkového období.</p></div></li>}
                {selected.status === "resolved" && <><li className="submission-timeline__office"><i /><div><strong>Oprava byla dokončena</strong><span>6. 7. 2026 v 10:32</span><p>{selected.resolution}</p></div></li><li><i /><div><strong>Podnět předán Technickým službám</strong><span>3. 7. 2026 v 08:05</span><p>Děkujeme za upozornění. Závadu jsme předali pracovníkům veřejného osvětlení.</p></div></li></>}
                <li><i /><div><strong>{selected.category.startsWith("Podnět") ? "Podnět převzalo odpovědné pracoviště" : selected.category === "Osobní doklady" ? "Žádost převzalo oddělení řidičských průkazů" : "Podání převzal odbor ekonomiky"}</strong><span>{selected.status === "ready" ? "9. 7. 2026 v 07:55" : selected.status === "approved" ? "13. 2. 2026 v 08:21" : selected.status === "resolved" ? "3. 7. 2026 v 07:42" : "19. 6. 2026 v 08:14"}</span></div></li>
                <li><i /><div><strong>Podání bylo úspěšně odesláno</strong><span>{selected.submittedAt}</span></div></li>
              </ol>
            </div>

            {selected.status === "pending" && (
              <div className="submission-detail__footer">
                <span>{selected.category.startsWith("Podnět") ? "Podnět můžete stáhnout, dokud nezačne jeho řešení." : "Dokud úřad žádost neschválí, můžete ji stáhnout."}</span>
                <button type="button" onClick={() => setIsWithdrawConfirmOpen(true)}><Trash2 size={17} /> Stáhnout podání</button>
              </div>
            )}
          </section>
        </div>
      </div>
      {isWithdrawConfirmOpen && <div className="submission-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsWithdrawConfirmOpen(false); }}>
        <section className="submission-modal" role="dialog" aria-modal="true" aria-labelledby="withdraw-title">
          <span className="submission-modal__icon"><AlertTriangle size={27} /></span>
          <div><p>Potvrzení stažení</p><h2 id="withdraw-title">Opravdu chcete stáhnout toto podání?</h2></div>
          <p>Podání <strong>{selected.title}</strong> už úřad nebude dále řešit. Tento krok nelze vrátit zpět, ale můžete vytvořit nové podání.</p>
          <div className="submission-modal__actions"><button type="button" onClick={() => setIsWithdrawConfirmOpen(false)}>Ponechat podání</button><button className="submission-modal__confirm" type="button" onClick={withdrawSubmission}><Trash2 size={17} /> Ano, stáhnout</button></div>
        </section>
      </div>}
    </main>
  );
}
