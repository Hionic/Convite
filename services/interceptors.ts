import api from "./api";
import type { AxiosError } from "axios";

export default function interceptors(): void {
  api.interceptors.request.use(
    (request: Request) => {
      return request;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    (response: Response) => {
      console.log(response);
      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );
}
