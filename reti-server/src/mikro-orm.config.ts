import path from 'path';
import { MikroORM } from '@mikro-orm/core';
import { User } from './entities/User';
import { __prod__ } from './constants';
import { Apartment } from './entities/Apartment';

console.log('path: ', __dirname);

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Apartment, User],
  dbName: 'reti',
  type: 'postgresql',
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
