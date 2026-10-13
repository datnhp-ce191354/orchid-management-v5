import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/orchids";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Dùng params + url rỗng để tránh URL có dấu "/" cuối (Spring Boot 3 không match trailing slash -> 404)
export const getOrchids = (search = "") =>
  api.get("", { params: search && search.trim() ? { search: search.trim() } : {} });
export const getOrchid = (id) => api.get(`/${id}`);
export const createOrchid = (payload) => api.post("", payload);
export const updateOrchid = (id, payload) => api.put(`/${id}`, payload);
export const deleteOrchid = (id) => api.delete(`/${id}`);

export default api;
