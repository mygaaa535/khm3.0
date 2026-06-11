CMS Integration Guide
This document explains how to migrate an existing web-builder setup to erxes CMS using Next.js and Apollo Client. The guide is written in MDX-friendly documentation style, suitable for developer portals.

Overview
To connect your project to erxes CMS, you need to update three main areas:

Next.js environment configuration
Apollo Client setup
GraphQL CMS queries
Prerequisites
Before starting, make sure you have:

An active erxes installation
A Client Portal created in erxes
A valid Client Portal Token
A Next.js project with Apollo Client installed

1. Environment Configuration (next-config.js)
   Update your environment variables to point to the erxes CMS domain and use the Client Portal token.

/\*_ @type {import('next').NextConfig} _/
const nextConfig = {
env: {
ERXES_API_URL: "https://[your-domain].next.erxes.io",
ERXES_APP_TOKEN: "YOUR_CLIENT_PORTAL_TOKEN",
},
};

module.exports = nextConfig;
Notes
ERXES_API_URL must be your erxes CMS domain
ERXES_APP_TOKEN must be a Client Portal token, not a system token 2. Apollo Client Configuration
When working with CMS APIs, erxes requires the token to be sent using the x-app-token header.

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
uri: `${process.env.ERXES_API_URL}/gateway/graphql`,
});

const authLink = setContext((\_, { headers }) => ({
headers: {
...headers,
"x-app-token": process.env.ERXES_APP_TOKEN,
},
}));

export const apolloClient = new ApolloClient({
link: authLink.concat(httpLink),
cache: new InMemoryCache(),
});
Key Change
erxes-app-token ➜ x-app-token 3. CMS GraphQL Queries
Post List Query
Use cpPostList to fetch CMS posts.

import { gql } from "@apollo/client";

export const cmsPostList = gql`  query PostList(
    $type: String
    $featured: Boolean
    $categoryIds: [String]
    $searchValue: String
    $status: PostStatus
    $tagIds: [String]
    $sortField: String
    $sortDirection: String
  ) {
    cpPostList(
      featured: $featured
      type: $type
      categoryIds: $categoryIds
      searchValue: $searchValue
      status: $status
      tagIds: $tagIds
      sortField: $sortField
      sortDirection: $sortDirection
    ) {
      totalCount
      posts {
        _id
        title
        content
        excerpt
        featured
        status
        createdAt
        updatedAt
        thumbnail {
          url
        }
        categories {
          _id
          name
        }
        images {
          url
          type
          name
        }
      }
    }
  }`; 4. Fetching Data in Components
Example usage with Apollo useQuery:

import { useQuery } from "@apollo/client";
import { cmsPostList } from "@/graphql/queries";

const { data, loading, error } = useQuery(cmsPostList, {
variables: {
categoryIds: ["c-exNoBpJp4WUd1fgUB9m"],
},
});

const posts = data?.cpPostList?.posts || [];
Important
categoryIds must be an array of strings
Always handle loading and error states 5. Common Issues
CORS Errors
The domain is not whitelisted in Client Portal settings
Incorrect API URL
Unauthorized Errors
Invalid or missing Client Portal token
Wrong header name (x-app-token required) 6. Validation Checklist
Correct erxes CMS domain
Client Portal token configured
x-app-token header used
GraphQL variables have correct types
Next Steps
Implement Single Post Query (cpPostDetail)
Add Pagination using pageInfo
Enable SSG / ISR for CMS pages
Add SEO metadata from CMS fields
This guide is fully compatible with MDX-based documentation systems such as next-mdx-remote, contentlayer, or custom doc portals.
