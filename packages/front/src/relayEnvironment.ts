import { createClient } from 'graphql-ws';
import {
  Environment,
  Network,
  RecordSource,
  Store,
  Observable,
  GraphQLResponse,
} from 'relay-runtime';

// Define your GraphQL endpoint
const graphqlEndpoint = 'http://localhost:3000/graphql';

// Implement the network layer
const fetchQuery = async (operation: any, variables: any) => {
  const response = await fetch(graphqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
};

const wsClient = createClient({
  url: 'ws://localhost:3000/graphql',
});

const subscribe = (
  operation: any,
  variables: any,
): Observable<GraphQLResponse> => {
  return Observable.create((sink) => {
    console.log('subscribe', operation.name, operation.text, variables);
    return wsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      // @ts-ignore
      sink,
    );
  });
};

// Create and export the Relay Environment
const environment = new Environment({
  network: Network.create(fetchQuery, subscribe),
  store: new Store(new RecordSource()),
});

export default environment;
