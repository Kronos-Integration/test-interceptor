/* global describe, it, xit */
/* jslint node: true, esnext: true */

"use strict";

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should(),
  Interceptor = require('kronos-interceptor').Interceptor;

/**
 * @param {Class} factory interceptor Class
 * @param {Endpoint} ep endpoint to assign
 * @param {Object} config to assing
 * @param {String} type type identifier to use
 * @param {Function} cp for additional tests
 */
module.exports.mochaInterceptorTest =
  function (factory, ep, config, type, cb) {
    const itc = new factory(ep, config);

    function checkInterceptor(inst, withConfig) {
      it('factory has a type', () => assert.equal(factory.type, type));
      it('instance has a type', () => assert.equal(inst.type, type));
      it('has endpoint', () => assert.equal(inst.endpoint, ep));

      if (!withConfig) {
        describe('connections', function () {
          //console.log(`conected: ${inst.conected} ${withConfig}`);
          it('initially not connected', () => assert.isFalse(inst.isConnected));
          it('undefined otherEnd', () => assert.isUndefined(inst.otherEnd));

          describe('connect', function () {
            it('can connected', () => {
              const itc2 = new Interceptor(inst.endpoint);
              inst.injectNext(itc2);
              assert.isDefined(inst.connected);
              assert.isTrue(inst.isConnected);
              assert.equal(inst.otherEnd, itc2);

              inst.connected = undefined;
              assert.isFalse(inst.isConnected);
            });
          });
        });
      }

      if (cb) {
        describe('advanced', () => cb(itc, withConfig));
      }
    }

    describe(`${factory.name} creation`, function () {
      describe('without config', () => checkInterceptor(new factory(ep), false));

      describe('with config', () => checkInterceptor(itc, true));
    });

    return itc;
  };
