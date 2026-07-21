import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpenText, Search } from "lucide-react";
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

const managedServiceIds = ["waste-fee", "dog-fee", "parking-permit"];
const quickActionIds = ["city-report", "appointment-booking", "council-speaking"];
const serviceRoutes: Record<string, string> = {
  "appointment-booking": "/rezervace-terminu",
  "waste-fee": "/poplatek-za-odpad",
  "dog-fee": "/poplatek-za-psa",
  "city-report": "/nahlasit-problem",
};
const stateServiceOrder = ["Portál občana", "Datové schránky", "Detail řidiče", "Detail vozidel", "Katastr nemovitostí", "Elektronický recept", "ČSSZ ePortál", "Finanční správa"];
const selectServices = (ids: string[]) => ids.flatMap((id) => {
  const service = mainServices.find((item) => item.id === id);
  return service ? [service] : [];
});
const managedServices = selectServices(managedServiceIds);
const quickActions = selectServices(quickActionIds);
const sortedStateServices = [...stateServices].sort((a, b) => stateServiceOrder.indexOf(a.title) - stateServiceOrder.indexOf(b.title));

export function DashboardPage() {
  const navigate = useNavigate();

  const getServiceAction = (serviceId: string) => {
    const route = serviceRoutes[serviceId];
    return route ? () => navigate(route) : undefined;
  };

  return (
    <main className="dashboard-shell">
      <DashboardHero statuses={dashboardStatuses} />

      {currentReservation && (
        <CurrentReservationCard reservation={currentReservation} />
      )}

      <section className="life-situations-entry" aria-labelledby="life-situations-entry-title" role="link" tabIndex={0} onClick={() => navigate("/zivotni-situace")} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") navigate("/zivotni-situace"); }}>
        <span className="life-situations-entry__icon"><BookOpenText size={31} /></span>
        <div className="life-situations-entry__content">
          <p>Potřebujete něco nového vyřídit? Začněte tady</p>
          <h2 id="life-situations-entry-title">Co právě potřebujete vyřešit?</h2>
          <span>Stěhování, nové doklady, narození dítěte, svatba nebo pořízení psa. Provedeme vás postupem, dokumenty, platbou i případnou návštěvou úřadu.</span>
          <div><span><Search size={15} /> Nejčastější situace</span><span>Postupy a formuláře</span><span>Online i osobně</span></div>
        </div>
        <button type="button" onClick={() => navigate("/zivotni-situace")}>Vybrat životní situaci <ArrowRight size={19} /></button>
      </section>

      <DashboardSection eyebrow="Přehled a správa" title="Vaše služby a poplatky">
        <p className="dashboard-section__intro">Zkontrolujte nebo spravujte služby, které už využíváte. Novou záležitost začněte výběrem životní situace výše.</p>
        <div className="service-grid service-grid--primary">
          {managedServices.map((service) => (
            <ServiceCard
              key={service.title}
              service={service}
              onAction={getServiceAction(service.id)}
            />
          ))}
        </div>
      </DashboardSection>

      <DashboardSection eyebrow="Když přesně víte, co potřebujete" title="Rychlé akce">
        <p className="dashboard-section__intro">Přímé zkratky pro samostatné úkony. Rezervaci použijte, pokud už znáte správné pracoviště a agendu.</p>
        <div className="secondary-service-grid">{quickActions.map((service) => <ServiceCard key={service.title} service={service} onAction={getServiceAction(service.id)} />)}</div>
      </DashboardSection>

      <DashboardSection eyebrow="Externí služby" title="Nejčastější služby státu">
        <p className="dashboard-section__intro">Odkazy se otevřou v oficiálních státních portálech.</p>
        <div className="state-service-grid">
          {sortedStateServices.map((service) => (
            <StateServiceCard key={service.title} service={service} />
          ))}
        </div>
      </DashboardSection>
    </main>
  );
}
