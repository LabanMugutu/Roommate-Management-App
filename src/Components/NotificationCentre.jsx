import React from "react";
import { useNotificationStore } from "../Stores/useNotificationStore";
import "./NotificationCenter.css"; 

export default function NotificationCenter() {
  const {
    notifications,
    markAsRead,
    clearNotifications,
  } = useNotificationStore();

  return (
    <div className="notification-center">
      <div className="notification-header">
        <h3>Notifications</h3>
        {notifications.length > 0 && (
          <button onClick={clearNotifications} className="clear-btn">
            Clear All
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="empty-msg">No notifications 🎉</p>
      ) : (
        <ul className="notification-list">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`notification-item ${
                notif.read ? "read" : "unread"
              }`}
              onClick={() => markAsRead(notif.id)}
            >
              <span className="notification-text">{notif.message}</span>
              <span className="notification-time">{notif.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
