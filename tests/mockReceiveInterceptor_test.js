/* global describe, it, xit */
/* jslint node: true, esnext: true */

'use strict';

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  {
    MockReceiveInterceptor
  } = require('../dist/module');

describe('Message Handler', () => {
  it('Create', function (done) {
    const exampleValidationFunction = (request, oldRequest) => {
      assert.ok(request);
      done();
    };

    const mock = new MockReceiveInterceptor(exampleValidationFunction);
    mock.receive({
      some: 'thing'
    });
  });
});
