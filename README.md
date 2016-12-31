[![npm](https://img.shields.io/npm/v/kronos-test-interceptor.svg)](https://www.npmjs.com/package/kronos-test-interceptor)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/Kronos-Integration/kronos-test-interceptor)
[![Build Status](https://secure.travis-ci.org/Kronos-Integration/kronos-test-interceptor.png)](http://travis-ci.org/Kronos-Integration/kronos-test-interceptor)
[![bithound](https://www.bithound.io/github/Kronos-Integration/kronos-test-interceptor/badges/score.svg)](https://www.bithound.io/github/Kronos-Integration/kronos-test-interceptor)
[![codecov.io](http://codecov.io/github/Kronos-Integration/kronos-test-interceptor/coverage.svg?branch=master)](http://codecov.io/github/Kronos-Integration/kronos-test-interceptor?branch=master)
[![Coverage Status](https://coveralls.io/repos/Kronos-Integration/kronos-test-interceptor/badge.svg)](https://coveralls.io/r/Kronos-Integration/kronos-test-interceptor)
[![Code Climate](https://codeclimate.com/github/Kronos-Integration/kronos-test-interceptor/badges/gpa.svg)](https://codeclimate.com/github/Kronos-Integration/kronos-test-interceptor)
[![Known Vulnerabilities](https://snyk.io/test/github/Kronos-Integration/kronos-test-interceptor/badge.svg)](https://snyk.io/test/github/Kronos-Integration/kronos-test-interceptor)
[![GitHub Issues](https://img.shields.io/github/issues/Kronos-Integration/kronos-test-interceptor.svg?style=flat-square)](https://github.com/Kronos-Integration/kronos-test-interceptor/issues)
[![Stories in Ready](https://badge.waffle.io/Kronos-Integration/kronos-test-interceptor.svg?label=ready&title=Ready)](http://waffle.io/Kronos-Integration/kronos-test-interceptor)
[![Dependency Status](https://david-dm.org/Kronos-Integration/kronos-test-interceptor.svg)](https://david-dm.org/Kronos-Integration/kronos-test-interceptor)
[![devDependency Status](https://david-dm.org/Kronos-Integration/kronos-test-interceptor/dev-status.svg)](https://david-dm.org/Kronos-Integration/kronos-test-interceptor#info=devDependencies)
[![docs](http://inch-ci.org/github/Kronos-Integration/kronos-test-interceptor.svg?branch=master)](http://inch-ci.org/github/Kronos-Integration/kronos-test-interceptor)
[![downloads](http://img.shields.io/npm/dm/kronos-test-interceptor.svg?style=flat-square)](https://npmjs.org/package/kronos-test-interceptor)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

kronos-test-interceptor
=====
test support for kronos interceptors

# API Reference

* <a name="mochaInterceptorTest"></a>

## mochaInterceptorTest(factory, ep, config, type, cp)
**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| factory | <code>Class</code> | interceptor Class |
| ep | <code>Endpoint</code> | endpoint to assign |
| config | <code>Object</code> | to assing |
| type | <code>String</code> | type identifier to use |
| cp | <code>function</code> | for additional tests |


* <a name="MockReceiveInterceptor+receive"></a>

## mockReceiveInterceptor.receive()
Receives the request from the interecptor before this one.
Both parameters will be given to the validation function

**Kind**: instance method of <code>[MockReceiveInterceptor](#MockReceiveInterceptor)</code>  

* * *

install
=======

With [npm](http://npmjs.org) do:

```shell
npm install kronos-test-interceptor
```

license
=======

BSD-2-Clause
