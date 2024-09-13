import {gql} from "@apollo/client";

export const guestTokenRequest = gql`
    query GetTokens($networkDomain: String!) {
        tokens(networkDomain: $networkDomain) {
            accessToken
            role {
                name
                scopes
            }
            member {
                id
                name
            }
        }
    }
`;

export const memberTokenRequest = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
        loginNetwork(input: {usernameOrEmail: $usernameOrEmail, password: $password}) {
            accessToken
            role {
                name
                scopes
            }
            member {
                id
                name
            }
        }
    }
`;

export const getMemebrSpaces = gql`
    query GetSpaces($memberId: ID!) {
        spaces(memberId: $memberId, limit: 10) {
            nodes {
                id
                name
                postsCount
            }
            totalCount
        }
    }
`;

export const getMemebrPosts = gql`
    query GetPosts($spaceIds: [ID!], $limit: Int!, $offset: Int) {
        posts(spaceIds: $spaceIds, limit: $limit, offset: $offset) {
            nodes {
                id
                title
                reactions {
                    count
                    reaction
                    reacted
                }
                thumbnail {
                    ... on Image {
                        id
                        url
                        width
                        height
                    }
                    ... on File {
                        id
                        downloadUrl
                    }
                }
                description
            }
            totalCount
        }
    }
`;

export const addReactionToPost = gql`
    mutation AddReaction($postId: ID!, $input: AddReactionInput!) {
        addReaction(postId: $postId, input: $input) {
            status
        }
    }
`;

export const getMemberPost = gql`
    query GetPosts($id: ID!) {
        post(id: $id) {
            title
            description
            status
            shortContent
            createdAt
            reactionsCount
            reactions {
                count
                reaction
                reacted
            }
            thumbnail {
                ... on Image {
                    id
                    url
                    width
                    height
                }
                ... on File {
                    id
                    downloadUrl
                }
            }
        }
    }
`;
