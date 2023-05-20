interface ITranslation {
  id: string;
  languageSource?: string;
  languageTarget: string;
  text: string;
  translatedText?: string;
}

export { ITranslation };

const Queues = {
  AI: 'ai',
};

export { Queues };
