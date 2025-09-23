import { useEffect, useState } from "react";
import { API } from "../api";

export default function TrackRelief() {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState("");
  const [form, setForm] = useState({
    description: "",
    foodKits: 0,
    medicalKits: 0,
    peopleHelped: 0,
  });

  // Load incidents with embedded relief updates
  const load = async () => {
    try {
      const data = await API.listIncidents(); // now includes reliefUpdates
      setIncidents(data || []);
    } catch (err) {
      console.error("Error loading incidents:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Add relief update
  const addUpdate = async (e) => {
    e.preventDefault();
    if (!selectedIncident) return alert("Select an incident");

    try {
      const newUpdate = await API.addRelief(selectedIncident, form);

      // Update the incident's reliefUpdates locally
      setIncidents(prev =>
        prev.map(i =>
          i.id === selectedIncident
            ? { ...i, reliefUpdates: [newUpdate, ...(i.reliefUpdates || [])] }
            : i
        )
      );

      // Reset form
      setForm({ description: "", foodKits: 0, medicalKits: 0, peopleHelped: 0 });
    } catch (err) {
      console.error("Failed to add update:", err);
      alert("Failed to add update. Please try again.");
    }
  };

  // Collect all updates for table display
  const allUpdates = incidents.flatMap(i =>
    (i.reliefUpdates || []).map(u => ({ ...u, incident: i }))
  );

  return (
    <div className="container">
      <h2>Track Relief</h2>

      <div className="card">
        <div className="grid" style={{ gridTemplateColumns: "2fr 1fr", gap: 16 }}>
          {/* Form for adding updates */}
          <form onSubmit={addUpdate}>
            <select
              value={selectedIncident}
              onChange={e => setSelectedIncident(e.target.value)}
              required
            >
              <option value="">Select Incident</option>
              {incidents.map(i => (
                <option key={i.id} value={i.id}>
                  {i.title} — {i.type}
                </option>
              ))}
            </select>

            <textarea
              rows="3"
              className="input"
              placeholder="Update details"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />

            <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              <input
                className="input"
                type="number"
                placeholder="Food kits"
                value={form.foodKits}
                onChange={e => setForm({ ...form, foodKits: Number(e.target.value) })}
              />
              <input
                className="input"
                type="number"
                placeholder="Medical kits"
                value={form.medicalKits}
                onChange={e => setForm({ ...form, medicalKits: Number(e.target.value) })}
              />
              <input
                className="input"
                type="number"
                placeholder="People helped"
                value={form.peopleHelped}
                onChange={e => setForm({ ...form, peopleHelped: Number(e.target.value) })}
              />
            </div>

            <button className="btn" style={{ marginTop: 8 }}>
              Add Update
            </button>
          </form>

          {/* Sidebar showing incidents */}
          <div>
            <div className="card">
              <h4>Incidents</h4>
              <ul className="small">
                {incidents.map(i => (
                  <li key={i.id}>
                    {i.title} — <b>{i.status}</b>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Table for recent relief updates */}
      <h3 style={{ marginTop: 24 }}>Recent Relief Updates</h3>
      <table className="table card">
        <thead>
          <tr>
            <th>Incident</th>
            <th>Update</th>
            <th>Food</th>
            <th>Medical</th>
            <th>People</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {allUpdates.map(u => (
            <tr key={u.id}>
              <td>{u.incident.title}</td>
              <td>{u.updateInfo || u.description}</td>
              <td>{u.foodKits || 0}</td>
              <td>{u.medicalKits || 0}</td>
              <td>{u.peopleHelped || 0}</td>
              <td className="small">{new Date(u.updatedAt || u.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
