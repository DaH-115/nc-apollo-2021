import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// const cache = new InMemoryCache();
const link = new createHttpLink({
  uri: 'http://localhost:4000/',
});

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Movies: {
        fields: {
          isLiked: {
            merge(existing, incoming, { variables }) {
              if (variables.isCachedYet && existing) return true;
              return incoming;
            },
          },
        },
      },
    },
  }),
  link,
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Suggestions: {
      isLiked: () => false,
    },
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        cache.modify({
          id: `Movie:${id}`,
          fields: {
            isLiked: () => !isLiked,
          },
        });
      },
    },
  },
});

export default client;
