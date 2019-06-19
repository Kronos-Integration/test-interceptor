import test from 'ava';

import { Interceptor } from 'kronos-interceptor';
import { Endpoint } from 'kronos-endpoint';
import { interceptorTest } from '../src/ava-interceptor.mjs';

test('simple', t => {
  interceptorTest(t, Interceptor, new Endpoint('ep1'), {}, 'Interceptor');
});
