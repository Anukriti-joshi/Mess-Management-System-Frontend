import axios from "axios";

// Use environment variable or fallback to localhost for development
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
