import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { AppService } from './app.service';
import { PrismaModule } from './infra/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AppGateway, AppService],
})
export class AppModule {}
