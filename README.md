# MiddLaundryLive

MiddLaundryLive is a lightweight React web app that displays real-time laundry machine status using MQTT. It connects to ESP32 boards publishing to HiveMQ, listens for washer state updates, and presents them in a simple UI with navigation and client-side routing.

---

## 🚀 Features

- **Live MQTT Integration**  
  Connects to a public HiveMQ WebSocket broker and subscribes to machine topics.
- **Real-time Washer Status**  
  Parses incoming JSON payloads and updates the UI instantly.
- **Client-Side Routing**  
  Home and About pages built using React Router v6.
- **Clean Navigation Bar**  
  Simple navbar for navigating between pages.
- **Netlify Deployment Ready**  
  Supports single-page routing through a `_redirects` file.

---
