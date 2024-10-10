/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { messageContent, setMessageContent } from "@/utils/atoms";
import * as url from "../urls/base";

export class ApiService {
  /**
   * Create Axios Instance.
   */
  private axiosInstance: AxiosInstance;

  /**
   * API Service constructor.
   * Contains of declaration of API Base URL, Request Interceptor, and Response Interceptor.
   */
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: url.APIURL,
    });
  }

  /**
   * Notification Handling
   * To store the message content to Jotai Atom state management.
   * @param type Toast Message type
   * @param message Message from API Response
   * @returns Message Response string
   */
  private notifHandling(
    type: "success" | "warning" | "error",
    content: string
  ) {
    setMessageContent.set(messageContent, {
      type: type,
      content: content ?? "Something went wrong",
    });
    return content;
  }

  /**
   * Request function
   * Used for generalizing the request method from Axios.
   * @param config Axios Request Config
   * @returns Axios Instance function
   */
  protected async request(config: AxiosRequestConfig) {
    try {
      const response = await this.axiosInstance(config);

      return response;
    } catch (error) {
      console.log(error)
      const errorMessage =
        "We can't continue with your request. Please try again later.";
      this.notifHandling("warning", errorMessage);

      throw new Error(errorMessage);
    }
  }

  public async get<T>(url: string, params?: any, headers?: any): Promise<T> {
    const response = await this.request({
      method: "GET",
      url: url,
      headers,
      params,
    });
    return response.data;
  }

  public async post(url: string, payload?: any, headers?: any) {
    return await this.request({
      method: "POST",
      url: url,
      data: payload,
      headers,
    });
  }

  public async put(url: string, payload?: any, headers?: any) {
    return await this.request({
      method: "PUT",
      url: url,
      data: payload,
      headers,
    });
  }

  public async patch(url: string, payload?: any, headers?: any) {
    return await this.request({
      method: "PATCH",
      url: url,
      data: payload,
      headers,
    });
  }

  public async delete(url: string, payload?: any, headers?: any) {
    return await this.request({
      method: "DELETE",
      url: url,
      data: payload,
      headers,
    });
  }
}
