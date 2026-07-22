import { useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  FileCheck2,
  FileUp,
  Info,
  ReceiptText,
  Send,
  UserRound,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  FeeBackButton,
  FeeCard,
  FeeHero,
  FeeHistory,
  FeeLayout,
  FeePageShell,
  FeePaymentPanel,
} from "../components/fees/FeeComponents";
import { createPaymentDetails } from "../components/fees/feePayment";
import "../styles/wasteFee.css";

type FeeVariant = "full" | "relief400" | "relief300" | "exemption";
type PayerMode = "self" | "other";

type FeeOption = {
  label: string;
  amount: number;
  description: string;
  detailsTitle: string;
  details: string[];
};

const feeOptions: Record<FeeVariant, FeeOption> = {
  full: {
    label: "Plná sazba",
    amount: 900,
    description: "Základní sazba poplatku na jednoho poplatníka pro rok 2026.",
    detailsTitle: "Plná sazba poplatku",
    details: [
      "Základní sazba poplatku na jednoho poplatníka pro rok 2026 činí 900 Kč za rok.",
      "Vlastník nemovité věci zahrnující byt, rodinný dům nebo stavbu pro rodinnou rekreaci, ve které není přihlášena žádná fyzická osoba a která se nachází na území města, platí poplatek za každou takovou nemovitost ve výši odpovídající základní sazbě poplatku na jednoho poplatníka.",
    ],
  },
  relief400: {
    label: "Úleva 400 Kč",
    amount: 500,
    description:
      "Pro vybrané skupiny poplatníků, například děti, osoby se zdravotním postižením nebo držitele průkazu ZTP/ZTP/P.",
    detailsTitle: "Úleva ve výši 400 Kč",
    details: [
      "Úleva ve výši 400 Kč ze sazby poplatku se poskytne osobě, které poplatková povinnost vznikla z důvodu přihlášení ve městě a která je mladší 18 let.",
      "Nárok na úlevu trvá do konce poplatkového období, ve kterém osoba dosáhne 18 let.",
      "Úleva se poskytne také osobě, která je nevidomá.",
      "Úleva se poskytne osobě, která je považována za závislou na pomoci jiné fyzické osoby podle zákona upravujícího sociální služby.",
      "Úleva se poskytne držiteli průkazu ZTP nebo ZTP/P.",
    ],
  },
  relief300: {
    label: "Úleva 300 Kč",
    amount: 600,
    description:
      "Pro osoby 65+, studenty ve věku 19–26 let v prezenčním studiu mimo Zlínský kraj a osoby mimo dostupná místa svozu.",
    detailsTitle: "Úleva ve výši 300 Kč",
    details: [
      "Úleva ve výši 300 Kč ze sazby poplatku se poskytne osobě, které poplatková povinnost vznikla z důvodu přihlášení ve městě a která dosáhla věku 65 let.",
      "Nárok na úlevu vzniká od počátku poplatkového období, ve kterém osoba tohoto věku dosáhne.",
      "Úleva se poskytne osobě, která je přihlášena v budově mimo dostupná místa svozu vymezená v příloze č. 1 obecně závazné vyhlášky.",
      "Úleva se poskytne osobě ve věku 19 až 26 let, která zároveň studuje v prezenčním studiu mimo území Zlínského kraje.",
    ],
  },
  exemption: {
    label: "Osvobození",
    amount: 0,
    description:
      "Pro vybrané situace podle vyhlášky. Nárok je potřeba ohlásit a doložit.",
    detailsTitle: "Osvobození od poplatku",
    details: [
      "Od poplatku je osvobozena osoba, které poplatková povinnost vznikla z důvodu přihlášení ve městě a která je poplatníkem poplatku za odkládání komunálního odpadu z nemovité věci v jiné obci a má v této jiné obci bydliště.",
      "Osvobozena je osoba umístěná do školského zařízení pro výkon ústavní nebo ochranné výchovy nebo školského zařízení pro preventivně výchovnou péči na základě rozhodnutí soudu nebo smlouvy.",
      "Osvobozena je osoba umístěná do zařízení pro děti vyžadující okamžitou pomoc.",
      "Osvobozena je osoba umístěná v domově pro osoby se zdravotním postižením, domově pro seniory, domově se zvláštním režimem nebo v chráněném bydlení.",
      "Osvobozena je osoba, která je na základě zákona omezena na osobní svobodě, s výjimkou osoby vykonávající trest domácího vězení.",
      "Dále je osvobozena osoba, která se narodila v příslušném poplatkovém období. Nárok vzniká jen pro toto poplatkové období.",
      "Dále je osvobozena osoba přihlášená v okruhu do 500 m od obvodu skládky odpadů Suchý důl.",
      "Dále je osvobozena osoba, která vlastní nemovitost na území města, ve které není přihlášena žádná fyzická osoba. Nárok vzniká jen ve vztahu k této nemovitosti.",
      "Dále je osvobozena osoba, která se v příslušném poplatkovém období z důvodu dlouhodobého pobytu v zahraničí zdržuje mimo území města více než 10 měsíců a zároveň je přihlášena na území města po dobu celého poplatkového období.",
    ],
  },
};

