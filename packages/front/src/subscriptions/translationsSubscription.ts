import { graphql } from 'react-relay';

export const subscription = graphql`
  subscription translationsSubscription {
    translationReceived {
      id
      languageSource
      languageTarget
      text
      translatedText
    }
  }
`;
