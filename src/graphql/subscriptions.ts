/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($filter: ModelSubscriptionCommentFilterInput) {
    onCreateComment(filter: $filter) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($filter: ModelSubscriptionCommentFilterInput) {
    onUpdateComment(filter: $filter) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($filter: ModelSubscriptionCommentFilterInput) {
    onDeleteComment(filter: $filter) {
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
