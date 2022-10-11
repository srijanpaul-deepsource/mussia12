import { Avro } from '../types';
import Foo from 'does-not-exist'

const event2: Avro[] = [
  {
    name: 'userId',
    type: 'string',
    description: 'Current user id',
  },
  {
    name: 'tenantId',
    type: 'string',
    description: 'Tenant Id',
  },
];

export { event2, Foo };
