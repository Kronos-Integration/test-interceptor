/* global describe, it, xit */
/* jslint node: true, esnext: true */

"use strict";

const chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

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

    function checkInterceptor(inst) {
      it('factory has a type', function () {
        assert.equal(factory.type, type);
      });
      it('instance has a type', function () {
        assert.equal(inst.type, type);
      });
      it('has endpoint', function () {
        assert.equal(inst.endpoint, ep);
      });

      if (cb) {
        describe('advanced', function () {
          cb(itc);
        });
      }
    }

    describe(`${factory.name} creation`, function () {
      describe('without config', function () {
        checkInterceptor(new factory(ep));
      });

      describe('with config', function () {
        checkInterceptor(itc);
      });
    });

    return itc;
  };
