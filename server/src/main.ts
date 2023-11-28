import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as path from 'path'
import { AppModule } from './app.module'
import { LoggerService } from './handlers/logger/logger.service'
import { AllExceptionFilter } from './infra/common/filter/all.exception.filter'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()))
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
  })
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'))
  const config = new DocumentBuilder()
    .setTitle('Cardápio online')
    .setDescription('Descrição da API do Cardápio Online')
    .setVersion('1.0')
    .addTag('cardapio-online')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(4000)
}

bootstrap().catch((error: Error) => {
  console.error(error.message)
})
