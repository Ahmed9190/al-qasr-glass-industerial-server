import { Test, TestingModule } from '@nestjs/testing';
import { DesktopUtilsController } from './desktop-utils.controller';
import { DesktopUtilsService } from './desktop-utils.service';

describe('DesktopUtilsController', () => {
  let controller: DesktopUtilsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DesktopUtilsController],
      providers: [DesktopUtilsService],
    }).compile();

    controller = module.get<DesktopUtilsController>(DesktopUtilsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
