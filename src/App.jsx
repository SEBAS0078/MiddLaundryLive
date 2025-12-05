import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import mqtt from "mqtt";

import Navbar from "./NavBar";
import About from "./pages/About";
import Home from "./Home";
import "./App.css";

function App() {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

    client.on("connect", () => {
      console.log("Connected to MQTT broker");
      client.subscribe("laundry/board2/data");
    });

    client.on("message", (_, payload) => {
      try {
        const data = JSON.parse(payload.toString());
        setMessage(data.washerState);
      } catch (err) {
        console.error("Invalid JSON:", err);
      }
    });

    return () => client.end();
  }, []);

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Welcome to MiddLaundryLive</h1>
              <h3>Last message:</h3>
              <p>{message}</p>
            </div>
          }
        />

        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
