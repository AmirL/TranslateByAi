import { Environment, Network, RecordSource, Store } from 'relay-runtime';

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

// Create and export the Relay Environment
const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
