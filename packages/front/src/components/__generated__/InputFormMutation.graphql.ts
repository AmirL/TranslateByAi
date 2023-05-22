/**
 * @generated SignedSource<<72d23a4358e5e4513a4d490741de0ede>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RequestTranslation = {
  languageTarget: string;
  text: string;
};
export type InputFormMutation$variables = {
  input: RequestTranslation;
};
export type InputFormMutation$data = {
  readonly requestTranslation: {
    readonly id: string;
    readonly languageSource: string | null;
    readonly languageTarget: string;
    readonly text: string;
    readonly translatedText: string | null;
  };
};
export type InputFormMutation = {
  response: InputFormMutation$data;
  variables: InputFormMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "Translation",
    "kind": "LinkedField",
    "name": "requestTranslation",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InputFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InputFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3ae1ff1d945858e1659e69563ffb6142",
    "id": null,
    "metadata": {},
    "name": "InputFormMutation",
    "operationKind": "mutation",
    "text": "mutation InputFormMutation(\n  $input: RequestTranslation!\n) {\n  requestTranslation(input: $input) {\n    id\n    languageSource\n    languageTarget\n    text\n    translatedText\n  }\n}\n"
  }
};
})();

(node as any).hash = "b0066558fa1497478746aa21dcbbae17";

export default node;
