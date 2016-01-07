/* global describe, it, xit */
/* jslint node: true, esnext: true */

"use strict";

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  MockReceiveInterceptor = require('../index').MockReceiveInterceptor;



describe('Message Handler', function () {

  it('Create', function (done) {
    const exampleValidationFunction = function (request, oldRequest) {
      assert.ok(request);
      done();
    };

    const mock = new MockReceiveInterceptor(exampleValidationFunction);
    mock.receive({
      "some": "thing"
    });

  });
});
