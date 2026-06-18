import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  FileCheck2,
  FileUp,
  Info,
  QrCode,
  ReceiptText,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
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
      "Pro seniory, vybrané studenty nebo osoby přihlášené mimo dostupná místa svozu.",
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
    year: 2025,
    amount: 900,
    paidAt: "12. 5. 2025",
    status: "Zaplaceno",
  },
  {
    year: 2024,
    amount: 900,
    paidAt: "9. 5. 2024",
    status: "Zaplaceno",
  },
];

function sanitizeBirthNumber(value: string) {
  return value.replace(/\D/g, "");
}

type WasteFeeHeroProps = {
  selectedFee: FeeOption;
};

function WasteFeeHero({ selectedFee }: WasteFeeHeroProps) {
  return (
    <section className="waste-fee-hero" aria-labelledby="waste-fee-title">
      <div>
        <p className="waste-fee-hero__eyebrow">Městský poplatek</p>
        <h1 id="waste-fee-title">Poplatek za komunální odpad</h1>
        <p className="waste-fee-hero__text">
          Základní sazba poplatku pro rok 2026 činí 900 Kč za rok. Zde si můžete
          zobrazit platební údaje, zohlednit úlevu nebo osvobození a zkontrolovat
          historii plateb.
        </p>
      </div>

      <aside className="waste-fee-summary-card" aria-label="Souhrn poplatku">
        <span>Rok 2026</span>
        <strong>{selectedFee.amount.toLocaleString("cs-CZ")} Kč</strong>
        <p>{selectedFee.label}</p>
      </aside>
    </section>
  );
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
    <section className="waste-card">
      <div className="waste-card__header">
        <div className="waste-card__icon" aria-hidden="true">
          <UserRound size={24} strokeWidth={1.9} />
        </div>
        <div>
          <p className="waste-card__eyebrow">Poplatník</p>
          <h2>Za koho platíte?</h2>
        </div>
      </div>

      <div className="payer-toggle" role="group" aria-label="Výběr poplatníka">
        <button
          className={`payer-toggle__button ${
            payerMode === "self" ? "payer-toggle__button--active" : ""
          }`}
          type="button"
          onClick={() => onPayerModeChange("self")}
        >
          Platím za sebe
        </button>
        <button
          className={`payer-toggle__button ${
            payerMode === "other" ? "payer-toggle__button--active" : ""
          }`}
          type="button"
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
    </section>
  );
}

type FeeCalculationCardProps = {
  feeVariant: FeeVariant;
  expandedDetail: FeeVariant | null;
  onFeeVariantChange: (variant: FeeVariant) => void;
  onExpandedDetailChange: (variant: FeeVariant | null) => void;
};

