import { ITranslation } from '@translate-by-ai/common';
import { useState, useEffect } from 'react';

export const TranslatedMessage = ({ message }: { message: ITranslation }) => {
  return (
    <>
      <div className="m-1 rounded-md border-2 border-gray-300 p-3 text-left">
        <div className="m-1">
          <div className=" text-lg font-bold text-yellow-600">Source:</div>
          <MultilineText text={message.text} />
          <div className="text-gray-400">
            Language: {message.languageSource}
          </div>
        </div>
        <div className="mt-5">
          <div className=" text-lg font-bold text-lime-600">Translated:</div>
          {message.sentences ? (
            message.sentences.map((item, index) => (
              <div className="mb-2" key={index}>
                <div>{item.original}</div>
                <div
                  className="text-gray-400
              "
                >
                  {item.translated}
                </div>
              </div>
            ))
          ) : (
            <>Translating...</>
          )}
        </div>
      </div>
    </>
  );
};

const MultilineText = ({ text }: { text: string }) => {
  return (
    <>
      {text.split('\n').map((item, index) => (
        <p className="mb-2" key={index}>
          {item}
        </p>
      ))}
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
    }, 50);
  }, [text, wordsCount]);

  const visibleText = text.split(' ').slice(0, visibleWords).join(' ');

  const showCursor = visibleWords < wordsCount;

  return (
    <div>
      <MultilineText text={visibleText} />

      {showCursor && <span className="typing-animation_cursor">&nbsp;</span>}
    </div>
  );
};
