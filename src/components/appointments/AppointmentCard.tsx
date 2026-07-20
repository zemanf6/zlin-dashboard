import { ArrowRight, MapPin } from "lucide-react";
import type { AppointmentOption } from "../../data/appointmentData";

export function AppointmentCard({ option }: { option: AppointmentOption }) {
  const Icon = option.icon;

  return (
    <a className="appointment-card" href={option.href} target="_blank" rel="noreferrer">
      <span className="appointment-card__icon" aria-hidden="true"><Icon size={25} strokeWidth={1.8} /></span>
      <span className="appointment-card__content"><strong>{option.title}</strong><small><MapPin size={14} />{option.workplace}</small></span>
      <span className="appointment-card__action">Vybrat <ArrowRight size={18} /></span>
    </a>
  );
}
