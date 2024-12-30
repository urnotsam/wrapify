export type Middleware = (config: any) => any;

export class MiddlewareManager {
  private middlewares: Middleware[] = [];

  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  apply(config: any) {
    return this.middlewares.reduce(
      (acc, middleware) => middleware(acc),
      config,
    );
  }
}
