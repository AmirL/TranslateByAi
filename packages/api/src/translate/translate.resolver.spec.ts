import { Test, TestingModule } from '@nestjs/testing';
import { TranslateResolver } from './translate.resolver';
import { TranslateService } from './translate.service';

describe('AiResolver', () => {
  let resolver: TranslateResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslateResolver, TranslateService],
    }).compile();

    resolver = module.get<TranslateResolver>(TranslateResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
