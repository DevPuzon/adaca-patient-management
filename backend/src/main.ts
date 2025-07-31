import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { environment } from './common/utils/common.util';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  await app.listen(environment('BACKEND_PORT'));
  console.log('serving...', environment('BACKEND_PORT'));
}
bootstrap();
