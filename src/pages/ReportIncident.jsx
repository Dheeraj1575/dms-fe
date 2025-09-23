import { useEffect, useState } from "react";
import { API } from "../api";

export default function ReportIncident() {
  const [form, setForm] = useState({
    title: "",
    type: "Flood",
    description: "",
    latitude: "",
    longitude: "",
    severity: "Medium",
  });
  const [incidents, setIncidents] = useState([]);
  const [message, setMessage] = useState(""); // feedback message
  const [error, setError] = useState("");     // error message

  // Load recent incidents from API
  const loadIncidents = async () => {
    try {
      const data = await API.listIncidents();
      setIncidents(data || []);
    } catch (err) {
      console.error("Failed to load incidents:", err);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setMessage("");
    setError("");

    try {
      const payload = {
        ...form,
        latitude: form.latitude ? Number(form.latitude) : null,
        longitude: form.longitude ? Number(form.longitude) : null,
        status: "Reported",
      };

      // Create incident in backend
      const createdIncident = await API.createIncident(payload);

      // Update the recent incidents list immediately
      setIncidents(prev => [createdIncident, ...prev]);

      // Reset form
      setForm({
        title: "",
        type: "Flood",
        description: "",
        latitude: "",
        longitude: "",
        severity: "Medium",
      });

      // Show success message
      setMessage("✅ Incident reported successfully!");
    } catch (err) {
      console.error(err);
      setError("❌ Failed to report incident. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Report Incident</h2>

      {/* Feedback messages */}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submit} className="card">
        <input
          className="input"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
            <option>Flood</option>
            <option>Fire</option>
            <option>Earthquake</option>
            <option>Cyclone</option>
          </select>
          <select value={form.severity} onChange={e => setForm({ ...form, severity: e.target.value })}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
        </div>
        <textarea
          rows="4"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <input
            className="input"
            placeholder="Latitude"
            value={form.latitude}
            onChange={e => setForm({ ...form, latitude: e.target.value })}
          />
          <input
            className="input"
            placeholder="Longitude"
            value={form.longitude}
            onChange={e => setForm({ ...form, longitude: e.target.value })}
          />
        </div>
        <button type="submit" className="btn">Submit</button>
      </form>

      <h3 style={{ marginTop: 24 }}>Recent Incidents</h3>
      <table className="table card">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Severity</th>
            <th>Status</th>
            <th>Reported</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map(i => (
            <tr key={i.id}>
              <td>{i.title}</td>
              <td>{i.type}</td>
              <td><span className="badge">{i.severity}</span></td>
              <td>{i.status}</td>
              <td className="small">{i.reportedAt ? new Date(i.reportedAt).toLocaleString() : "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
