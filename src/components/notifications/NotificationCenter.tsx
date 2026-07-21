import { useEffect, useRef, useState } from "react";
import { Bell, CheckCheck, ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { useNotifications } from "../../context/useNotifications";
import { notificationCategories } from "../../data/notificationData";

export function NotificationCenter() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const selected = notifications.find((item) => item.id === selectedId);

  const close = () => { setIsOpen(false); setSelectedId(null); };
  const openNotification = (id: string) => { markAsRead(id); setSelectedId(id); };

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!centerRef.current?.contains(event.target as Node)) close();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return <div className="notification-center" ref={centerRef}>
    <button className="notification-center__trigger" type="button" aria-label={`Oznámení, ${unreadCount} nepřečtená`} aria-expanded={isOpen} onClick={() => setIsOpen((value) => !value)}><Bell size={21} />{unreadCount > 0 && <b>{unreadCount}</b>}</button>
    {isOpen && <>
      <button className="notification-center__mobile-backdrop" type="button" onClick={close} aria-label="Zavřít oznámení" />
      <section className="notification-popover" aria-label="Centrum oznámení">
        {!selected ? <>
          <header><div><h2>Pro vás</h2><span>{unreadCount > 0 ? `${unreadCount} nepřečtená upozornění` : "Vše je přečtené"}</span></div><button type="button" onClick={close} aria-label="Zavřít"><X size={20} /></button></header>
          {unreadCount > 0 && <button className="notification-popover__read-all" type="button" onClick={markAllAsRead}><CheckCheck size={17} /> Označit vše jako přečtené</button>}
          <div className="notification-list">{notifications.map((notification) => {
            const category = notificationCategories.find((item) => item.id === notification.category);
            return <button className={notification.isRead ? "is-read" : "is-unread"} type="button" onClick={() => openNotification(notification.id)} key={notification.id}><i /><span><small>{category?.label}<time>{notification.date} · {notification.time}</time></small><strong>{notification.title}</strong><p>{notification.summary}</p></span><ChevronRight size={17} /></button>;
          })}</div>
        </> : <>
          <header className="notification-detail__header"><button type="button" onClick={() => setSelectedId(null)}><ChevronLeft size={18} /> Zpět</button><button type="button" onClick={close} aria-label="Zavřít"><X size={20} /></button></header>
          <article className="notification-detail"><span className={selected.important ? "is-important" : ""}>{notificationCategories.find((category) => category.id === selected.category)?.label}</span><h2>{selected.title}</h2><time>{selected.date} v {selected.time}</time><p>{selected.body}</p>{selected.articleUrl && <a href={selected.articleUrl} target="_blank" rel="noreferrer">Více informací zde <ExternalLink size={15} /></a>}<small>Upozornění pro vás · město Zlín</small></article>
        </>}
      </section>
    </>}
  </div>;
}
