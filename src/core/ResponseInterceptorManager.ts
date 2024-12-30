export type ResponseInterceptor = (response: any) => any;

export class ResponseInterceptorManager {
  private responseInterceptors: ResponseInterceptor[] = [];

  use(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);
  }

  apply(response: any) {
    return this.responseInterceptors.reduce(
      (acc, interceptor) => interceptor(acc),
      response,
    );
  }
}
