import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AmqpConnection, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

describe('UserController (e2e)', () => {
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
    it('should add user to database and return email', async() => {
        const response = await request(app.getHttpServer())
          .post('/user')
          .send({email: 'example_email@email.com'})
          .expect(201);
        expect(response.body.email).toBe('example_email@email.com');
    })
    it('should try to create duplicated account', async() => {
      const response = await request(app.getHttpServer())
        .post('/user')
        .send({email: 'example_email2@email.com'})
        .expect(201);

      expect(response.body.email).toBe('example_email2@email.com');

      const responseSecondTime = await request(app.getHttpServer())
        .post('/user')
        .send({email: 'example_email2@email.com'})
        .expect(400);

      expect(responseSecondTime.body.message).toBe('User with specific email already created');
    })

    it('/ (POST) should try to create account with wrong email format', () => {
      return request(app.getHttpServer())
        .post('/user')
        .send({email: 'asdqweasd'})
        .expect(400);
    })
  });


});
