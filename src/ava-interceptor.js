import { Interceptor } from 'kronos-interceptor';
import test from 'ava';

async function dummy() {}

/**
 * @param {ava} t ava test runner
 * @param {Class} Factory interceptor Class
 * @param {Endpoint} endpoint endpoint to assign
 * @param {Object} config to assing
 * @param {string} type type identifier to use
 * @param {Function} further for additional tests
 */
export async function interceptorTest(
  t,
  Factory,
  endpoint,
  config,
  type,
  further = dummy
) {
  t.is(Factory.name, type);

  const instance = new Factory(undefined, endpoint);

  t.is(instance.type, type);
  t.is(instance.endpoint, endpoint);

  instance.reset();

  await further(t, instance, false);

  const instanceWithConfig = new Factory(config, endpoint);

  t.is(instanceWithConfig.type, type);
  t.is(instanceWithConfig.endpoint, endpoint);

  instanceWithConfig.reset();

  await further(t, instanceWithConfig, true);
}

interceptorTest.title = (providedTitle, Factory, endpoint, config, type) =>
  `${providedTitle} ${type}`.trim();

//test('providedTitle', interceptorTest, Factory, endpoint, config, type);

/*
function mochaInterceptorTest(Factory, ep, config, type, cb) {
  const itc = new Factory(config, ep);

  function checkInterceptor(inst, withConfig) {
    it('factory has a name', () => assert.equal(Factory.name, type));
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

  describe(`${Factory.name} creation`, function() {
    describe('without config', () =>
      checkInterceptor(new Factory(undefined, ep), false));

    describe('with config', () => checkInterceptor(itc, true));
  });

  return itc;
}
*/

export class TestInterceptor extends Interceptor {
  static get name() {
    return 'test-interceptor';
  }

  receive(request, oldRequest) {
    if (!request.hops) request.hops = [];
    request.hops.push(this.config.name);

    return super.receive(request, oldRequest);
  }
}

export function testResponseHandler(request) {
  return new Promise((resolve, reject) => {
    if (request.delay) {
      setTimeout(
        () => (request.reject ? resolve(request) : reject(request)),
        request.delay
      );
    } else {
      if (request.reject) {
        reject(request);
      } else {
        resolve(request);
      }
    }
  });
}
