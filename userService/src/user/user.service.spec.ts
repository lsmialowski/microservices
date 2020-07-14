import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';
import { ERRORS } from '../common/errors';

class mockModel {
  constructor(public data?: any) {}
  async save() {
    return this.data;
  }
}

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: getModelToken(User.name),
        useValue: mockModel,
      }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('Check if methods are defined', () => {
    it('should be defined and named correctly', () => {
      expect(service).toBeDefined();
      expect(service.create).toBeDefined();
    });
  });

  describe('Check if methods work properly', () => {
    it('should save and return user', async () => {
      const userMock = {email: 'asdqwe@asd.pl'};
      const user = await service.create(userMock);
      expect(user.email).toBe('asdqwe@asd.pl');
    });


    it('should call userRepository save() method and throw user already exist error', async () => {
      const error = {...(new Error()), code: 11000 };
      jest.spyOn(mockModel.prototype, 'save').mockRejectedValueOnce(error);

      const userMock = {email: 'asdqwe@asd.pl'};
      try {
        await service.create(userMock)
      } catch (error) {
        expect(error.message).toBe(ERRORS.USER_ALREADY_EXIST);
      }
    });
    it('should call userRepository save() method and throw error', async () => {
      const error = new Error('fake error');
      jest.spyOn(mockModel.prototype, 'save').mockRejectedValueOnce(error);

      const userMock = { email: 'asdqwe@asd.pl' };
      try {
        await service.create(userMock)
      } catch (error) {
        expect(error.message).toBe('fake error');
      }
    });
  });
});
