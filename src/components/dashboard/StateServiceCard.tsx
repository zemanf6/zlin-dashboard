import { ExternalLink } from "lucide-react";
import type { StateService } from "../../data/dashboardData";

type StateServiceCardProps = {
  service: StateService;
};

export function StateServiceCard({ service }: StateServiceCardProps) {
  const Icon = service.icon;

  return (
    <a
      className="state-service-card"
      href={service.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`${service.title} - otevřít v novém okně`}
    >
      <div className="state-service-card__icon" aria-hidden="true">
        <Icon size={34} strokeWidth={1.8} />
      </div>

      <div className="state-service-card__content">
        <h3>
          {service.title}
          <ExternalLink size={18} strokeWidth={2.2} aria-hidden="true" />
        </h3>
        <p>{service.description}</p>
      </div>
    </a>
  );
}