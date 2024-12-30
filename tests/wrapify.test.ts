import { wrapify } from "../src/apis/index.js";
import { ApiError } from "../src/core/error/ApiError.js";

const definitionPath = "example/apiDefinition.json";

const { api, middlewareManager, responseInterceptorManager, authManager } =
  wrapify(definitionPath);

describe("wrapify", () => {
  it("should fetch a user", async () => {
    const user = await api.getUser({ id: "1" });
    expect(user).toHaveProperty("id", 1);
  });

  it("should create a new post", async () => {
    const newPost = await api.createPost({
      title: "Test Post",
      body: "This is a test post.",
      userId: 1,
    });
    expect(newPost).toHaveProperty("title", "Test Post");
  });

  it("should handle API errors", async () => {
    authManager.setApiKey("invalid-api-key");

    await expect(api.getUser({ id: "9999" })).rejects.toThrow(ApiError);
  });

  it("should apply middleware correctly", async () => {
    middlewareManager.use((config) => {
      config.headers = { ...config.headers, "X-Test-Header": "test-value" };
      return config;
    });

    const user = await api.getUser({ id: "1" });
    expect(user).toBeDefined();
  });

  it("should use response interceptors correctly", async () => {
    responseInterceptorManager.use((response) => {
      response.intercepted = true;
      return response;
    });

    const user = await api.getUser({ id: "1" });
    expect(user).toHaveProperty("intercepted", true);
  });

  it("should validate API definition", async () => {
    expect(() => wrapify("invalid-path.json")).toThrowError(
      /Failed to load or parse API definition JSON/
    );
  });
});
