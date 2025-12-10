import { useState, useEffect } from "react";
import mqtt from "mqtt";

const buildings = [
  { id: 1, name: "Battell", numMachines: 3},
  { id: 2, name: "Forest Hall", numMachines: 3},
  { id: 3, name: "Hepburn", numMachines: 3},
  { id: 4, name: "Gifford", numMachines: 3},
];

export default function Home() {
  const [selected, setSelected] = useState("Battell");
  const [machineStates, setMachineStates] = useState({});

  function makeDefaultStates(n) {
    const obj = {};
    for (let i = 1; i <= n; i++) {
      obj[`machine 0${i}`] = "No Data";  // default value when no MQTT yet
    }
    return obj;
  }

  useEffect(() => {
    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
    const defaultMachines ={}
    const selectedBuilding = buildings.find(b => b.name === selected);
    setMachineStates(makeDefaultStates(selectedBuilding.numMachines))
    
    client.on("connect", () => {
      client.subscribe(`laundry/${selected}/+/data`, () => {
        console.log(`Subscribed to ${selected}`);
      });
    });

  client.on("message", (topic, payload) => {
    try {
      const data = JSON.parse(payload.toString());
      const parts = topic.split("/");

      // parts = [ "laundry", "<building>", "<machine>", "data" ]
      if (parts.length === 4 && parts[0] === "laundry" && parts[1] === selected) {

        const machineId = parts[2]; // e.g. "washer1"

        setMachineStates(prev => ({
          ...prev,
          [`machine ${machineId}`]: data.washerState   // "on" or "off"
        }));
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
      <div className="machines-container">
        {Object.entries(machineStates).map(([machineName, state]) => (
          <div key={machineName} className="machine-card">
            <div className="status-wrapper">
              <span className={`status-indicator ${
                state === "No Data" ? "status-NA": state==="on"? "status-off" : "status-on"}`}> 
              </span>
              <p className="status-text">
                {machineName}: {state === "No Data" ? "No Data": state==="on"? "Unavailable" : "Available" }
              </p>
            </div>
          </div>
        ))}
        <p className="refresh-note">*Refreshes every 5 seconds*</p>
      </div>
    </div>
  );
}
