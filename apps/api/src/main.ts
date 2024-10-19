import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { PrismaClientExceptionFilterExt } from './filters/prisma-client-exception/prisma-client-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    const globalPrefix = 'api';
    const logger = new Logger(bootstrap.name);
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    const configService = app.get(ConfigService);
    // set up versioning
    app.enableVersioning({ type: VersioningType.URI, prefix: 'v' });
    // TODO - revisit and secure this!
    // app.enableCors({ origin: '*' });
    const title = configService.get<string>('app.title');

    // handle Swagger
    const config = new DocumentBuilder()
        .setTitle(`${title} REST API`)
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    const apiVersion = 'v1';
    const apiFileName = 'swagger';
    SwaggerModule.setup(`${globalPrefix}/${apiVersion}`, app, document, {
        jsonDocumentUrl: `${globalPrefix}/${apiVersion}/${apiFileName}.json`,
        yamlDocumentUrl: `${globalPrefix}/${apiVersion}/${apiFileName}.yaml`,
    });

    // Handle Prisma client exceptions
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaClientExceptionFilterExt(httpAdapter));
    // HTTP exceptions
    app.useGlobalFilters(new HttpExceptionFilter());

    // Run API
    const host = configService.get<string>('app.host');
    const port = configService.get<number>('app.port') || 3000;
    await app.listen(port);

    logger.log(`Application: http://${host}:${port}`);
    logger.log(`API: http://${host}:${port}/${globalPrefix}`);
    logger.log(`Open API by Swagger:`);
    logger.log(`http://${host}:${port}/${globalPrefix}/${apiVersion}`);
    logger.log(`http://${host}:${port}/${globalPrefix}/${apiVersion}/${apiFileName}.json`);
    logger.log(`http://${host}:${port}/${globalPrefix}/${apiVersion}/${apiFileName}.yaml`);
}
bootstrap();
