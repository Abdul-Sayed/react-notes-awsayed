# Supabase

Sign into supabase, and create a new project.
Create the tables and columns you need

# StepZen

Build GraphQL backend APIs (GraphQL as a service). Easy to setup and connect to Rest APIs, SQL/NoSQL databases. The advantage of GraphQL is that you can request only the fields you want, instead of overfetching extra fields you won't be using.

Make a folder in the root directory called Stepzen. `stepzen init`, and then `stepzen import postgresql`

Enter the values being asked from Supabase, settings, Database.  
Then enter `stepzen start` or `stepzen start --dashboard=local`

In the local explorer, make a query;

    query MyQuery {
      getPostList {
        username
        title
      }
    }

The click export to generate a react hook to fetch the indicated fields

# Apollo Client

Consume a GraphQL enpoint in our client. Used to fetch the data from StepZen (which is getting it from Supabase).

In the root of your project, create a file apollo-client.js;

    import { ApolloClient, InMemoryCache } from "@apollo/client";

    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_StepZen_Uri,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_StepZen_API_Key}`,
      },
      cache: new InMemoryCache(),
    });

    export default client;

Provide the client for your application;

import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";

    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        ...
      </SessionProvider>
    </ApolloProvider>
