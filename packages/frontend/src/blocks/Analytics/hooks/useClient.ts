import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
  cache: new InMemoryCache({
    typePolicies: {
      Token: {
        keyFields: false,
      },
      Pool: {
        keyFields: false,
      },
    },
  }),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

export const sushiClient = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/zippoxer/sushiswap-subgraph-fork',
  cache: new InMemoryCache({
    typePolicies: {
      Token: {
        keyFields: false,
      },
      Pool: {
        keyFields: false,
      },
    },
  }),
  queryDeduplication: true,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
})

export function useDataClient(
  protocol: string
): ApolloClient<NormalizedCacheObject> {
  switch (protocol) {
    case 'Uniswap':
      return client
    case 'Sushiswap':
      return sushiClient
    default:
      return client
  }
}
