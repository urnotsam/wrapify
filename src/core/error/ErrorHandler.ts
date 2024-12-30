import { ApiError } from "./ApiError.js";

export class ErrorHandler {
  static handle(error: any) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.statusText || "Unknown error occurred";
      const details = error.response.data;
      throw new ApiError(message, status, details);
    } else if (error.request) {
      throw new ApiError(
        "No response received from the server",
        undefined,
        error.request,
      );
    } else {
      throw new ApiError(error.message);
    }
  }
}
