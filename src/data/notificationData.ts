export type NotificationCategoryId = "personal" | "emergency" | "traffic" | "maintenance" | "boardNews" | "boardEvents";

export type NotificationCategory = {
  id: NotificationCategoryId;
  label: string;
  description: string;
  required?: boolean;
  portalLocked?: boolean;
  group: "alerts" | "board";
};

export type CityNotification = {
  id: string;
  category: NotificationCategoryId;
  title: string;
  summary: string;
  body: string;
  date: string;
  time: string;
  isRead: boolean;
  important?: boolean;
  articleUrl?: string;
};

export const notificationCategories: NotificationCategory[] = [
  { id: "personal", label: "Osobní upozornění", description: "Připravené doklady, změny stavu podání a informace určené přímo vám", required: true, portalLocked: true, group: "alerts" },
  { id: "emergency", label: "Krizové informace", description: "Mimořádné události a výstrahy důležité pro bezpečnost", required: true, group: "alerts" },
  { id: "traffic", label: "Důležitá doprava v okolí", description: "Uzavírky a změny MHD relevantní pro vaši adresu nebo celé město", group: "alerts" },
  { id: "maintenance", label: "Služby v místě bydliště", description: "Změny svozu, odstávky a práce přímo ve vašem okolí", group: "alerts" },
  { id: "boardNews", label: "Novinky a rozvoj města", description: "Příspěvky radnice, nové projekty a praktické informace", group: "board" },
  { id: "boardEvents", label: "Kultura, sport a akce", description: "Pozvánky a tipy na dění ve Zlíně", group: "board" },
];

export const initialNotifications: CityNotification[] = [
  { id: "personal-1", category: "personal", title: "Řidičský průkaz je připraven", summary: "Nový řidičský průkaz si můžete vyzvednout na pracovišti L. Váchy.", body: "Váš nový řidičský průkaz je připraven k vyzvednutí na pracovišti L. Váchy 602. K převzetí si vezměte platný doklad totožnosti. Rezervace termínu není pro vyzvednutí nutná.", date: "21. 7. 2026", time: "11:20", isRead: false, important: true },
  { id: "traffic-1", category: "traffic", title: "Omezení provozu na třídě T. Bati", summary: "Od středy bude doprava vedena jedním jízdním pruhem.", body: "Od středy 22. července do neděle 26. července proběhne oprava povrchu na třídě T. Bati v úseku mezi ulicemi Dlouhá a Díly. Doprava bude vedena jedním jízdním pruhem. Počítejte prosím s možným zdržením.", date: "21. 7. 2026", time: "09:15", isRead: false, important: true, articleUrl: "https://www.zlin.eu/aktuality/omezeni-provozu-trida-t-bati" },
  { id: "maintenance-1", category: "maintenance", title: "Posun svozu směsného odpadu", summary: "Svoz v ulici Dlouhá proběhne tento týden o den později.", body: "Z důvodu technické odstávky proběhne pravidelný svoz směsného odpadu v ulici Dlouhá ve čtvrtek 23. července namísto středy. Nádoby ponechte přístupné od 6:00.", date: "20. 7. 2026", time: "14:40", isRead: false },
];
