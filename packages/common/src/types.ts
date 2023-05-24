interface ITranslation {
  id: string;
  languageSource?: string | null;
  languageTarget: string;
  text: string;
  readonly sentences?: readonly ISentence[] | null;
}

interface ISentence {
  readonly original: string;
  readonly translated: string;
}

interface IUser {
  id: string;
  email: string;
  hashedPassword?: string | null;
}

export { ITranslation, ISentence, IUser };

const Queues = {
  AI: 'ai',
  USER: 'user',
};

export { Queues };
