
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

  const instance = new Factory(endpoint, undefined);

  t.is(instance.type, type);
  t.is(instance.endpoint, endpoint);

  instance.reset();

  await further(t, instance, false);

  const instanceWithConfig = new Factory(endpoint, config);

  t.is(instanceWithConfig.type, type);
  t.is(instanceWithConfig.endpoint, endpoint);

  instanceWithConfig.reset();

  await further(t, instanceWithConfig, true);
}

interceptorTest.title = (providedTitle, Factory, endpoint, config, type) =>
  `${providedTitle} ${type}`.trim();
