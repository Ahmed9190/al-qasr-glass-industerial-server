import { TypeOrmModule } from '@nestjs/typeorm';
import Branch from 'src/core/enums/branch.enum';
// export const getDatabaseConnection = () =>
//   TypeOrmModule.forRoot({
//     type: 'mssql',
//     host: process.env.DATABASE_HOST,
//     port: 1433,
//     username: process.env.JEDDAH_DATABASE_USERNAME,
//     password: process.env.JEDDAH_DATABASE_PASSWORD,
//     database: process.env.JEDDAH_DATABASE_NAME,
//     // entities: [DeliveryOrderDetails],
//     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//     synchronize: false,
//     options: {
//       encrypt: false,
//     },
//   });

export const getDatabaseProviders = () => [
  TypeOrmModule.forRoot({
    name: Branch.riyadh,
    type: 'mssql',
    host: process.env.DATABASE_HOST,
    port: 1433,
    username: process.env.RIYADH_DATABASE_USERNAME,
    password: process.env.RIYADH_DATABASE_PASSWORD,
    database: process.env.RIYADH_DATABASE_NAME,
    // entities: [DeliveryOrderDetails],
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    options: {
      encrypt: false,
    },
  }),
  TypeOrmModule.forRoot({
    name: Branch.jeddah,
    type: 'mssql',
    host: process.env.DATABASE_HOST,
    port: 1433,
    username: process.env.JEDDAH_DATABASE_USERNAME,
    password: process.env.JEDDAH_DATABASE_PASSWORD,
    database: process.env.JEDDAH_DATABASE_NAME,
    // entities: [DeliveryOrderDetails],
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    options: {
      encrypt: false,
    },
  }),
  TypeOrmModule.forRoot({
    name: Branch.alqassim,
    type: 'mssql',
    host: process.env.DATABASE_HOST,
    port: 1433,
    username: process.env.ALQASSIM_DATABASE_USERNAME,
    password: process.env.ALQASSIM_DATABASE_PASSWORD,
    database: process.env.ALQASSIM_DATABASE_NAME,
    // entities: [DeliveryOrderDetails],
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    options: {
      encrypt: false,
    },
  }),
];
