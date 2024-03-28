import { AxiosRequestConfig } from "axios";

export interface LogAdapterModel {
  statusCode?: number;
  response?: {
    data: object | string | null;
  };
  options: AxiosRequestConfig;
  error?: object | null;
}
