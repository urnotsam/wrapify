import type { AxiosInstance } from "axios";
import axios from "axios";

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });
  }

  request(config: any) {
    return this.client.request(config);
  }
}

export default ApiClient;
