import { useState } from "react";
import { Grid2X2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppointmentCard } from "../components/appointments/AppointmentCard";
import { BackButton } from "../components/common/BackButton";
import {
  appointmentCategories,
  appointmentOptions,
  type AppointmentCategoryId,
} from "../data/appointmentData";
import "../styles/appointments.css";

type CategoryFilter = "all" | AppointmentCategoryId;

export function AppointmentPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const visibleOptions = activeCategory === "all"
    ? appointmentOptions
    : appointmentOptions.filter((option) => option.category === activeCategory);
  const activeCategoryData = appointmentCategories.find((category) => category.id === activeCategory);

  return (
    <main className="appointment-page">
      <div className="appointment-page__inner">
        <BackButton label="Zpět na nástěnku" onClick={() => navigate("/")} />

        <header className="appointment-page__header">
          <p>Rezervace termínu</p>
          <h1>Co potřebujete vyřídit?</h1>
          <span>Nejprve vyberte oblast a potom konkrétní službu. Následně přejdete k výběru volného termínu.</span>
        </header>

        <section className="appointment-categories" aria-labelledby="appointment-category-title">
          <div className="appointment-section-heading">
            <span>1</span>
            <div><p>První krok</p><h2 id="appointment-category-title">Vyberte oblast</h2></div>
          </div>
          <div className="appointment-category-grid" role="group" aria-label="Kategorie služeb">
            <button className={activeCategory === "all" ? "is-active" : ""} type="button" aria-pressed={activeCategory === "all"} onClick={() => setActiveCategory("all")}>
              <span><Grid2X2 size={23} /></span><strong>Všechny služby</strong><small>{appointmentOptions.length} možností</small>
            </button>
            {appointmentCategories.map((category) => {
              const Icon = category.icon;
              const count = appointmentOptions.filter((option) => option.category === category.id).length;
              return <button className={activeCategory === category.id ? "is-active" : ""} type="button" aria-pressed={activeCategory === category.id} onClick={() => setActiveCategory(category.id)} key={category.id}><span><Icon size={23} /></span><strong>{category.title}</strong><small>{category.description}</small><b>{count}</b></button>;
            })}
          </div>
        </section>

        <section className="appointment-services" aria-labelledby="appointment-services-title">
          <div className="appointment-section-heading">
            <span>2</span>
            <div><p>Druhý krok</p><h2 id="appointment-services-title">{activeCategoryData?.title ?? "Vyberte konkrétní službu"}</h2></div>
            <small>{visibleOptions.length} {visibleOptions.length === 1 ? "služba" : visibleOptions.length < 5 ? "služby" : "služeb"}</small>
          </div>
          <div className="appointment-grid">
            {visibleOptions.map((option) => <AppointmentCard option={option} key={option.href} />)}
          </div>
        </section>
      </div>
    </main>
  );
}
