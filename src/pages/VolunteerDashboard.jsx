import { useEffect, useState } from "react";
import { API } from "../api";

export default function VolunteerDashboard() {
  const [volunteers, setVolunteers] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    skills: "",
    availability: "Any",
  });

  const load = async () => {
    setVolunteers(await API.listVolunteers());
    setIncidents(await API.listIncidents());
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await API.createVolunteer(form);
    setForm({ name: "", phone: "", skills: "", availability: "Any" });
    await load();
  };

  const assign = async (id, incidentId) => {
    await API.assignVolunteer(id, incidentId);
    await load();
  };

  return (
    <div className="container p-6">
      <h2 className="text-2xl font-bold mb-4">Volunteer Dashboard</h2>

      {/* Volunteer Registration Form */}
      <form onSubmit={submit} className="card p-4 mb-6 shadow-md">
        <h3 className="text-lg font-semibold mb-3">Register as Volunteer</h3>
        <div className="grid grid-cols-2 gap-3">
          <input
            className="input border p-2"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="input border p-2"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
        </div>
        <input
          className="input border p-2 w-full mt-2"
          placeholder="Skills (comma separated)"
          value={form.skills}
          onChange={(e) => setForm({ ...form, skills: e.target.value })}
        />
        <select
          className="border p-2 w-full mt-2"
          value={form.availability}
          onChange={(e) => setForm({ ...form, availability: e.target.value })}
        >
          <option>Any</option>
          <option>Weekdays</option>
          <option>Weekends</option>
        </select>
        <button className="btn bg-blue-600 text-white mt-3 px-4 py-2 rounded">
          Register
        </button>
      </form>

      {/* Volunteer List */}
      <h3 className="text-xl font-semibold mb-3">Registered Volunteers</h3>
      <table className="table card w-full border-collapse border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Phone</th>
            <th className="border px-3 py-2">Skills</th>
            <th className="border px-3 py-2">Availability</th>
            <th className="border px-3 py-2">Assigned Incident</th>
            <th className="border px-3 py-2">Assign</th>
          </tr>
        </thead>
        <tbody>
          {volunteers.map((v) => (
            <tr key={v.id}>
              <td className="border px-3 py-2">{v.name}</td>
              <td className="border px-3 py-2">{v.phone}</td>
              <td className="border px-3 py-2">{v.skills}</td>
              <td className="border px-3 py-2">{v.availability}</td>
              <td className="border px-3 py-2">
                {v.assignedIncidentId || "-"}
              </td>
              <td className="border px-3 py-2">
                <select
                  onChange={(e) => assign(v.id, e.target.value)}
                  defaultValue=""
                  className="border p-1"
                >
                  <option value="" disabled>
                    Assign…
                  </option>
                  {incidents.map((i) => (
                    <option key={i.id} value={i.id}>
                      {i.title}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
