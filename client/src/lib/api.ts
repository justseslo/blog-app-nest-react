import axios, { AxiosError } from "axios";
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  withCredentials: true,
});
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    console.error(error)
    if (error instanceof AxiosError && error.response?.status === 401) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        if (res.data.success) {
          return axios.request(error.config!);
        }
      } catch (refreshError) {
        console.error(refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
