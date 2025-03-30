import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsController } from './modules/cars/controllers/cars.controller';
import { CarsService } from './modules/cars/services/cars.service';
import { CarsModule } from './modules/cars/cars.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CarsModule,
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres', //Tipo de BD a utilizar, soporta MySQL, MariaDB, Oracle SQLite
      host: process.env.DB_HOST, //Define la dirección del servidor de la base de datos.
      port: Number(process.env.DB_PORT), //Especifica el puerto en el que el servidor de la base de datos está escuchando
      database: process.env.DB_NAME, //Indica el nombre de la base de datos a la que se conectará la aplicación
      username: process.env.DB_USERNAME, //Especifica el nombre de usuario que se utilizará para autenticar la conexión a la base de datos
      password: process.env.DB_PASSWORD, //Define la contraseña del usuario que se utilizará para la conexión a la base de datos
      autoLoadEntities: true, //Si se establece en true, TypeORM cargará automáticamente todas las entidades que estén registradas en los módulos de la aplicación.
      synchronize: true, //Si se establece en true, TypeORM sincronizará automáticamente la estructura de la base de datos con las entidades definidas en el código cada vez que se inicie la aplicación.
    }),
  ],
  controllers: [AppController, CarsController],
  providers: [AppService, CarsService],
})
export class AppModule {}
