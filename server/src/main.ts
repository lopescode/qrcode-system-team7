import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as path from 'path'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableCors()
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'))

  await app.listen(3000)
}

bootstrap().catch((error: Error) => {
  console.error(error.message)
})
