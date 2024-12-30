# Wrapify

**Wrapify** is a universal API wrapper framework built with TypeScript. It enables developers to quickly and dynamically create wrappers for REST APIs using JSON definitions. With built-in support for middleware, authentication, error handling, and response interceptors, Wrapify streamlines the process of integrating APIs into your projects.

## Key Features

- **Dynamic API Wrappers:** Generate API clients dynamically from JSON definitions.
- **Middleware Support:** Customize requests with pre-processing middleware.
- **Response Interceptors:** Transform or log responses seamlessly.
- **Authentication:** Support for token-based and API key authentication.
- **Error Handling:** Unified error management with detailed exceptions.

---

## Installation

Install Wrapify via npm:

```bash
npm install wrapify
```

---

## Getting Started

### 1. Define Your API
Create a JSON file that specifies your API's base URL and endpoints. For example:

```json
{
  "baseURL": "https://jsonplaceholder.typicode.com",
  "endpoints": {
    "getUser": {
      "method": "GET",
      "path": "/users/{id}",
      "params": { "id": "string" }
    },
    "createPost": {
      "method": "POST",
      "path": "/posts",
      "body": { "title": "string", "body": "string", "userId": "number" }
    }
  }
}
```

Save this file as `apiDefinition.json`.

### 2. Create the API Wrapper
Use Wrapify to generate the API client:

```typescript
import { wrapify } from "wrapify";

const { api, middlewareManager, responseInterceptorManager, authManager } = wrapify("./apiDefinition.json");
```

### 3. Make API Calls

```typescript
(async () => {
  try {
    // Fetch a user
    const user = await api.getUser({ id: "1" });
    console.log("User:", user);

    // Create a new post
    const newPost = await api.createPost({ title: "My Post", body: "Content", userId: 1 });
    console.log("New Post:", newPost);
  } catch (error) {
    console.error("Error:", error);
  }
})();
```

---

## Advanced Usage

### Middleware
Add custom middleware to modify requests before they are sent:

```typescript
middlewareManager.use((config) => {
  config.headers = { ...config.headers, "X-Custom-Header": "value" };
  return config;
});
```

### Response Interceptors
Transform or log responses:

```typescript
responseInterceptorManager.use((response) => {
  console.log("Response received:", response);
  return response;
});
```

### Authentication
Set authentication tokens or API keys:

```typescript
authManager.setToken("your-jwt-token");
authManager.setApiKey("your-api-key");
```

---

## Testing

Wrapify includes a robust test suite. Run tests with:

```bash
npm test
```

---

## Contributing

Contributions are welcome! Please submit issues or pull requests on [GitHub](https://github.com/your-repo/wrapify).

---

## License

Wrapify is licensed under the MIT License. See `LICENSE` for more details.

