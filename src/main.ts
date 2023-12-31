import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prisma = app.get(PrismaService);
  prisma.enableShutdownHooks(app);
  app.enableCors();
  await app.listen(8080);
}
bootstrap();
