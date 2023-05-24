/**
 * @generated SignedSource<<4fe734d0c1479cb39270fca18a72d830>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, GraphQLSubscription } from 'relay-runtime';
export type translationsSubscription$variables = {};
export type translationsSubscription$data = {
  readonly translationReceived: {
    readonly id: string;
    readonly languageSource: string | null;
    readonly languageTarget: string;
    readonly sentences: ReadonlyArray<{
      readonly original: string;
      readonly translated: string;
    }> | null;
    readonly text: string;
  };
};
export type translationsSubscription = {
  response: translationsSubscription$data;
  variables: translationsSubscription$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Translation",
    "kind": "LinkedField",
    "name": "translationReceived",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "languageSource",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "languageTarget",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "text",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Sentence",
        "kind": "LinkedField",
        "name": "sentences",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "original",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "translated",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "translationsSubscription",
    "selections": (v0/*: any*/),
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "translationsSubscription",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "927e5246f8e43cddb9b94895b4a25b72",
    "id": null,
    "metadata": {},
    "name": "translationsSubscription",
    "operationKind": "subscription",
    "text": "subscription translationsSubscription {\n  translationReceived {\n    id\n    languageSource\n    languageTarget\n    text\n    sentences {\n      original\n      translated\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2e69ec1006a76a0f61902c24864ac261";

export default node;
