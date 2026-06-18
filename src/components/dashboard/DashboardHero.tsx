import type { DashboardStatus } from "../../data/dashboardData";

type DashboardHeroProps = {
  statuses: DashboardStatus[];
};

export function DashboardHero({ statuses }: DashboardHeroProps) {
  return (
    <section className="dashboard-hero" aria-labelledby="dashboard-title">
      <div>
        <p className="dashboard-hero__eyebrow">Osobní nástěnka</p>
        <h1 id="dashboard-title">Dobrý den, Jane Nováku</h1>
        <p className="dashboard-hero__text">
          Tady uvidíte své městské poplatky, rezervace a služby, které můžete
          vyřídit online.
        </p>
      </div>

      <div className="dashboard-status-grid" aria-label="Rychlý přehled">
        {statuses.map((item) => (
          <article
            className={`dashboard-status dashboard-status--${item.tone}`}
            key={item.label}
          >
            <span className="dashboard-status__label">{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}