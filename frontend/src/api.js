import axios from "axios";

// Base URL for both API calls and uploads
export const BASE_URL = "http://localhost:3000"; // change this when deploying

// Axios instance for API calls (prefix /api automatically)
const api = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export default api;
