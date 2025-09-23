// Base API URL
export const BASE_URL = "http://localhost:8080/api";

// 🔹 Auth APIs
export async function login(username, password) {
  return http("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export async function signup(username, password, role) {
  return http("/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, password, role }),
  });
}

// 🔹 Generic HTTP function
async function http(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    let message = await res.text();
    throw new Error(message || "API request failed");
  }
  return res.status === 204 ? null : res.json();
}

// 🔹 Main API object
export const API = {
  // Incidents
  listIncidents: () => http("/incidents"),
  getIncident: (id) => http(`/incidents/${id}`),
  createIncident: (data) =>
    http("/incidents", { method: "POST", body: JSON.stringify(data) }),
  updateIncident: (id, data) =>
    http(`/incidents/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteIncident: (id) => http(`/incidents/${id}`, { method: "DELETE" }),

  // Relief Updates
  listRelief: () => http("/relief"),
  addRelief: (incidentId, data) =>
    http(`/relief/${incidentId}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Resources
  listResources: () => http("/resources"),
  createResource: (data) =>
    http("/resources", { method: "POST", body: JSON.stringify(data) }),
  updateResource: (id, data) =>
    http(`/resources/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteResource: (id) => http(`/resources/${id}`, { method: "DELETE" }),

  // Volunteers
  listVolunteers: () => http("/volunteers"),
  createVolunteer: (data) =>
    http("/volunteers", { method: "POST", body: JSON.stringify(data) }),
  assignVolunteer: (id, incidentId) =>
    http(`/volunteers/${id}/assign/${incidentId}`, { method: "PUT" }),
};
