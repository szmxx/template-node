import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";

interface HttpParams {
  BASEURL?: string;
  TIMEOUT?: number;
  errorHandler?: (error: AxiosError, ctx?: AxiosInstance) => Promise<unknown>;
}
export default class Http {
  instance: AxiosInstance;
  constructor({
    BASEURL,
    TIMEOUT = 1000 * 60 * 10,
    errorHandler = async () => void 0,
  }: HttpParams) {
    this.instance = axios.create({
      baseURL: BASEURL,
      timeout: TIMEOUT,
      withCredentials: true,
    });
    // 拦截请求
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
      async (error: AxiosError) => {
        return error;
      }
    );
    // 拦截响应
    this.instance.interceptors.response.use(
      ({ config, data, headers }: AxiosResponse) => {
        if (config.method === "head") {
          return Promise.resolve(headers);
        }
        return Promise.resolve(data);
      },
      (error: AxiosError) => {
        return error;
      }
    );
  }
  static async get(url: string, config?: AxiosRequestConfig) {
    return (await axios.get(url, config))?.data;
  }
  static async post(
    url: string,
    data?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ) {
    return (await axios.post(url, data, config))?.data;
  }
}
