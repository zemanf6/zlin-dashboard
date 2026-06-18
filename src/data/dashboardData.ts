import {
  BriefcaseBusiness,
  CalendarClock,
  CarFront,
  Dog,
  Landmark,
  Mail,
  MapPinned,
  ReceiptText,
  Scale,
  Trash2,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type StatusTone = "success" | "warning" | "neutral" | "info";

export type DashboardStatus = {
  label: string;
  value: string;
  tone: StatusTone;
};

export type CurrentReservation = {
  department: string;
  agenda: string;
  date: string;
  time: string;
};

export type MainService = {
  id: string;
  title: string;
  description: string;
  status?: string;
  statusTone?: StatusTone;
  meta?: string;
  actionLabel: string;
  icon: LucideIcon;
  featured?: boolean;
  href?: string;
};

export type StateService = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const dashboardStatuses: DashboardStatus[] = [
  {
    label: "Nejbližší rezervace",
    value: "24. 6. 2026 v 10:30",
    tone: "info",
  },
];

export const currentReservation: CurrentReservation | null = {
  department: "pracoviště L. Váchy 602",
  agenda: "Vyřízení občanského průkazu",
  date: "24. 6. 2026",
  time: "10:30",
};

export const mainServices: MainService[] = [
  {
    id: "waste-fee",
    title: "Poplatek za odpad",
    description:
      "Zobrazte informace k poplatku za komunální odpad, historii plateb a možnosti úhrady.",
    status: "Zaplaceno za rok 2026",
    statusTone: "success",
    meta: "Přehled plateb a potvrzení za předchozí období",
    actionLabel: "Zobrazit poplatek",
    icon: Trash2
  },
  {
    id: "dog-fee",
    title: "Poplatek za psa",
    description: "Kontrola evidovaného psa, výše poplatku a možnost online platby.",
    status: "Zaplaceno",
    statusTone: "success",
    meta: "Uhrazena platba za rok 2026",
    actionLabel: "Zobrazit poplatek",
    icon: Dog,
  },
  {
    id: "appointment-booking",
    title: "Rezervace termínu",
    description: "Vyberte agendu a rezervujte si návštěvu úřadu na konkrétní čas.",
    status: "Online",
    statusTone: "info",
    meta: "Doprava, doklady, poplatky a další agendy",
    actionLabel: "Rezervovat termín",
    icon: CalendarClock,
  },
  {
    id: "parking-permit",
    title: "Parkovací oprávnění",
    description: "Přidání vozidla a žádost o parkovací oprávnění podle adresy.",
    status: "Plně online",
    statusTone: "info",
    meta: "Žádné oprávnění zatím nebylo registrováno",
    actionLabel: "Přidat oprávnění",
    icon: CarFront,
  },
  {
    id: "council-speaking",
    title: "Vystoupení na zastupitelstvu",
    description: "Přihlaste se k vystoupení na jednání zastupitelstva města.",
    status: "Nejbližší jednání",
    statusTone: "info",
    meta: "17. 9. 2026 · zasedací místnost radnice",
    actionLabel: "Přihlásit se",
    icon: Landmark,
    href: "https://formulare.zlin.eu/aforms.php?action=fill&id_form=20309&id_fldr=2"
  },
  {
    id: "city-report",
    title: "Nahlásit problém ve městě",
    description:
      "Nahlaste rozbitý chodník, nepořádek, nesvítící lampu nebo jiný problém.",
    status: "Nové hlášení",
    statusTone: "info",
    meta: "Stačí popis, místo a případně fotografie",
    actionLabel: "Nahlásit problém",
    icon: MapPinned,
  },
];

export const stateServices: StateService[] = [
  {
    title: "Detail řidiče",
    description:
      "Na Portálu dopravy si můžete vyřídit žádost o vydání řidičského oprávnění nebo výpis z bodového hodnocení.",
    href: "https://doprava.gov.cz/driver",
    icon: CarFront,
  },
  {
    title: "Detail vozidel",
    description:
      "Na Portálu dopravy můžete získat aktuální i historické informace o vozidlech vámi vlastněných nebo provozovaných.",
    href: "https://doprava.gov.cz/vehicle",
    icon: CarFront,
  },
  {
    title: "Katastr nemovitostí",
    description:
      "Na Portálu občana si můžete ověřit nemovitosti, které máte zapsané v katastru nemovitostí.",
    href: "https://obcan.portal.gov.cz/muj-katastr-nemovitosti",
    icon: Landmark,
  },
  {
    title: "Elektronický recept",
    description:
      "Aplikace eRecept poskytuje informace o všech receptech, které vám byly vystaveny, a to až pět let zpětně.",
    href: "https://pacient.erecept.sukl.cz/suklweb/Pacient/Home",
    icon: ReceiptText,
  },
  {
    title: "Portál občana",
    description: "Portál občana slouží pro kontakt občana se státem.",
    href: "https://obcan.portal.gov.cz/",
    icon: UserRound,
  },
  {
    title: "Datové schránky",
    description:
      "Přístup k datovým zprávám a bezpečné elektronické komunikaci s úřady.",
    href: "https://info.mojedatovaschranka.cz/info/cs/",
    icon: Mail,
  },
  {
    title: "Finanční správa",
    description:
      "Přihlášení do daňové informační schránky a správa daňových povinností.",
    href: "https://adisspr.mfcr.cz/pmd/home/prihlaseni-do-dis",
    icon: Scale,
  },
  {
    title: "ČSSZ ePortál",
    description:
      "Informace o důchodech, nemocenském pojištění a službách sociální správy.",
    href: "https://eportal.cssz.cz/ikr-cas/login?service=https%3A%2F%2Feportal.cssz.cz%2Fc%2Fportal%2Flogin%3Fp_l_id%3D37",
    icon: BriefcaseBusiness,
  },
];