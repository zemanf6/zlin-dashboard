import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    BriefcaseBusiness,
    Building2,
    CarFront,
    FileText,
    Info,
    Landmark,
    Tractor,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import "../styles/appointments.css";
import { useNavigate } from "react-router-dom";

type AppointmentOption = {
    title: string;
    workplace: string;
    href: string;
    icon: LucideIcon;
};

const appointmentOptions: AppointmentOption[] = [
    {
        title: "Vyřízení OP / cestovního dokladu",
        workplace: "pracoviště L. Váchy 602",
        icon: BadgeCheck,
        href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4863"
    },
    {
        title: "Vyzvednutí OP / cestovního dokladu",
        workplace: "pracoviště L. Váchy 602",
        icon: BadgeCheck,
        href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4864"
    },
    {
        title: "Živnostenské podnikání",
        workplace: "pracoviště Zarámí 4421",
        icon: BriefcaseBusiness,
        href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4894"
    },
    {
        title: "Žádost o výpis z živnostenského rejstříku",
        workplace: "pracoviště Zarámí 4421",
        icon: FileText,
        href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4895"
    },
    {
        title: "Zemědělské podnikání",
        workplace: "pracoviště Zarámí 4421",
        icon: Tractor,
        href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4896"
    },
    {
        title: "Czech POINT",
        workplace: "pracoviště nám. Míru 12 – vchod z Bartošovy ulice",
        icon: Landmark,
        href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4874"
    },
    {
        title: "Řidičské průkazy",
        workplace: "pracoviště L. Váchy 602",
        icon: CarFront,
        href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4869"
    },
    {
        title: "Registrace vozidel / Změny v registru vozidel",
        workplace: "pracoviště L. Váchy 602",
        icon: CarFront,
        href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4883"
    },
    {
        title: "Registrace sportovního a historického vozidla",
        workplace: "pracoviště L. Váchy 602",
        icon: CarFront,
        href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4885"
    },
    {
        title: "Registrace vozidel bez českého TP / Přestavby / Výroba vozidel",
        workplace: "pracoviště L. Váchy 602",
        icon: CarFront,
        href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4884"
    },
    {
        title: "Taxislužba",
        workplace: "pracoviště Zarámí 4421",
        icon: Building2,
        href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4897"
    },
];

export function AppointmentPage() {
    const navigate = useNavigate();
    return (
        <main className="appointment-page">
            <section className="appointment-page__inner">
                <button
                    className="appointment-page__back-button"
                    type="button"
                    onClick={() => navigate("/")}
                >
                    <ArrowLeft size={18} strokeWidth={2} />
                    <span>Zpět na nástěnku</span>
                </button>

                <div className="appointment-page__header">
                    <div>
                        <p className="appointment-page__eyebrow">Rezervace termínu</p>
                        <h1>Vyberte službu, na kterou se chcete objednat</h1>
                        <p className="appointment-page__lead">
                            Zvolte konkrétní agendu. V dalším kroku bude následovat výběr
                            dostupného termínu a potvrzení rezervace.
                        </p>
                    </div>
                </div>

                <aside className="appointment-note" aria-label="Poznámka k objednání">
                    <div className="appointment-note__icon" aria-hidden="true">
                        <Info size={22} strokeWidth={2} />
                    </div>
                    <p>
                        Elektronické objednání není podmínkou, ale výhodou pro přednostní
                        odbavení. Většina klientů je odbavována bez předchozího objednání.
                    </p>
                </aside>

                <div className="appointment-grid">
                    {appointmentOptions.map((option) => {
                        const Icon = option.icon;

                        return (
                            <a className="appointment-card" href={option.href} key={option.title} target="_blank">
                                <div className="appointment-card__icon" aria-hidden="true">
                                    <Icon size={26} strokeWidth={1.8} />
                                </div>

                                <div className="appointment-card__content">
                                    <h2>{option.title}</h2>
                                    <p>{option.workplace}</p>
                                </div>

                                <ArrowRight
                                    className="appointment-card__arrow"
                                    size={19}
                                    strokeWidth={2}
                                    aria-hidden="true"
                                />
                            </a>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}