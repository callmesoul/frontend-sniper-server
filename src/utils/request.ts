import axios, { AxiosResponse } from 'axios';
export default class HttpRequest {
  request;
  constructor(
    baseUrl: string,
    params?: {
      header?: { [key: string]: any }; // 自定义 header
      errorHandel?: (error: any) => Promise<any>; // 自定义 错误处理
      responseHandel?: (response: AxiosResponse<any>) => Promise<any>; // 自定义 错误处理
    },
  ) {
    this.request = axios.create({
      baseURL: baseUrl,
      timeout: 30000,
      timeoutErrorMessage: '请求超时，请稍后再试',
    });
    this.request.interceptors.request.use(
      async (config) => {
        if (params?.header) {
          for (const i in params?.header) {
            if (typeof params?.header[i] === 'function') {
              config.headers[i] = params?.header[i]();
            } else {
              config.headers[i] = params?.header[i];
            }
          }
        }

        return config;
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      },
    );
    // 添加响应拦截器
    this.request.interceptors.response.use(
      async function (response) {
        // 对响应数据做点什么
        if (params?.responseHandel) {
          return await params.responseHandel(response);
        } else {
          return response.data;
        }
      },
      function (error) {
        if (params?.errorHandel) {
          return params.errorHandel(error);
        } else {
          let message;
          if (error.response) {
            if (error.response.data.error_description) {
              message = error.response.data.error_description;
            } else if (
              error.response.data.message &&
              error.response.data.message !== ''
            ) {
              message = error.response.data.message;
            } else if (
              error.response.data.error &&
              error.response.data.error !== ''
            ) {
              message = error.response.data.error;
            }
          } else {
            message = error.message;
          }
          if (message) {
            return Promise.reject(new Error(message));
          } else {
            // 对响应错误做点什么
            return Promise.reject(error);
          }
        }
      },
    );
  }
}
