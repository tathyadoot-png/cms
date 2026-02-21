import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common'
import { RolesGuard } from './common/guards/roles.guard'
import { Reflector } from '@nestjs/core'
import helmet from 'helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 🔐 Security Headers
  app.use(helmet())

  // 🍪 Cookie Support
  app.use(cookieParser())

  // 🌍 CORS (Environment Based)
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://your-production-domain.com'
        : 'http://localhost:3000',
    credentials: true,
  })

  // 🛡 Global Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )



  await app.listen(4000)

  console.log(`🚀 Server running on http://localhost:4000`)
}

bootstrap()
