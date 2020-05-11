export async function wait(msecs = 1000) {
  return new Promise((resolve, reject) => setTimeout(() => resolve(), msecs));
}

export const logger = {
  trace(a) {
    console.log(a);
  },
  debug(a) {
    console.log(a);
  },
  error(a) {
    console.log(a);
  },
  warn(a) {
    console.log(a);
  },
  info(a) {
    console.log(a);
  }
};

export function dummyEndpoint(name, owner = logger) {
  return {
    get name() {
      return name;
    },
    get identifier() {
      return name;
    },
    toString() {
      return this.name;
    },
    owner
  };
}

export const testResponseHandler = {
  async receive(...args) {}
};

/**
 * @param {ava} t ava test runner
 * @param {Class} factory interceptor Class
 * @param {Object} config to assing
 * @param {any} expected
 * @param {Endpoint} endpoint endpoint to assign
 * @param {Array} args
 * @param {Function} next
 */
export async function interceptorTest(
  t,
  factory,
  config,
  expected = {},
  endpoint,
  args = [],
  next = (...args) => 0,
  asserts = () => {}
) {
  const instance = new factory(config);

  instance.reset();

  for (const [name, exp] of Object.entries(expected)) {
    switch (name) {
      case "json":
        t.deepEqual(instance.toJSON(), exp, name);
        break;
      default:
        t.is(instance[name], exp, name);
    }
  }

  const result = await instance.receive(endpoint, next, ...args);

  asserts(t, instance, endpoint, next, result);
}

interceptorTest.title = (providedTitle, factory, config, expected) =>
  `${providedTitle} ${factory.name} ${JSON.stringify(config)}`.trim();
