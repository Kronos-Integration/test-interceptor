import test from "ava";
import { interceptorTest } from "../src/module.mjs";
import { Interceptor } from "@kronos-integration/interceptor";
import { Endpoint } from "@kronos-integration/endpoint";

test("simple", async t => {
  await interceptorTest(
    t,
    Interceptor,
    {},
    {},
    new Endpoint("ep1"),
    [],
    (...args) => {},
    () => {
      t.pass();
    }
  );
});
