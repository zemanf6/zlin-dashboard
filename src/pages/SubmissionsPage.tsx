import { useState } from "react";
import {
  ArrowLeft,
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
import { useNavigate } from "react-router-dom";
import "../styles/submissions.css";

type SubmissionStatus = "pending" | "approved" | "withdrawn" | "expired";

type Submission = {
  id: string;
  title: string;
  category: string;
  submittedAt: string;
  status: SubmissionStatus;
  document: string;
};

const initialSubmissions: Submission[] = [
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
  expired: { label: "Vypršelo", icon: Clock3 },
};

export function SubmissionsPage() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [selectedId, setSelectedId] = useState(initialSubmissions[0].id);
  const selected = submissions.find((item) => item.id === selectedId) ?? submissions[0];
  const StatusIcon = statusContent[selected.status].icon;

  const withdrawSubmission = () => {
    setSubmissions((items) =>
      items.map((item) => item.id === selected.id ? { ...item, status: "withdrawn" } : item),
    );
  };

  return (
    <main className="submissions-page">
      <div className="submissions-page__inner">
        <button className="submissions-page__back" type="button" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Zpět
        </button>

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

        <div className="submissions-layout">
          <section className="submissions-list" aria-label="Seznam podání">
            <div className="submissions-list__header">
              <div><p>Podání a žádosti</p><h2>Poslední aktivita</h2></div>
              <span>{submissions.length} podání</span>
            </div>
            {submissions.map((submission) => {
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
                <div><strong>Žádost je v pořádku přijata</strong><span>Úřad nyní kontroluje doložené údaje. V tuto chvíli není potřeba nic doplňovat.</span></div>
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

            <div className="submission-detail__grid">
              <div><span>Agenda</span><strong>{selected.category}</strong></div>
              <div><span>Odesláno</span><strong>{selected.submittedAt}</strong></div>
              <div><span>Žadatel</span><strong>Jan Novák</strong></div>
              <div><span>Způsob podání</span><strong>Portál občana</strong></div>
            </div>

            <div className="submission-section">
              <h3><Paperclip size={19} /> Přiložené dokumenty</h3>
              <button className="submission-document" type="button">
                <span><FileText size={21} /></span>
                <span><strong>{selected.document}</strong><small>PDF · 1,2 MB</small></span>
                <span>Zobrazit</span>
              </button>
            </div>

            <div className="submission-section">
              <h3><MessageSquareText size={19} /> Komunikace a průběh</h3>
              <ol className="submission-timeline">
                {selected.status === "approved" && <li className="submission-timeline__office"><i /><div><strong>Úleva byla schválena</strong><span>18. 2. 2026 v 11:45</span><p>Doklady jsme ověřili a nárok na snížení sazby byl uznán.</p></div></li>}
                {selected.status === "withdrawn" && <li><i /><div><strong>Podání staženo žadatelem</strong><span>Dnes v 15:06</span></div></li>}
                {selected.status === "expired" && <li><i /><div><strong>Platnost podání vypršela</strong><span>1. 1. 2026 v 00:00</span><p>Podání nebylo možné převést do nového poplatkového období.</p></div></li>}
                <li><i /><div><strong>Podání převzal odbor ekonomiky</strong><span>{selected.status === "approved" ? "13. 2. 2026 v 08:21" : "19. 6. 2026 v 08:14"}</span></div></li>
                <li><i /><div><strong>Podání bylo úspěšně odesláno</strong><span>{selected.submittedAt}</span></div></li>
              </ol>
            </div>

            {selected.status === "pending" && (
              <div className="submission-detail__footer">
                <span>Dokud úřad žádost neschválí, můžete ji stáhnout.</span>
                <button type="button" onClick={withdrawSubmission}><Trash2 size={17} /> Stáhnout podání</button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
