export interface ApiDefinition {
  baseURL: string;
  endpoints: {
    [name: string]: {
      method: "GET" | "POST" | "PUT" | "DELETE";
      path: string;
      params?: Record<string, string>;
      body?: Record<string, string>;
    };
  };
}
