import ApiClient from "../core/ApiClient.js";
import { MiddlewareManager } from "../core/MiddlewareManager.js";
import { ResponseInterceptorManager } from "../core/ResponseInterceptorManager.js";
import { ErrorHandler } from "../core/error/ErrorHandler.js";
import { AuthManager } from "../core/AuthManager.js";
import { ApiDefinition } from "../types/ApiDefinition.js";
import fs from "fs";
import path from "path";

export function wrapify(definitionPath: string) {
let definitionContent: string;
let definition: ApiDefinition;

try {
    definitionContent = fs.readFileSync(path.resolve(definitionPath), "utf8");
    definition = JSON.parse(definitionContent);
} catch (error: any) {
    throw new Error(
        `Failed to load or parse API definition JSON: ${error.message}`
    );
}

const api: Record<string, Function> = {};
const client = new ApiClient(definition.baseURL);
const middlewareManager = new MiddlewareManager();
  const responseInterceptorManager = new ResponseInterceptorManager();
  const authManager = new AuthManager();

  for (const [name, endpoint] of Object.entries(definition.endpoints)) {
    api[name] = async (args: Record<string, any>) => {
      let config: any = {
        method: endpoint.method,
        url: endpoint.path.replace(/\{(\w+)\}/g, (_, key) => args[key]),
      };

      if (endpoint.params) {
        config.params = Object.fromEntries(
          Object.entries(endpoint.params).map(([key]) => [key, args[key]])
        );
      }

      if (endpoint.body) {
        config.data = Object.fromEntries(
          Object.entries(endpoint.body).map(([key]) => [key, args[key]])
        );
      }

      const token = authManager.getToken();
      const apiKey = authManager.getApiKey();

      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      if (apiKey) {
        config.headers = { ...config.headers, "X-API-Key": apiKey };
      }

      config = middlewareManager.apply(config);

      try {
        const response = await client.request(config);
        return responseInterceptorManager.apply(response.data);
      } catch (error) {
        ErrorHandler.handle(error);
      }
    };
  }

  return { api, middlewareManager, responseInterceptorManager, authManager };
}
