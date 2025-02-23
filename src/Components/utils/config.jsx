export const serverUrl =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

export const defaultAxiosOptions = {
  baseURL: serverUrl,
  withCredentials: true, // для выполнения кросс-доменных запросов
  headers: {
    "Content-Type": "application/json",
  },
};
