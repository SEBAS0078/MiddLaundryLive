import { useState, useEffect } from "react";
import mqtt from "mqtt";

const buildings = [
  { id: 1, name: "Battell" },
  { id: 2, name: "Forest Hall" },
  { id: 3, name: "Hepburn" },
  { id: 4, name: "Gifford" },
];

export default function Home() {
  const [board2State, setBoard2State] = useState(null);
  const [selected, setSelected] = useState(buildings[0].name);

  useEffect(() => {
    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

    client.on("connect", () => {
      client.subscribe([`laundry/${selected}/01/data`], () => {
        console.log(`Subscribed to ${selected}`);
      });
    });

    client.on("message", (topic, payload) => {
      try {
        const data = JSON.parse(payload.toString());
        if (topic === `laundry/${selected}/01/data`) {
          setBoard2State(data.washerState);
        }
      } catch (e) {
        console.error("Invalid JSON:", e);
      }
    });

    return () => client.end();
  }, [selected]);

  return (
    <div className="laundry-container">
      <h1 className="title">MiddLaundry Live</h1>
        <p>Your laundry management solution</p>


      <div className="selector-group">
        <label className="label">Select your building:</label>
        <select
          className="building-select"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          {buildings.map((b) => (
            <option key={b.id} value={b.name}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <h3 className="building-title">{selected}</h3>

      <div className="status-wrapper">
        <span
          className={`status-indicator ${
            board2State === "on" ? "status-on" : "status-off"
          }`}
        ></span>
        <p className="status-text">{board2State === "on" ? "ON" : "OFF"}</p>
      </div>

      <p className="refresh-note">*Refreshes every 5 seconds*</p>
    </div>
  );
}
