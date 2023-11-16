import Http from "##/utils/http.ts";
import { AxiosError, AxiosInstance } from "axios";
import { HttpConfig } from "##/config/index.ts";
const errorHandler = async (error: AxiosError) => {
  return Promise.reject(error);
};

interface InstanceMap {
  [key: string]: AxiosInstance;
}

export interface AxiosConfig {
  BASEURL: string;
  TIMEOUT: number;
}
const instanceMap: InstanceMap = {
  base: new Http({
    BASEURL: HttpConfig.BASEURL,
    TIMEOUT: HttpConfig.TIMEOUT,
    errorHandler,
  }).instance, // 当前系统ip下的请求
  origin: new Http({
    errorHandler,
  }).instance, // 完整的url请求
};

// 基础get方法
const get = <T>(
  instance: AxiosInstance,
  url: string,
  serviceName = "未知服务",
  params = {},
  options = {}
) => {
  return new Promise<T>((resolve, reject) => {
    instance({
      url,
      method: "get",
      params: params,
      ...options,
    })
      .then((res) => {
        resolve(res?.data ? res.data : res);
      })
      .catch((error) => {
        reject(error);
        console.error(`get请求---${serviceName}---接口失败！`);
      });
  });
};
// 基础post方法
const post = <T>(
  instance: AxiosInstance,
  url: string,
  serviceName = "未知服务",
  data = {},
  options = {}
) => {
  return new Promise<T>((resolve, reject) => {
    instance({
      url,
      method: "post",
      data: data,
      ...options,
    })
      .then((res) => {
        resolve(res?.data ? res.data : res);
      })
      .catch((error) => {
        reject(error);
        console.error(`post请求---${serviceName}---接口失败！`);
      });
  });
};
// 基础put方法
const put = <T>(
  instance: AxiosInstance,
  url: string,
  serviceName = "未知服务",
  data = {},
  options = {}
) => {
  return new Promise<T>((resolve, reject) => {
    instance({
      url,
      method: "put",
      data: data,
      ...options,
    })
      .then((res) => {
        resolve(res?.data ? res.data : res);
      })
      .catch((error) => {
        reject(error);
        console.error(`put请求---${serviceName}---接口失败！`);
      });
  });
};
// 基础delete方法
const del = <T>(
  instance: AxiosInstance,
  url: string,
  serviceName = "未知服务",
  data = {},
  options = {}
) => {
  return new Promise<T>((resolve, reject) => {
    instance({
      url,
      method: "delete",
      data: data,
      ...options,
    })
      .then((res) => {
        resolve(res?.data ? res.data : res);
      })
      .catch((error) => {
        reject(error);
        console.error(`delete请求---${serviceName}---接口失败！`);
      });
  });
};

const head = <T>(
  instance: AxiosInstance,
  url: string,
  serviceName = "未知服务",
  params = {},
  options = {}
) => {
  return new Promise<T>((resolve, reject) => {
    instance({
      url,
      method: "head",
      params: params,
      ...options,
    })
      .then((res) => {
        resolve(res?.data ? res.data : res);
      })
      .catch((error) => {
        reject(error);
        console.error(`head请求---${serviceName}---接口失败！`);
      });
  });
};

export const GET = <T>(
  url: string,
  serviceName?: string,
  params?: Record<string, any>,
  options?: Record<string, any>
): Promise<T> => {
  return get<T>(instanceMap.base, url, serviceName, params, options);
};
export const POST = <T>(
  url: string,
  serviceName?: string,
  data?: Record<string, any>,
  options?: Record<string, any>
): Promise<T> => {
  return post<T>(instanceMap.base, url, serviceName, data, options);
};
export const PUT = <T>(
  url: string,
  serviceName?: string,
  data?: Record<string, any>,
  options?: Record<string, any>
): Promise<T> => {
  return put<T>(instanceMap.base, url, serviceName, data, options);
};
export const DELETE = <T>(
  url: string,
  serviceName?: string,
  data?: Record<string, any>,
  options?: Record<string, any>
): Promise<T> => {
  return del<T>(instanceMap.base, url, serviceName, data, options);
};
export const HEAD = <T>(
  url: string,
  serviceName?: string,
  params?: Record<string, any>,
  options?: Record<string, any>
): Promise<T> => {
  return head<T>(instanceMap.base, url, serviceName, params, options);
};

export const originGet = <T>(
  url: string,
  serviceName?: string,
  params?: Record<string, any>,
  options?: Record<string, any>
): Promise<T> => {
  return get<T>(instanceMap.origin, url, serviceName, params, options);
};

export const originPost = <T>(
  url: string,
  serviceName?: string,
  data?: Record<string, any>,
  options?: Record<string, any>
): Promise<T> => {
  return post<T>(instanceMap.origin, url, serviceName, data, options);
};
