/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      fullname
      email
      title
      friendsCount
      followersCount
      profilePicture
      posts {
        items {
          id
          content
          code
          language
          topicTag
          likes
          createdAt
          updatedAt
          userPostsId
          __typename
        }
        nextToken
        __typename
      }
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          userCommentsId
          postCommentsId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        fullname
        email
        title
        friendsCount
        followersCount
        profilePicture
        posts {
          nextToken
          __typename
        }
        comments {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      content
      code
      language
      topicTag
      author {
        id
        username
        fullname
        email
        title
        friendsCount
        followersCount
        profilePicture
        posts {
          nextToken
          __typename
        }
        comments {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      comments {
        items {
          id
          content
          createdAt
          updatedAt
          userCommentsId
          postCommentsId
          __typename
        }
        nextToken
        __typename
      }
      likes
      createdAt
      updatedAt
      userPostsId
      __typename
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        code
        language
        topicTag
        author {
          id
          username
          fullname
          email
          title
          friendsCount
          followersCount
          profilePicture
          createdAt
          updatedAt
          __typename
        }
        comments {
          nextToken
          __typename
        }
        likes
        createdAt
        updatedAt
        userPostsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      post {
        id
        content
        code
        language
        topicTag
        author {
          id
          username
          fullname
          email
          title
          friendsCount
          followersCount
          profilePicture
          createdAt
          updatedAt
          __typename
        }
        comments {
          nextToken
          __typename
        }
        likes
        createdAt
        updatedAt
        userPostsId
        __typename
      }
      author {
        id
        username
        fullname
        email
        title
        friendsCount
        followersCount
        profilePicture
        posts {
          nextToken
          __typename
        }
        comments {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      content
      createdAt
      updatedAt
      userCommentsId
      postCommentsId
      __typename
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        post {
          id
          content
          code
          language
          topicTag
          likes
          createdAt
          updatedAt
          userPostsId
          __typename
        }
        author {
          id
          username
          fullname
          email
          title
          friendsCount
          followersCount
          profilePicture
          createdAt
          updatedAt
          __typename
        }
        content
        createdAt
        updatedAt
        userCommentsId
        postCommentsId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
