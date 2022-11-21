import { TypeOrmModule } from '@nestjs/typeorm';

export const getDatabaseConnection = () =>
  TypeOrmModule.forRoot({
    type: 'mssql',
    host: process.env.DATABASE_HOST,
    port: 1433,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    // entities: [DeliveryOrderDetails],
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: false,
    options: {
      encrypt: false,
    },
  });
