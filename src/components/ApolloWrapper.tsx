"use client";

import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "../../data/apollo-client";
import { ReactNode } from "react";

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
