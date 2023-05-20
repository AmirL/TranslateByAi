interface User {
  firstName: string;
  lastName: string;
}

export { User };

interface ITranslation {
  id: string;
  languageSource?: string;
  languageTarget: string;
  text: string;
  translatedText?: string;
}

export { ITranslation };
