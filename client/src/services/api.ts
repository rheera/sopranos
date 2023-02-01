/**
 * HTTP request layer
 * if auth is required return patched axios instance(with access token in headers)
 * else return clear axios instance
 */

import axios from "axios";

export class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.VUE_APP_API_URL,
    });

    return this.init();
  }

  init() {
    this.instance.interceptors.request.use(
      (request) => {
        return request;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return this.instance;
  }
}
