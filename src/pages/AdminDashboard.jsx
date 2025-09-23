import React, { useEffect, useState } from "react";
import { API } from "../api";

export default function AdminDashboard() {
  const [incidents, setIncidents] = useState([]);
  const [resources, setResources] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    API.listIncidents().then(setIncidents);
    API.listResources().then(setResources);
    API.listVolunteers().then(setVolunteers);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Incidents</h3>
        <ul className="list-disc pl-6">
          {incidents.map((i) => (
            <li key={i.id}>{i.description} ({i.location})</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Resources</h3>
        <ul className="list-disc pl-6">
          {resources.map((r) => (
            <li key={r.id}>{r.name} - {r.quantity}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">Volunteers</h3>
        <ul className="list-disc pl-6">
          {volunteers.map((v) => (
            <li key={v.id}>{v.name} ({v.status})</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
