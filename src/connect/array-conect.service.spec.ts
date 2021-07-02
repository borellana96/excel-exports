import { Test, TestingModule } from '@nestjs/testing';
import { ArrayConectService } from './array-conect.service';

describe('ArrayConectService', () => {
  let service: ArrayConectService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArrayConectService],
    }).compile();
    service = module.get<ArrayConectService>(ArrayConectService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
