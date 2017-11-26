import test from 'ava';

import { Interceptor } from 'kronos-interceptor';
import { Endpoint } from 'kronos-endpoint';
import { interceptorTest } from '../src/ava-interceptor';

test(
  'name 1',
  interceptorTest,
  Interceptor,
  new Endpoint('ep1'),
  {},
  'Interceptor'
);
