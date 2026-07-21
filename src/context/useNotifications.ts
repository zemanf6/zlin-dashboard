import { createContext, useContext } from "react";
import type { CityNotification, NotificationCategoryId } from "../data/notificationData";

export type NotificationChannel = "portal" | "email" | "sms";

export type NotificationsContextValue = {
  notifications: CityNotification[];
  unreadCount: number;
  preferences: Record<NotificationCategoryId, Record<NotificationChannel, boolean>>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  togglePreference: (id: NotificationCategoryId, channel: NotificationChannel) => void;
};

export const NotificationsContext = createContext<NotificationsContextValue | null>(null);

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) throw new Error("useNotifications must be used inside NotificationsProvider");
  return context;
}
