/* global describe, it, xit */
/* jslint node: true, esnext: true */

'use strict';

const llm = require('loglevel-mixin'),
  connectorMixin = require('kronos-interceptor').ConnectorMixin;


// each endpoint has a step.
// When creating an interceptor a logger is needed. This is done by the step.
const stepMock = {
  name: 'dummy step name',
  type: 'dummy step type'
};

// makes the step a logger
llm.defineLogLevelProperties(stepMock);

// Create the mock interceptor
class _DummyInterceptor {}
class MockReceiveInterceptor extends connectorMixin(_DummyInterceptor) {

  /**
   * Create a new MockReceiveInterseptor.
   * @param validateFunction {function} The function which will validate later on the received data
   */
  constructor(validateFunction) {
    super();

    // stores the validation function as a property
    const props = {
      validateFunction: {
        value: validateFunction
      }
    };

    Object.defineProperties(this, props);
  }

  /**
   * Receives the request from the interecptor before this one.
   * Both parameters will be given to the validation function
   */
  receive(request, oldRequest) {
    // This is a dummy implementation. Must be overwritten by the derived object.
    this.validateFunction(request, oldRequest);

    // creates a success promise
    return Promise.resolve(this);
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

module.exports.MockReceiveInterceptor = MockReceiveInterceptor;
