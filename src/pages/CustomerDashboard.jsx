import React, { useEffect, useState } from "react";
import { API } from "../api";

export default function CustomerDashboard() {
  const [incidents, setIncidents] = useState([]);
  const [relief, setRelief] = useState([]);

  useEffect(() => {
    API.listIncidents().then(setIncidents);
    API.listRelief().then(setRelief);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Customer Dashboard</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Reported Incidents</h3>
        <ul className="list-disc pl-6">
          {incidents.map((i) => (
            <li key={i.id}>{i.description} at {i.location}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Relief Updates</h3>
        <ul className="list-disc pl-6">
          {relief.map((r) => (
            <li key={r.id}>{r.message} (Incident #{r.incidentId})</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
