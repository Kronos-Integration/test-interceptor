/* global describe, it, xit */
/* jslint node: true, esnext: true */

"use strict";

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  Interceptor = require('kronos-interceptor').Interceptor;

class TestInterceptor extends Interceptor {

  static get type() {
    return "test-interceptor";
  }

  get type() {
    return TestInterceptor.type;
  }

  receive(request, oldRequest) {
    if (!request.hops) request.hops = [];
    request.hops.push(this.config.name);

    return super.receive(request, oldRequest);
  }
}

exports.TestInterceptor = TestInterceptor;


/**
 * @param {Class} factory interceptor Class
 * @param {Endpoint} ep endpoint to assign
 * @param {Object} config to assing
 * @param {String} type type identifier to use
 * @param {Function} cp for additional tests
 */
exports.mochaInterceptorTest =
  function (Factory, ep, config, type, cb) {
    const itc = new Factory(config, ep);

    function checkInterceptor(inst, withConfig) {
      it('factory has a type', () => assert.equal(Factory.type, type));
      it('instance has a type', () => assert.equal(inst.type, type));
      it('has endpoint', () => assert.equal(inst.endpoint, ep));
      describe('can be resetted', () => {
        inst.reset();
      });

      if (!withConfig) {
        describe('connections', () => {
          //console.log(`conected: ${inst.conected} ${withConfig}`);
          it('initially not connected', () => assert.isFalse(inst.isConnected));
          it('undefined otherEnd', () => assert.isUndefined(inst.otherEnd));

          describe('connect', () => {
            it('can connected', () => {
              const itc2 = new Interceptor(undefined, inst.endpoint);
              inst.injectNext(itc2);
              assert.isDefined(inst.connected);
              assert.isTrue(inst.isConnected);
              assert.equal(inst.otherEnd, itc2);

              const itc3 = new Interceptor(undefined, inst.endpoint);
              itc2.connected = itc3;
              assert.equal(itc2.connected, itc3);
              inst.removeNext();
              assert.equal(inst.connected, itc3);

              inst.connected = undefined;
              assert.isFalse(inst.isConnected);
              assert.isUndefined(inst.otherEnd);
            });
          });
        });
      }

      if (cb) {
        describe('advanced', () => cb(inst, withConfig));

        describe('can still be resetted', () => {
          inst.reset();
        });
      }
    }

    describe(`${Factory.name} creation`, function () {
      describe('without config', () => checkInterceptor(new Factory(undefined, ep), false));

      describe('with config', () => checkInterceptor(itc, true));
    });

    return itc;
  };

exports.testResponseHandler = request => {
  return new Promise((fullfilled, rejected) => {
    if (request.delay) {
      setTimeout(() => request.reject ? rejected(request) : fullfilled(request), request.delay);
    } else {
      if (request.reject) {
        rejected(request);
      } else {
        fullfilled(request);
      }
    }
  });
};
