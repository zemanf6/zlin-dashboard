import { CalendarDays, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

type AppointmentPickerProps = {
  selectedDay: number | null;
  selectedTime: string;
  onChange: (day: number | null, time: string) => void;
  title?: string;
  address?: string;
  description?: string;
};

const days = Array.from({ length: 31 }, (_, index) => index + 1);
const availableDays = [3, 4, 5, 7, 10, 12];
const timeSlots = ["08:20", "09:00", "10:20", "13:40", "15:20"];

export function AppointmentPicker({
  selectedDay,
  selectedTime,
  onChange,
  title = "Osobní doklady",
  address = "L. Váchy 602, Zlín–Prštné",
  description = "Rezervace není povinná, ale zkrátí čekání na přepážce.",
}: AppointmentPickerProps) {
  return <>
    <div className="situation-office"><MapPin size={20} /><div><strong>{title}</strong><span>{address}</span><small>{description}</small></div></div>
    <div className="appointment-calendar">
      <header><button type="button" aria-label="Předchozí měsíc"><ChevronLeft size={18} /></button><strong>Srpen 2026</strong><button type="button" aria-label="Následující měsíc"><ChevronRight size={18} /></button></header>
      <div className="appointment-calendar__week"><span>Po</span><span>Út</span><span>St</span><span>Čt</span><span>Pá</span><span>So</span><span>Ne</span></div>
      <div className="appointment-calendar__days">{Array.from({ length: 5 }, (_, index) => <i key={`empty-${index}`} />)}{days.map((day) => <button className={selectedDay === day ? "is-selected" : availableDays.includes(day) ? "is-available" : ""} type="button" disabled={!availableDays.includes(day)} onClick={() => onChange(day, "")} key={day}>{day}{availableDays.includes(day) && <small />}</button>)}</div>
    </div>
    {selectedDay && <div className="appointment-times"><span>Dostupné časy pro {selectedDay}. 8.</span><div>{timeSlots.map((time) => <button className={selectedTime === time ? "is-active" : ""} type="button" onClick={() => onChange(selectedDay, time)} key={time}>{time}</button>)}</div></div>}
    <button className={selectedDay === null ? "appointment-without is-active" : "appointment-without"} type="button" onClick={() => onChange(null, "")}><CalendarDays size={17} /> Přijdu bez rezervace</button>
  </>;
}
