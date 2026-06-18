import { CalendarClock, MapPinned, Trash2 } from "lucide-react";
import type { CurrentReservation } from "../../data/dashboardData";

type CurrentReservationCardProps = {
  reservation: CurrentReservation;
};

export function CurrentReservationCard({
  reservation,
}: CurrentReservationCardProps) {
  return (
    <section className="current-reservation" aria-labelledby="reservation-title">
      <div className="current-reservation__icon" aria-hidden="true">
        <CalendarClock size={25} strokeWidth={1.9} />
      </div>

      <div className="current-reservation__content">
        <p className="current-reservation__label">Aktuální rezervace</p>
        <h2 id="reservation-title">{reservation.agenda}</h2>
        <p>
          {reservation.department} · {reservation.date} v {reservation.time}
        </p>
      </div>

      <div className="current-reservation__actions">
        <button
          className="current-reservation__button current-reservation__button--primary"
          type="button"
        >
          <CalendarClock size={17} strokeWidth={2} />
          <span>Přidat do kalendáře</span>
        </button>

        <button
          className="current-reservation__button current-reservation__button--secondary"
          type="button"
        >
          <MapPinned size={17} strokeWidth={2} />
          <span>Navigovat</span>
        </button>

        <button
          className="current-reservation__button current-reservation__button--danger"
          type="button"
        >
          <Trash2 size={17} strokeWidth={2} />
          <span>Zrušit</span>
        </button>
      </div>
    </section>
  );
}