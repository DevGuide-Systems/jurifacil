import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADVBOX_API_URL,
  headers: {
    Authorization: `Bearer ${process.env.ADVBOX_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export default api;
