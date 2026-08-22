import test from "ava";
import { interceptorTest } from "@kronos-integration/test-interceptor";
import { Interceptor } from "@kronos-integration/interceptor";
import { Endpoint } from "@kronos-integration/endpoint";

test("simple", async t => {
  await interceptorTest(
    t,
    Interceptor,
    { setup: (t,interceptor) => { t.context.setupDone = 77;} },
    {},
    new Endpoint("ep1"),
    [],
    (...args) => {},
    () => {
      t.pass();
    }
  );

  t.is(t.context.setupDone,77)
});
