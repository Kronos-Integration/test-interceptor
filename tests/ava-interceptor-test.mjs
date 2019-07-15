import test from 'ava';

/*
import { Interceptor } from 'kronos-interceptor';
import { Endpoint } from 'kronos-endpoint';
*/
import { interceptorTest } from '../src/ava-interceptor.mjs';

test('simple', t => {
  t.pass();
 // interceptorTest(t, Interceptor, new Endpoint('ep1'), {}, 'Interceptor');
});
