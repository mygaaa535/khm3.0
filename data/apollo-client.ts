import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: `${process.env.NEXT_PUBLIC_ERXES_API_URL}/gateway/graphql`,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    "x-app-token": process.env.NEXT_PUBLIC_ERXES_APP_TOKEN,
  },
}));

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
