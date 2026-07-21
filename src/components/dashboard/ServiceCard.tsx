import { ArrowRight } from "lucide-react";
import type { MainService } from "../../data/dashboardData";

type ServiceCardProps = {
  service: MainService;
  onAction?: () => void;
};

export function ServiceCard({ service, onAction }: ServiceCardProps) {
  const Icon = service.icon;

  const handleClick = () => {
    if (onAction) {
      onAction();
      return;
    }

    if (service.href) {
      window.open(service.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button
      className="service-card"
      type="button"
      onClick={handleClick}
      aria-label={service.actionLabel}
    >
      <div className="service-card__top">
        <div className="service-card__icon" aria-hidden="true">
          <Icon size={27} strokeWidth={1.8} />
        </div>

      </div>

      <div className="service-card__body">
        <h3>{service.title}</h3>
        <p>{service.description}</p>
      </div>

      <span className="service-card__button" aria-hidden="true">
        <span>{service.actionLabel}</span>
        <ArrowRight size={17} strokeWidth={2} />
      </span>
    </button>
  );
}
