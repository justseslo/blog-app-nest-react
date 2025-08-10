import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import cookieParser from 'cookie-parser';
import { AuthGuard } from '@nestjs/passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.enableCors();
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
