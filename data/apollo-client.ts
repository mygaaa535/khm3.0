import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_ERXES_API_URL}/gateway/graphql`,
});

const authLink = new SetContextLink((prevContext) => ({
  headers: {
    ...prevContext.headers,
    "x-app-token": process.env.NEXT_PUBLIC_ERXES_APP_TOKEN,
  },
}));

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
