import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';

class mockModel {
  constructor(public data?: any) {}
  async save() {
    return this.data;
  }
  static findById(){
    return {exec: () => ({lastSeen: 'fakeLastSeenFromMock'})}
  }
  static updateOne(userId, lastSeen){
    return {exec: () => (lastSeen)}
  }
}

describe('UserService', () => {
  let service: UserService;
  const fakeUserId = 'fakeUserUuid';

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
      expect(service.get).toBeDefined();
      expect(service.updateLastSeen).toBeDefined();
    });
  });

  describe('Check if methods work properly', () => {
    describe('get()', () => {
      it('should return user', async () => {
        const response = await service.get(fakeUserId);
        expect(response.lastSeen).toBe('fakeLastSeenFromMock');
      });
    });

    describe('updateLastSeen()', () => {
      it('should update user lastSeen and return user', async () => {
        const date = (new Date).toISOString();
        const user = await service.updateLastSeen(fakeUserId, date);
        expect(user.lastSeen).toBe(date);
      });
    });
  });
});
