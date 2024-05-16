export const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? "http://polyrag.cluster-ig3.igpolytech.fr"
    : "http://localhost:5000";
