import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { EVENT, ITranslation } from '@translate-by-ai/common';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

@Injectable()
export class AppService {
  private client: ClientProxy;
  private configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  private openai = new OpenAIApi(this.configuration);

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        url: 'nats://localhost:4222',
        debug: false,
      },
    });
  }

  async translate(data: ITranslation) {
    const sentences = data.text
      .replace(/(.+?[!?.\n])/g, '$1\n')
      .split('\n')
      .filter((sentence) => sentence.trim() !== '');
    const sentencesStr = sentences.join('],\n[');
    Logger.log('sentences', sentences);
    const content = `
    Translate sentences to ${data.languageTarget} language.
    return in json format
    {
      sentences: [
        {
        original,
        translated
        }
      ],
      languageSource,
    }
    sentences:
    [${sentencesStr}]`;

    const requestMessage: ChatCompletionRequestMessage = {
      role: 'user',
      content,
    };

    try {
      const response = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [requestMessage],
      });

      Logger.log(
        'OpenAI Api response',
        response.data.choices[0].message.content,
        'TranslateService',
      );

      const messageContent = response.data.choices[0].message.content;
      const result = this.parseTranslationResponse(messageContent);
      Logger.log(
        'Sending message to api.translated',
        result,
        'TranslateService',
      );
      const translatedData = {
        ...data,
        ...result,
      };

      await this.client.emit(EVENT.TEXT_TRANSLATED, translatedData);
    } catch (error) {
      Logger.log('OpenAI Api error', error);
    }
  }

  private parseTranslationResponse(response: string): ITranslation {
    const json = JSON.parse(response);
    if (json && json.sentences && json.languageSource) {
      return json;
    }
    throw new Error('Invalid response from AI');
  }

  getHello(): string {
    return 'Hello World!';
  }
}
