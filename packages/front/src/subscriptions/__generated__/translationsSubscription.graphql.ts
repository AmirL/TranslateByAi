/**
 * @generated SignedSource<<b64742c70867963f228dfc5b80af0da9>>
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
    readonly text: string;
    readonly translatedText: string | null;
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
        "kind": "ScalarField",
        "name": "translatedText",
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
    "cacheID": "3809e5351d5de8da9e8439905f1af1a1",
    "id": null,
    "metadata": {},
    "name": "translationsSubscription",
    "operationKind": "subscription",
    "text": "subscription translationsSubscription {\n  translationReceived {\n    id\n    languageSource\n    languageTarget\n    text\n    translatedText\n  }\n}\n"
  }
};
})();

(node as any).hash = "2872e5503b9328939a9a081d26e3e850";

export default node;
