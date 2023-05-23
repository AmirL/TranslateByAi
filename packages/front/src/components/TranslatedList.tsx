/*
 Subscribe to GraphQl event and list all incoming messages,
 also update the message by id if translation arrived.
 */

import { ITranslation } from '@translate-by-ai/common';
import { useMemo, useReducer } from 'react';
import { subscription } from '../subscriptions/translationsSubscription';
import { useSubscription } from 'react-relay';
import { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { translationsSubscription } from '../subscriptions/__generated__/translationsSubscription.graphql';
import { TranslatedMessage } from './TranslatedMessage';

function reducer(
  state: ITranslation[],
  action: { type: string; payload: ITranslation },
) {
  switch (action.type) {
    case 'upsert': {
      const exists = state.find((item) => item.id === action.payload.id);
      if (exists) {
        return state.map((item: ITranslation) =>
          item.id === action.payload.id ? action.payload : item,
        );
      }

      return [action.payload, ...state];
    }
    default:
      throw new Error();
  }
}

export const TranslatedList = () => {
  const [state, dispatch] = useReducer(reducer, []);

  const config: GraphQLSubscriptionConfig<translationsSubscription> = useMemo(
    () => ({
      variables: {},
      subscription,
      onNext: (response) => {
        if (response?.translationReceived) {
          dispatch({ type: 'upsert', payload: response.translationReceived });
        }
      },
    }),
    [],
  );

  useSubscription(config);

  return (
    <>
      <div className="ml-3 flex flex-col">
        <label className="m-2 text-2xl">Translated</label>
        <div className="h-48 w-96">
          {state.map((item) => (
            <TranslatedMessage key={item.id} message={item} />
          ))}
        </div>
      </div>
    </>
  );
};