const paymentHistory = [
  {
    id: "2026-jan",
    year: 2026,
    subject: "Jan Novák",
    amount: 900,
    paidAt: "Uhrazeno 10. 5. 2026",
    status: "Zaplaceno",
  },
  {
    id: "2026-eliska",
    year: 2026,
    subject: "Eliška Nováková",
    amount: 500,
    paidAt: "Uhrazeno 10. 5. 2026 · schválená úleva 400 Kč",
    status: "Zaplaceno",
  },
  {
    id: "2025-jan",
    year: 2025,
    subject: "Jan Novák",
    amount: 900,
    paidAt: "Uhrazeno 12. 5. 2025",
    status: "Zaplaceno",
  },
  {
    id: "2024-jan",
    year: 2024,
    subject: "Jan Novák",
    amount: 900,
    paidAt: "Uhrazeno 9. 5. 2024",
    status: "Zaplaceno",
  },
];

function sanitizeBirthNumber(value: string) {
  return value.replace(/\D/g, "");
}

type PayerCardProps = {
  payerMode: PayerMode;
  birthNumber: string;
  onPayerModeChange: (mode: PayerMode) => void;
  onBirthNumberChange: (value: string) => void;
};

function PayerCard({
  payerMode,
  birthNumber,
  onPayerModeChange,
  onBirthNumberChange,
}: PayerCardProps) {
  return (
    <FeeCard icon={UserRound} eyebrow="Poplatník" title="Za koho platíte?">

      <div className="payer-toggle" role="group" aria-label="Výběr poplatníka">
        <button
          className={`payer-toggle__button ${
            payerMode === "self" ? "payer-toggle__button--active" : ""
          }`}
          type="button"
          aria-pressed={payerMode === "self"}
          onClick={() => onPayerModeChange("self")}
        >
          Platím za sebe
        </button>
        <button
          className={`payer-toggle__button ${
            payerMode === "other" ? "payer-toggle__button--active" : ""
          }`}
          type="button"
          aria-pressed={payerMode === "other"}
          onClick={() => onPayerModeChange("other")}
        >
          Platím za jinou osobu
        </button>
      </div>

      {payerMode === "self" ? (
        <div className="payer-preview">
          <strong>Jan Novák</strong>
          <span>Trvalý pobyt: Zlín</span>
          <span>Variabilní symbol se doplní z evidence poplatníka.</span>
        </div>
      ) : (
        <div className="other-payer-form">
          <label>
            Rodné číslo
            <input
              type="text"
              inputMode="numeric"
              placeholder="Např. 8001011234"
              value={birthNumber}
              onChange={(event) => onBirthNumberChange(event.target.value)}
            />
          </label>
          <p>
            Při platbě za jinou osobu se jako variabilní symbol použije rodné
            číslo bez lomítka.
          </p>
        </div>
      )}
    </FeeCard>
  );
}

type FeeCalculationCardProps = {
  feeVariant: FeeVariant;
  expandedDetail: FeeVariant | null;
  onFeeVariantChange: (variant: FeeVariant) => void;
  onExpandedDetailChange: (variant: FeeVariant | null) => void;
  onOpenSubmissions: () => void;
};