function FeeCalculationCard({
  feeVariant,
  expandedDetail,
  onFeeVariantChange,
  onExpandedDetailChange,
}: FeeCalculationCardProps) {
  const shouldShowAttachment = feeVariant !== "full";

  return (
    <section className="waste-card">
      <div className="waste-card__header">
        <div className="waste-card__icon" aria-hidden="true">
          <ReceiptText size={24} strokeWidth={1.9} />
        </div>
        <div>
          <p className="waste-card__eyebrow">Výpočet</p>
          <h2>Sazba, úleva nebo osvobození</h2>
        </div>
      </div>

      <div className="fee-options">
        {(Object.entries(feeOptions) as [FeeVariant, FeeOption][]).map(
          ([key, option]) => {
            const isActive = feeVariant === key;
            const isExpanded = expandedDetail === key;

            return (
              <article
                className={`fee-option ${isActive ? "fee-option--active" : ""}`}
                key={key}
              >
                <button
                  className="fee-option__select"
                  type="button"
                  onClick={() => onFeeVariantChange(key)}
                >
                  <span>
                    <strong>{option.label}</strong>
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
        <div className="attachment-panel">
          <div className="attachment-panel__header">
            <FileCheck2 size={22} strokeWidth={2} />
            <div>
              <strong>Příloha</strong>
              <span>
                Pro uplatnění úlevy nebo osvobození může být potřeba doložit rozhodný
                údaj.
              </span>
            </div>
          </div>

          <button className="attachment-panel__button" type="button">
            <FileUp size={18} strokeWidth={2} />
            <span>Přiložit doklad</span>
          </button>
        </div>
      )}

      <div className="waste-note">
        <Info size={20} strokeWidth={2} />
        <p>
          Úlevy a osvobození se vztahují pouze na poplatníky, kterým poplatková
          povinnost vznikla z důvodu přihlášení ve městě. Pokud není rozhodný
          údaj ohlášen ve stanovené lhůtě, nárok může zaniknout.
        </p>
      </div>
    </section>
  );
}

function DeadlineCard() {
  return (
    <section className="waste-card">
      <div className="waste-card__header">
        <div className="waste-card__icon" aria-hidden="true">
          <CalendarDays size={24} strokeWidth={1.9} />
        </div>
        <div>
          <p className="waste-card__eyebrow">Splatnost</p>
          <h2>Kdy se poplatek platí?</h2>
        </div>
      </div>

      <div className="deadline-grid">
        <article>
          <strong>Jednorázová platba</strong>
          <span>do 15. 5. 2026</span>
        </article>
        <article>
          <strong>Platba ve splátkách</strong>
          <span>do 15. 5. 2026 a 15. 9. 2026</span>
        </article>
        <article>
          <strong>Vznik povinnosti po 15. 5.</strong>
          <span>do jednoho měsíce od vzniku povinnosti</span>
        </article>
      </div>
    </section>
  );
}

function PaymentHistoryCard() {
  return (
    <section className="waste-card">
      <div className="waste-card__header">
        <div className="waste-card__icon" aria-hidden="true">
          <ReceiptText size={24} strokeWidth={1.9} />
        </div>
        <div>
          <p className="waste-card__eyebrow">Historie</p>
          <h2>Zaplacené poplatky</h2>
        </div>
      </div>

      <div className="payment-history">
        {paymentHistory.map((payment) => (
          <article className="payment-history__item" key={payment.year}>
            <div>
              <strong>{payment.year}</strong>
              <span>{payment.paidAt}</span>
            </div>
            <div>
              <b>{payment.amount.toLocaleString("cs-CZ")} Kč</b>
              <span>{payment.status}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

type PaymentPanelProps = {
  amount: number;
  variableSymbol: string;
};

function PaymentPanel({ amount, variableSymbol }: PaymentPanelProps) {
  return (
    <aside className="payment-panel" aria-label="Platební údaje">
      <div className="payment-panel__header">
        <div className="payment-panel__icon" aria-hidden="true">
          <CreditCard size={25} strokeWidth={1.9} />
        </div>
        <div>
          <p>Platba</p>
          <h2>Platební údaje</h2>
        </div>
      </div>

      <div className="payment-panel__amount">
        <span>Částka k úhradě</span>
        <strong>{amount.toLocaleString("cs-CZ")} Kč</strong>
      </div>

      <dl className="payment-details">
        <div>
          <dt>Bankovní účet</dt>
          <dd>000000-123456789 / 0800</dd>
        </div>
        <div>
          <dt>Variabilní symbol</dt>
          <dd>{variableSymbol || "Doplňte rodné číslo"}</dd>
        </div>
        <div>
          <dt>Konstantní symbol</dt>
          <dd>0379</dd>
        </div>
        <div>
          <dt>Zpráva pro příjemce</dt>
          <dd>Poplatek za odpad 2026</dd>
        </div>
      </dl>

      <div className="qr-box" aria-label="QR kód pro platbu">
        <QrCode size={118} strokeWidth={1.5} />
      </div>
    </aside>
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
    <main className="waste-fee-page">
      <section className="waste-fee-page__inner">
        <button
          className="waste-fee-page__back-button"
          type="button"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} strokeWidth={2} />
          <span>Zpět na nástěnku</span>
        </button>

        <WasteFeeHero selectedFee={selectedFee} />

        <section className="waste-fee-layout">
          <div className="waste-fee-main">
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
            />

            <DeadlineCard />

            <PaymentHistoryCard />
          </div>

          <PaymentPanel amount={selectedFee.amount} variableSymbol={variableSymbol} />
        </section>
      </section>
    </main>
  );
}