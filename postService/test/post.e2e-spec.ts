import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

describe('PostController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AmqpConnection).useValue({publish: () => ({})})
      .overrideProvider(RabbitMQModule).useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(() => app.close())

  describe('/ (POST)', () => {
    it('should add post to database and return imgUrl', async() => {
        const response = await request(app.getHttpServer())
          .post('/post')
          .send({imgUrl: 'www.google.pl'})
          .expect(201);
        expect(response.body.imgUrl).toBe('www.google.pl');
    })

    it('should try to create post without image', () => {
      return request(app.getHttpServer())
        .post('/post')
        .send({imgUrl: ''})
        .expect(400);
    })
  });
});
