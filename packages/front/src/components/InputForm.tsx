import { ITranslation } from '@translate-by-ai/common';
import React, { useRef, useState } from 'react';
import { graphql, useMutation } from 'react-relay';
import {
  InputFormMutation,
  InputFormMutation$data,
} from './__generated__/InputFormMutation.graphql';

/*
  Round corner card with a textarea and a button to send the message
*/
export const InputForm = () => {
  const [message, setMessage] = useState('');

  const [commit, isInFlight] = useMutation<InputFormMutation>(graphql`
    mutation InputFormMutation($input: RequestTranslation!) {
      requestTranslation(input: $input) {
        id
        languageSource
        languageTarget
        text
      }
    }
  `);

  function sendMessage() {
    commit({
      variables: {
        input: {
          text: message,
          languageTarget: 'english',
        },
      },
      onCompleted: (data, errors) => {
        if (!errors) {
          setMessage('');
        } else {
          console.log('mutation errors', errors);
        }
      },
    });
  }

  return (
    <>
      <div className="m-3 flex w-2/6 flex-col">
        <label className="m-2 text-2xl">Message</label>
        <textarea
          rows={20}
          className=" rounded-lg  border-2 border-gray-300 p-3"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        ></textarea>
        <button
          className="m-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
          onClick={sendMessage}
          disabled={message.length <= 5}
        >
          {isInFlight ? 'Sending...' : 'Request translation'}
        </button>
      </div>
    </>
  );
};