function FeeCalculationCard({
  feeVariant,
  expandedDetail,
  onFeeVariantChange,
  onExpandedDetailChange,
  onOpenSubmissions,
}: FeeCalculationCardProps) {
  const shouldShowAttachment = feeVariant !== "full";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachment, setAttachment] = useState<{ name: string; size: string } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAttachment({
      name: file.name,
      size: Math.max(file.size / 1024 / 1024, 0.1).toLocaleString("cs-CZ", {
        maximumFractionDigits: 1,
      }) + " MB",
    });
    setIsSubmitted(false);
  };

  const removeAttachment = () => {
    setAttachment(null);
    setIsSubmitted(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <FeeCard icon={ReceiptText} eyebrow="Výpočet" title="Sazba, úleva nebo osvobození">

      <div className="fee-options">
        {(Object.entries(feeOptions) as [FeeVariant, FeeOption][]).map(
          ([key, option]) => {
            const isActive = feeVariant === key;
            const isExpanded = expandedDetail === key;
            const isApproved = key === "relief400";

            return (
              <article
                className={`fee-option ${isActive ? "fee-option--active" : ""} ${isApproved ? "fee-option--approved" : ""}`}
                key={key}
              >
                <button
                  className="fee-option__select"
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onFeeVariantChange(key)}
                >
                  <span>
                    <span className="fee-option__title">
                      <strong>{option.label}</strong>
                      {isApproved && <em><CheckCircle2 size={14} /> Schválená úleva</em>}
                    </span>
                    <small>{option.description}</small>
                  </span>
                  <b>{option.amount.toLocaleString("cs-CZ")} Kč</b>
                </button>

                <button
                  className="fee-option__info-button"
                  type="button"
                  onClick={() => onExpandedDetailChange(isExpanded ? null : key)}
                  aria-expanded={isExpanded}
                >
                  <Info size={17} strokeWidth={2} />
                  <span>{isExpanded ? "Skrýt podmínky" : "Zobrazit podmínky"}</span>
                </button>

                {isExpanded && (
                  <div className="fee-option__details">
                    <h3>{option.detailsTitle}</h3>
                    <ul>
                      {option.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          },
        )}
      </div>

      {shouldShowAttachment && (
        <div className={"attachment-panel" + (isSubmitted ? " attachment-panel--submitted" : "")}>
          <div className="attachment-panel__header">
            {isSubmitted ? <CheckCircle2 size={22} strokeWidth={2} /> : <FileCheck2 size={22} strokeWidth={2} />}
            <div>
              <strong>{isSubmitted ? "Doklad byl odeslán" : "Doložení nároku"}</strong>
              <span>{isSubmitted ? "Žádost jsme přijali a předali ji ke kontrole." : "Přiložte doklad ve formátu PDF, který potvrzuje váš nárok."}</span>
            </div>
          </div>

          {!attachment ? (
            <>
              <input ref={fileInputRef} className="attachment-panel__input" type="file" accept="application/pdf,.pdf" onChange={handleFileChange} />
              <button className="attachment-panel__button" type="button" onClick={() => fileInputRef.current?.click()}>
                <FileUp size={18} strokeWidth={2} /><span>Přiložit doklad</span>
              </button>
              <small className="attachment-panel__hint">PDF, maximálně 10 MB</small>
            </>
          ) : (
            <div className="attachment-file">
              <div className="attachment-file__icon">PDF</div>
              <div className="attachment-file__info"><strong>{attachment.name}</strong><span>{attachment.size}</span></div>
              <button type="button" onClick={() => setIsPreviewOpen(true)}><Eye size={18} /><span>Zobrazit</span></button>
              {!isSubmitted && <button className="attachment-file__remove" type="button" onClick={removeAttachment} aria-label="Odebrat doklad"><X size={19} /></button>}
            </div>
          )}

          {attachment && !isSubmitted && (
            <div className="attachment-panel__actions">
              <p>Doklad je připravený k odeslání.</p>
              <button type="button" onClick={() => setIsSubmitted(true)}><Send size={17} />Odeslat k posouzení</button>
            </div>
          )}

          {attachment && isSubmitted && (
            <>
              <div className="attachment-status"><Clock3 size={18} /><div><strong>Čeká na posouzení</strong><span>O výsledku vás budeme informovat v portálu.</span></div></div>
              <button className="attachment-panel__another" type="button" onClick={removeAttachment}>
                <FileUp size={17} />
                Doložit další doklad
              </button>
            </>
          )}
        </div>
      )}

      {shouldShowAttachment && (
        <button className="submission-summary" type="button" onClick={onOpenSubmissions}>
          <span className="submission-summary__icon"><Clock3 size={21} /></span>
          <span className="submission-summary__copy">
            <strong>1 žádost čeká na posouzení</strong>
            <small>Další žádost o snížení sazby byla schválena</small>
          </span>
          <span className="submission-summary__action">Moje podání <ChevronRight size={18} /></span>
        </button>
      )}

      {shouldShowAttachment && (
        <div className="reduced-payment-note">
          <Info size={20} />
          <div>
            <strong>Sníženou sazbu můžete zaplatit už nyní</strong>
            <p>Na schválení žádosti nemusíte čekat. Pokud úřad nárok neschválí, v portálu se zobrazí částka zbývající k doplacení.</p>
          </div>
        </div>
      )}

      {isPreviewOpen && attachment && (
        <div className="document-preview" role="dialog" aria-modal="true" aria-label="Náhled dokladu">
          <button className="document-preview__backdrop" type="button" onClick={() => setIsPreviewOpen(false)} aria-label="Zavřít náhled" />
          <div className="document-preview__dialog">
            <div className="document-preview__header">
              <div><strong>{attachment.name}</strong><span>Náhled přiloženého dokumentu</span></div>
              <button type="button" onClick={() => setIsPreviewOpen(false)} aria-label="Zavřít"><X size={22} /></button>
            </div>
            <div className="document-preview__canvas">
              <div className="document-preview__paper"><span>PDF</span><i /><i /><i /><i /><small>Ukázkový náhled dokumentu</small></div>
            </div>
          </div>
        </div>
      )}
    </FeeCard>
  );
}

function DeadlineCard() {
  return (
    <FeeCard icon={CalendarDays} eyebrow="Splatnost" title="Kdy se poplatek platí?">

      <div className="deadline-grid">
        <article>
          <strong>Jednorázová platba</strong>
          <span>do 15. 5. 2026</span>
        </article>
        <article>
          <strong>Vznik povinnosti po 15. 5.</strong>
          <span>do jednoho měsíce od vzniku povinnosti</span>
        </article>
      </div>
    </FeeCard>
  );
}

export function WasteFeePage() {
  const navigate = useNavigate();
  const [feeVariant, setFeeVariant] = useState<FeeVariant>("full");
  const [payerMode, setPayerMode] = useState<PayerMode>("self");
  const [birthNumber, setBirthNumber] = useState("");
  const [expandedDetail, setExpandedDetail] = useState<FeeVariant | null>(null);

  const selectedFee = feeOptions[feeVariant];

  const variableSymbol = useMemo(() => {
    if (payerMode === "other") {
      return sanitizeBirthNumber(birthNumber);
    }

    return "0201154470";
  }, [birthNumber, payerMode]);

  return (
    <FeePageShell>
        <FeeBackButton onClick={() => navigate("/")} />
        <FeeHero
          title="Poplatek za komunální odpad"
          description="Základní sazba pro rok 2026 činí 900 Kč. Zde můžete zohlednit úlevu nebo osvobození, zobrazit platební údaje a historii."
          summaryLabel="Rok 2026"
          summaryValue="1 400 Kč"
          summaryMeta="Zaplaceno za 2 osoby"
          summaryTone="success"
        />
        <FeeLayout payment={
          <FeePaymentPanel
            amount={selectedFee.amount}
            amountLabel="Uhrazená částka"
            status="Zaplaceno"
            statusTone="success"
            statusDescription="Platba za rok 2026 byla připsána."
            deadline="Připsáno 10. 5. 2026"
            details={createPaymentDetails({ variableSymbol: variableSymbol || "Doplňte rodné číslo", message: "Poplatek za odpad 2026" })}
          />
        }>
            <PayerCard
              payerMode={payerMode}
              birthNumber={birthNumber}
              onPayerModeChange={setPayerMode}
              onBirthNumberChange={setBirthNumber}
            />

            <FeeCalculationCard
              feeVariant={feeVariant}
              expandedDetail={expandedDetail}
              onFeeVariantChange={setFeeVariant}
              onExpandedDetailChange={setExpandedDetail}
              onOpenSubmissions={() => navigate("/moje-podani")}
            />

            <DeadlineCard />

            <FeeHistory items={paymentHistory} />
        </FeeLayout>
    </FeePageShell>
  );
}
