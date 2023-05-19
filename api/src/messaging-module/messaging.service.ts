export abstract class MessagingService {
  abstract emit(subject: string, payload: any): Promise<any>;
}
