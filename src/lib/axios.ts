import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080", // you can use env variable
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if you need cookies/session
});

// Example of request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can attach token here if needed
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Example of response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle errors globally here
    return Promise.reject(error);
  }
);

export default axiosInstance;
