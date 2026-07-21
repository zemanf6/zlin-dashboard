import { useMemo, useState, type ReactNode } from "react";
import { initialNotifications, notificationCategories, type NotificationCategoryId } from "../data/notificationData";
import { NotificationsContext, type NotificationChannel, type NotificationsContextValue } from "./useNotifications";

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [preferences, setPreferences] = useState<Record<NotificationCategoryId, Record<NotificationChannel, boolean>>>(() => Object.fromEntries(notificationCategories.map((category) => [category.id, { portal: true, email: category.id === "emergency" || category.id === "personal", sms: category.id === "emergency" || category.id === "personal" }])) as Record<NotificationCategoryId, Record<NotificationChannel, boolean>>);
  const unreadCount = notifications.filter((notification) => !notification.isRead).length;

  const value = useMemo<NotificationsContextValue>(() => ({
    notifications,
    unreadCount,
    preferences,
    markAsRead: (id) => setNotifications((items) => items.map((item) => item.id === id ? { ...item, isRead: true } : item)),
    markAllAsRead: () => setNotifications((items) => items.map((item) => ({ ...item, isRead: true }))),
    togglePreference: (id, channel) => setPreferences((current) => {
      if (channel === "portal" && notificationCategories.find((category) => category.id === id)?.portalLocked) return current;
      return { ...current, [id]: { ...current[id], [channel]: !current[id][channel] } };
    }),
  }), [notifications, preferences, unreadCount]);

  return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
}
