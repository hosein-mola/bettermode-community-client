// client.js
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';

// Create an HTTP link:
const httpLink = new HttpLink({
    uri: 'https://api.bettermode.com/', // Replace with your GraphQL endpoint
});

// Create a middleware link that adds headers
const authLink = new ApolloLink((operation, forward) => {
    // Retrieve the authentication token from local storage if it exists
    const token = localStorage.getItem('authToken');

    // Use the token as a header in the request
    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        },
    });

    return forward(operation);
});

// Create Apollo Client with links
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
