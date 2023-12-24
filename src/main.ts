import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './infra/common/filter/all.exception.filter';
import { LoggerService } from './infra/common/logger/logger.service';

async function bootstrap() {
  const httpsOptions: HttpsOptions = {
    key: readFileSync(
      '../../../etc/letsencrypt/live/alabarda.link/privkey.pem',
    ),
    cert: readFileSync(
      '../../../etc/letsencrypt/live/alabarda.link/fullchain.pem',
    ),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
  });

  await app.listen(4000);
}
bootstrap();
