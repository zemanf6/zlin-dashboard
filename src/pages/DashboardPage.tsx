import { useNavigate } from "react-router-dom";
import { CurrentReservationCard } from "../components/dashboard/CurrentReservationCard";
import { DashboardHero } from "../components/dashboard/DashboardHero";
import { DashboardSection } from "../components/dashboard/DashboardSection";
import { ServiceCard } from "../components/dashboard/ServiceCard";
import { StateServiceCard } from "../components/dashboard/StateServiceCard";
import {
  currentReservation,
  dashboardStatuses,
  mainServices,
  stateServices,
} from "../data/dashboardData";
import "../styles/dashboard.css";

export function DashboardPage() {
  const navigate = useNavigate();

  const getServiceAction = (serviceId: string) => {
    if (serviceId === "appointment-booking") {
      return () => navigate("/rezervace-terminu");
    }

    if (serviceId === "waste-fee") {
      return () => navigate("/poplatek-za-odpad");
    }

    return undefined;
  };

  return (
    <main className="dashboard-shell">
      <DashboardHero statuses={dashboardStatuses} />

      {currentReservation && (
        <CurrentReservationCard reservation={currentReservation} />
      )}

      <DashboardSection eyebrow="Městské služby" title="Co můžete vyřídit">
        <div className="service-grid">
          {mainServices.map((service) => (
            <ServiceCard
              key={service.title}
              service={service}
              onAction={getServiceAction(service.id)}
            />
          ))}
        </div>
      </DashboardSection>

      <DashboardSection eyebrow="Rozcestník" title="Další služby státu">
        <div className="state-service-grid">
          {stateServices.map((service) => (
            <StateServiceCard key={service.title} service={service} />
          ))}
        </div>
      </DashboardSection>
    </main>
  );
}