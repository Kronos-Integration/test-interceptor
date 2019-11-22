import { ConnectorMixin } from "@kronos-integration/interceptor";

/**
 * @param validateFunction {Function} The function which will validate later on the received data
 */
export class MockReceiveInterceptor extends ConnectorMixin(class {}) {
  constructor(endpoint, validateFunction) {
    super(endpoint);

    Object.defineProperties(this, {
      validateFunction: {
        value: validateFunction
      }
    });
  }

  /**
   * Receives the request from the interecptor before this one.
   * Both parameters will be given to the validation function
   */
  async receive(request, oldRequest) {
    // This is a dummy implementation. Must be overwritten by the derived object.
    this.validateFunction(request, oldRequest);

    return this;
  }
}
