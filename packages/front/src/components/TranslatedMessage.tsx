import { ITranslation } from '@translate-by-ai/common';
import { useState, useEffect } from 'react';

export const TranslatedMessage = ({ message }: { message: ITranslation }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (message.translatedText === '') {
      return;
    }

    setIsAnimating(true);

    // Clear the animation after 1 second
    const timeoutId = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);

    // Clean up the timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, [message.translatedText]);

  return (
    <>
      <div className="m-1 rounded-md border-2 border-gray-300 p-3 text-left">
        <div> Source: {message.text}</div>
        <div>
          Translated:{' '}
          <TypingAnimationMessage text={message.translatedText || ''} />
        </div>
      </div>
    </>
  );
};

const TypingAnimationMessage = ({ text }: { text: string }) => {
  const [visibleWords, setVisibleWords] = useState(0);

  const wordsCount = text.split(' ').length;

  useEffect(() => {
    if (text === '') {
      return;
    }

    setVisibleWords(0);
    const intervalId = setInterval(() => {
      setVisibleWords((prev) => {
        if (prev + 1 >= wordsCount) {
          clearInterval(intervalId);
        }
        return prev + 1;
      });
    }, 150);
  }, [text]);

  const visibleText = text.split(' ').slice(0, visibleWords).join(' ');

  const showCursor = visibleWords < wordsCount;

  return (
    <div>
      {visibleText}
      {showCursor && <span className="typing-animation_cursor">&nbsp;</span>}
    </div>
  );
};
