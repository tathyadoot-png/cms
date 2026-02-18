import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'
import { RolesGuard } from './common/guards/roles.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.use(cookieParser())

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  })

  await app.listen(4000)
  const reflector = app.get(Reflector);
app.useGlobalGuards(new RolesGuard(reflector));

}
bootstrap()
