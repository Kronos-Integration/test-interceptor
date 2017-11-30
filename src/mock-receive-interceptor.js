import { ConnectorMixin } from 'kronos-interceptor';

export class MockReceiveInterceptor extends ConnectorMixin(class {}) {
  /**
   * Create a new MockReceiveInterseptor.
   * @param validateFunction {function} The function which will validate later on the received data
   */
  constructor(validateFunction) {
    super();

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

// --------------------------------------------
// Example for a validation function
// --------------------------------------------
// const exampleValidationFunction = function (request, oldRequest) {
//   assert.ok(request);
//   assert.equal(request.hops.length, 1);
//   assert.ok(request.hops[0].host);
//   assert.ok(request.hops[0].id);
//   assert.ok(request.hops[0].time);
//
//   delete(request.hops[0].host);
//   delete(request.hops[0].id);
//   delete(request.hops[0].time);
//
//   assert.deepEqual(request, {
//     "hops": [{
//       "stepName": "dummy step name",
//       "stepType": "dummy step type"
//     }],
//     "info": "first message",
//     "payload": {}
//   });
//   done();
//
// });
