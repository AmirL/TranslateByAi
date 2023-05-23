interface ITranslation {
  id: string;
  languageSource?: string | null;
  languageTarget: string;
  text: string;
  translatedText?: string | null;
}

export { ITranslation };

const Queues = {
  AI: 'ai',
};

export { Queues };
