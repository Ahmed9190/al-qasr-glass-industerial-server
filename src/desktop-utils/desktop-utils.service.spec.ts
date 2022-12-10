import { Test, TestingModule } from '@nestjs/testing';
import { DesktopUtilsService } from './desktop-utils.service';

describe('DesktopUtilsService', () => {
  let service: DesktopUtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DesktopUtilsService],
    }).compile();

    service = module.get<DesktopUtilsService>(DesktopUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
