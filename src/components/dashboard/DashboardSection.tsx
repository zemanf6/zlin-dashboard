import type { ReactNode } from "react";

type DashboardSectionProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
};

export function DashboardSection({
  eyebrow,
  title,
  children,
}: DashboardSectionProps) {
  return (
    <section className="dashboard-section" aria-labelledby={title}>
      <div className="dashboard-section__header">
        <div>
          <p className="dashboard-section__eyebrow">{eyebrow}</p>
          <h2 id={title}>{title}</h2>
        </div>
      </div>

      {children}
    </section>
  );
}