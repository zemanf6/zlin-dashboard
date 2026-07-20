import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CarFront,
  FileText,
  Landmark,
  Tractor,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AppointmentCategoryId = "documents" | "transport" | "business" | "services";

export type AppointmentCategory = {
  id: AppointmentCategoryId;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type AppointmentOption = {
  title: string;
  workplace: string;
  href: string;
  icon: LucideIcon;
  category: AppointmentCategoryId;
};

export const appointmentCategories: AppointmentCategory[] = [
  { id: "documents", title: "Osobní doklady", description: "Občanské průkazy a cestovní doklady", icon: BadgeCheck },
  { id: "transport", title: "Doprava a vozidla", description: "Řidičské průkazy a registr vozidel", icon: CarFront },
  { id: "business", title: "Podnikání", description: "Živnosti, zemědělství a taxislužba", icon: BriefcaseBusiness },
  { id: "services", title: "Ověření a výpisy", description: "Služby kontaktního místa Czech POINT", icon: Landmark },
];

export const appointmentOptions: AppointmentOption[] = [
  { title: "Vyřízení OP / cestovního dokladu", workplace: "pracoviště L. Váchy 602", icon: BadgeCheck, category: "documents", href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4863" },
  { title: "Vyzvednutí OP / cestovního dokladu", workplace: "pracoviště L. Váchy 602", icon: BadgeCheck, category: "documents", href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4864" },
  { title: "Řidičské průkazy", workplace: "pracoviště L. Váchy 602", icon: CarFront, category: "transport", href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4869" },
  { title: "Registrace vozidel / změny v registru", workplace: "pracoviště L. Váchy 602", icon: CarFront, category: "transport", href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4883" },
  { title: "Registrace sportovního a historického vozidla", workplace: "pracoviště L. Váchy 602", icon: CarFront, category: "transport", href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4885" },
  { title: "Vozidla bez českého TP / přestavby", workplace: "pracoviště L. Váchy 602", icon: CarFront, category: "transport", href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4884" },
  { title: "Živnostenské podnikání", workplace: "pracoviště Zarámí 4421", icon: BriefcaseBusiness, category: "business", href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4894" },
  { title: "Výpis z živnostenského rejstříku", workplace: "pracoviště Zarámí 4421", icon: FileText, category: "business", href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4895" },
  { title: "Zemědělské podnikání", workplace: "pracoviště Zarámí 4421", icon: Tractor, category: "business", href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4896" },
  { title: "Taxislužba", workplace: "pracoviště Zarámí 4421", icon: Building2, category: "business", href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4897" },
  { title: "Czech POINT", workplace: "nám. Míru 12 – vchod z Bartošovy ulice", icon: Landmark, category: "services", href: "https://v4.kadlecelektro.cz/obj/?id=1180&cinnostId=4874" },
];
