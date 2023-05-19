export abstract class MessagingService {
  abstract send(subject: string, payload: any): Promise<any>;
}
