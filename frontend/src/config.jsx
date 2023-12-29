import axios from "axios";

// axios.defaults.baseURL = process.env.VITE_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  // baseURL: " http://localhost:3000/api/",
});

export default axiosInstance;
