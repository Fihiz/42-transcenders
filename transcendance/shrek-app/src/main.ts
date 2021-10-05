import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const passport = require('passport');
const session = require('express-session');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  next();
});
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
