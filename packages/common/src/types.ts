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

export { ITranslation, ISentence };

const Queues = {
  AI: 'ai',
};

export { Queues };
