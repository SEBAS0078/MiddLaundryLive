import { useState, useEffect } from "react";
import mqtt from "mqtt";
import './App.css'

function App() {
 const [message, setMessage] = useState(null);

  useEffect(() => {
    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");
    // connect
    client.on("connect", () => {
      console.log("Connected");

      // subscribe once connected
      client.subscribe("laundry/board2/data", (err) => {
        if (!err) {
          console.log("Subscribed");
        }
      });
    });

    // READ MESSAGES HERE
  client.on("message", (topic, payload) => {
        const text = payload.toString();
        //console.log("Received:", text);

        try {
          const data = JSON.parse(text);
          setMessage(data.washerState); // <- extract washerState
        } catch (e) {
          console.error("Invalid JSON:", e);
        }
    });

    return () => {
      client.end();
    };
  }, []);

  console.log(message)

  return (
    <div>
      <h3>Last message:</h3>
      <p>{message}</p>
    </div>
  )
}

export default App
