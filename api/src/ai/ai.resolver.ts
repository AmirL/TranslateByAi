import { Query, Resolver } from '@nestjs/graphql';
import { AiService } from './ai.service';
import { Translation } from './entities/translation.entity';

@Resolver()
export class AiResolver {
  constructor(private readonly aiService: AiService) {}

  @Query(() => Translation, {name: 'translate'})
  translate() {
    return this.aiService.translate();
  }
}
