import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Clock3, CreditCard, QrCode, ReceiptText } from "lucide-react";
import { BackButton } from "../common/BackButton";
import "../../styles/feeShared.css";

export type PaymentDetail = { label: string; value: string };
export type FeeHistoryItem = { id?: string; year: number; amount: number; paidAt: string; subject?: string; status?: string };

export function FeePageShell({ children }: { children: ReactNode }) {
  return <main className="fee-page"><div className="fee-page__inner">{children}</div></main>;
}

export function FeeBackButton({ onClick }: { onClick: () => void }) {
  return <BackButton label="Zpět na nástěnku" onClick={onClick} />;
}

type FeeHeroProps = {
  title: string;
  description: string;
  summaryLabel: string;
  summaryValue: string;
  summaryMeta: string;
  summaryTone?: "default" | "success";
};

export function FeeHero({ title, description, summaryLabel, summaryValue, summaryMeta, summaryTone = "default" }: FeeHeroProps) {
  return (
    <header className="fee-hero">
      <div><p>Městský poplatek</p><h1>{title}</h1><span>{description}</span></div>
      <aside className={summaryTone === "success" ? "fee-hero__summary--success" : ""}><small>{summaryLabel}</small><strong>{summaryValue}</strong><b>{summaryMeta}</b></aside>
    </header>
  );
}

export function FeeLayout({ children, payment }: { children: ReactNode; payment: ReactNode }) {
  return <div className="fee-layout"><div className="fee-main">{children}</div>{payment}</div>;
}

type FeeCardProps = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  badge?: string;
  className?: string;
  children: ReactNode;
};

export function FeeCard({ icon: Icon, eyebrow, title, badge, className = "", children }: FeeCardProps) {
  return (
    <section className={`fee-card ${className}`.trim()}>
      <div className="fee-card__heading">
        <span className="fee-card__icon"><Icon size={24} strokeWidth={1.9} /></span>
        <div><p>{eyebrow}</p><h2>{title}</h2></div>
        {badge && <b className="fee-card__badge">{badge}</b>}
      </div>
      {children}
    </section>
  );
}

type FeePaymentPanelProps = {
  amount: number;
  details: PaymentDetail[];
  status?: string;
  statusDescription?: string;
  deadline?: string;
  amountLabel?: string;
  statusTone?: "warning" | "success";
  action?: ReactNode;
};

export function FeePaymentPanel({ amount, details, status, statusDescription, deadline, amountLabel = "Částka k úhradě", statusTone = "warning", action }: FeePaymentPanelProps) {
  const PaymentStatusIcon = statusTone === "success" ? CheckCircle2 : Clock3;
  return (
    <aside className="fee-payment" aria-label="Platební údaje">
      <div className="fee-card__heading">
        <span className="fee-card__icon"><CreditCard size={24} strokeWidth={1.9} /></span>
        <div><p>Platba</p><h2>Platební údaje</h2></div>
      </div>
      {status && <div className={`fee-payment__status fee-payment__status--${statusTone}`}><PaymentStatusIcon size={17} /><span><strong>{status}</strong>{statusDescription && <small>{statusDescription}</small>}</span></div>}
      <div className="fee-payment__amount"><span>{amountLabel}</span><strong>{amount.toLocaleString("cs-CZ")} Kč</strong>{deadline && <small>{deadline}</small>}</div>
      <dl>{details.map((detail) => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}</dl>
      <div className="fee-payment__qr" aria-label="QR kód pro platbu"><QrCode size={118} strokeWidth={1.5} /><span>Naskenujte v bankovní aplikaci</span></div>
      <div className="fee-payment__posting"><Clock3 size={17} /><span>Připsání platby se v portálu může projevit až do 48 hodin.</span></div>
      {action}
    </aside>
  );
}

export function FeeHistory({ items, title = "Zaplacené poplatky" }: { items: FeeHistoryItem[]; title?: string }) {
  return (
    <FeeCard icon={ReceiptText} eyebrow="Historie" title={title}>
      <div className="fee-history">
        {items.map((item) => <article key={item.id ?? item.year}><span><strong>{item.year}{item.subject ? ` · ${item.subject}` : ""}</strong><small>{item.paidAt}</small></span><span><strong>{item.amount.toLocaleString("cs-CZ")} Kč</strong><b><CheckCircle2 size={15} />{item.status ?? "Zaplaceno"}</b></span></article>)}
      </div>
    </FeeCard>
  );
}
