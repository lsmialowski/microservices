import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

describe('feedController (e2e)', () => {
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

  describe('/ (GET)', () => {
    it('should throw Error when no header is set', async() => {
        const response = await request(app.getHttpServer())
          .get('/feed')
          .expect(400);
      expect(response.body.message).toBe('Missing required header user');
    })
  });
    it('should return USER NOT FOUND exception', async() => {
        const response = await request(app.getHttpServer())
          .get('/feed')
          .set('user', '981addc2-ba33-11ea-b3de-0242ac130004')
          .expect(400);
        expect(response.body.message).toBe('user with specific ID not found');
    })
});
