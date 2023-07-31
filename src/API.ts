/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  username: string,
  fullname: string,
  email: string,
  title: string,
  friendsCount?: number | null,
  followersCount?: number | null,
  profilePicture?: string | null,
};

export type ModelUserConditionInput = {
  username?: ModelStringInput | null,
  fullname?: ModelStringInput | null,
  email?: ModelStringInput | null,
  title?: ModelStringInput | null,
  friendsCount?: ModelIntInput | null,
  followersCount?: ModelIntInput | null,
  profilePicture?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  username: string,
  fullname: string,
  email: string,
  title: string,
  friendsCount?: number | null,
  followersCount?: number | null,
  profilePicture?: string | null,
  posts?: ModelPostConnection | null,
  comments?: ModelCommentConnection | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items:  Array<Post | null >,
  nextToken?: string | null,
};

export type Post = {
  __typename: "Post",
  id: string,
  content: string,
  code: string,
  language: string,
  topicTag: string,
  author: User,
  comments?: ModelCommentConnection | null,
  likes?: number | null,
  createdAt: string,
  updatedAt: string,
  userPostsId?: string | null,
};

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection",
  items:  Array<Comment | null >,
  nextToken?: string | null,
};

export type Comment = {
  __typename: "Comment",
  id: string,
  post: Post,
  author: User,
  content: string,
  createdAt: string,
  updatedAt: string,
  userCommentsId?: string | null,
  postCommentsId?: string | null,
};

export type UpdateUserInput = {
  id: string,
  username?: string | null,
  fullname?: string | null,
  email?: string | null,
  title?: string | null,
  friendsCount?: number | null,
  followersCount?: number | null,
  profilePicture?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreatePostInput = {
  id?: string | null,
  content: string,
  code: string,
  language: string,
  topicTag: string,
  likes?: number | null,
  userPostsId?: string | null,
};

export type ModelPostConditionInput = {
  content?: ModelStringInput | null,
  code?: ModelStringInput | null,
  language?: ModelStringInput | null,
  topicTag?: ModelStringInput | null,
  likes?: ModelIntInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
  userPostsId?: ModelIDInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdatePostInput = {
  id: string,
  content?: string | null,
  code?: string | null,
  language?: string | null,
  topicTag?: string | null,
  likes?: number | null,
  userPostsId?: string | null,
};

export type DeletePostInput = {
  id: string,
};

export type CreateCommentInput = {
  id?: string | null,
  content: string,
  userCommentsId?: string | null,
  postCommentsId?: string | null,
};

export type ModelCommentConditionInput = {
  content?: ModelStringInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
  userCommentsId?: ModelIDInput | null,
  postCommentsId?: ModelIDInput | null,
};

export type UpdateCommentInput = {
  id: string,
  content?: string | null,
  userCommentsId?: string | null,
  postCommentsId?: string | null,
};

export type DeleteCommentInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  username?: ModelStringInput | null,
  fullname?: ModelStringInput | null,
  email?: ModelStringInput | null,
  title?: ModelStringInput | null,
  friendsCount?: ModelIntInput | null,
  followersCount?: ModelIntInput | null,
  profilePicture?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelPostFilterInput = {
  id?: ModelIDInput | null,
  content?: ModelStringInput | null,
  code?: ModelStringInput | null,
  language?: ModelStringInput | null,
  topicTag?: ModelStringInput | null,
  likes?: ModelIntInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
  userPostsId?: ModelIDInput | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
  userCommentsId?: ModelIDInput | null,
  postCommentsId?: ModelIDInput | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
  fullname?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  title?: ModelSubscriptionStringInput | null,
  friendsCount?: ModelSubscriptionIntInput | null,
  followersCount?: ModelSubscriptionIntInput | null,
  profilePicture?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionPostFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  content?: ModelSubscriptionStringInput | null,
  code?: ModelSubscriptionStringInput | null,
  language?: ModelSubscriptionStringInput | null,
  topicTag?: ModelSubscriptionStringInput | null,
  likes?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionPostFilterInput | null > | null,
  or?: Array< ModelSubscriptionPostFilterInput | null > | null,
};

export type ModelSubscriptionCommentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  content?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCommentFilterInput | null > | null,
  or?: Array< ModelSubscriptionCommentFilterInput | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    username: string,
    fullname: string,
    email: string,
    title: string,
    friendsCount?: number | null,
    followersCount?: number | null,
    profilePicture?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        content: string,
        code: string,
        language: string,
        topicTag: string,
        likes?: number | null,
        createdAt: string,
        updatedAt: string,
        userPostsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        userCommentsId?: string | null,
        postCommentsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    fullname: string,
    email: string,
    title: string,
    friendsCount?: number | null,
    followersCount?: number | null,
    profilePicture?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        content: string,
        code: string,
        language: string,
        topicTag: string,
        likes?: number | null,
        createdAt: string,
        updatedAt: string,
        userPostsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        userCommentsId?: string | null,
        postCommentsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    fullname: string,
    email: string,
    title: string,
    friendsCount?: number | null,
    followersCount?: number | null,
    profilePicture?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        content: string,
        code: string,
        language: string,
        topicTag: string,
        likes?: number | null,
        createdAt: string,
        updatedAt: string,
        userPostsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        userCommentsId?: string | null,
        postCommentsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    id: string,
    content: string,
    code: string,
    language: string,
    topicTag: string,
    author:  {
      __typename: "User",
      id: string,
      username: string,
      fullname: string,
      email: string,
      title: string,
      friendsCount?: number | null,
      followersCount?: number | null,
      profilePicture?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        userCommentsId?: string | null,
        postCommentsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    likes?: number | null,
    createdAt: string,
    updatedAt: string,
    userPostsId?: string | null,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    id: string,
    content: string,
    code: string,
    language: string,
    topicTag: string,
    author:  {
      __typename: "User",
      id: string,
      username: string,
      fullname: string,
      email: string,
      title: string,
      friendsCount?: number | null,
      followersCount?: number | null,
      profilePicture?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        userCommentsId?: string | null,
        postCommentsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    likes?: number | null,
    createdAt: string,
    updatedAt: string,
    userPostsId?: string | null,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    id: string,
    content: string,
    code: string,
    language: string,
    topicTag: string,
    author:  {
      __typename: "User",
      id: string,
      username: string,
      fullname: string,
      email: string,
      title: string,
      friendsCount?: number | null,
      followersCount?: number | null,
      profilePicture?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        userCommentsId?: string | null,
        postCommentsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    likes?: number | null,
    createdAt: string,
    updatedAt: string,
    userPostsId?: string | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment?:  {
    __typename: "Comment",
    id: string,
    post:  {
      __typename: "Post",
      id: string,
      content: string,
      code: string,
      language: string,
      topicTag: string,
      author:  {
        __typename: "User",
        id: string,
        username: string,
        fullname: string,
        email: string,
        title: string,
        friendsCount?: number | null,
        followersCount?: number | null,
        profilePicture?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
    },
    author:  {
      __typename: "User",
      id: string,
      username: string,
      fullname: string,
      email: string,
      title: string,
      friendsCount?: number | null,
      followersCount?: number | null,
      profilePicture?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    content: string,
    createdAt: string,
    updatedAt: string,
    userCommentsId?: string | null,
    postCommentsId?: string | null,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment?:  {
    __typename: "Comment",
    id: string,
    post:  {
      __typename: "Post",
      id: string,
      content: string,
      code: string,
      language: string,
      topicTag: string,
      author:  {
        __typename: "User",
        id: string,
        username: string,
        fullname: string,
        email: string,
        title: string,
        friendsCount?: number | null,
        followersCount?: number | null,
        profilePicture?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
    },
    author:  {
      __typename: "User",
      id: string,
      username: string,
      fullname: string,
      email: string,
      title: string,
      friendsCount?: number | null,
      followersCount?: number | null,
      profilePicture?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    content: string,
    createdAt: string,
    updatedAt: string,
    userCommentsId?: string | null,
    postCommentsId?: string | null,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment?:  {
    __typename: "Comment",
    id: string,
    post:  {
      __typename: "Post",
      id: string,
      content: string,
      code: string,
      language: string,
      topicTag: string,
      author:  {
        __typename: "User",
        id: string,
        username: string,
        fullname: string,
        email: string,
        title: string,
        friendsCount?: number | null,
        followersCount?: number | null,
        profilePicture?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
    },
    author:  {
      __typename: "User",
      id: string,
      username: string,
      fullname: string,
      email: string,
      title: string,
      friendsCount?: number | null,
      followersCount?: number | null,
      profilePicture?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    content: string,
    createdAt: string,
    updatedAt: string,
    userCommentsId?: string | null,
    postCommentsId?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    username: string,
    fullname: string,
    email: string,
    title: string,
    friendsCount?: number | null,
    followersCount?: number | null,
    profilePicture?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        content: string,
        code: string,
        language: string,
        topicTag: string,
        likes?: number | null,
        createdAt: string,
        updatedAt: string,
        userPostsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        userCommentsId?: string | null,
        postCommentsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      username: string,
      fullname: string,
      email: string,
      title: string,
      friendsCount?: number | null,
      followersCount?: number | null,
      profilePicture?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    id: string,
    content: string,
    code: string,
    language: string,
    topicTag: string,
    author:  {
      __typename: "User",
      id: string,
      username: string,
      fullname: string,
      email: string,
      title: string,
      friendsCount?: number | null,
      followersCount?: number | null,
      profilePicture?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        userCommentsId?: string | null,
        postCommentsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    likes?: number | null,
    createdAt: string,
    updatedAt: string,
    userPostsId?: string | null,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      id: string,
      content: string,
      code: string,
      language: string,
      topicTag: string,
      author:  {
        __typename: "User",
        id: string,
        username: string,
        fullname: string,
        email: string,
        title: string,
        friendsCount?: number | null,
        followersCount?: number | null,
        profilePicture?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment?:  {
    __typename: "Comment",
    id: string,
    post:  {
      __typename: "Post",
      id: string,
      content: string,
      code: string,
      language: string,
      topicTag: string,
      author:  {
        __typename: "User",
        id: string,
        username: string,
        fullname: string,
        email: string,
        title: string,
        friendsCount?: number | null,
        followersCount?: number | null,
        profilePicture?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
    },
    author:  {
      __typename: "User",
      id: string,
      username: string,
      fullname: string,
      email: string,
      title: string,
      friendsCount?: number | null,
      followersCount?: number | null,
      profilePicture?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    content: string,
    createdAt: string,
    updatedAt: string,
    userCommentsId?: string | null,
    postCommentsId?: string | null,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      post:  {
        __typename: "Post",
        id: string,
        content: string,
        code: string,
        language: string,
        topicTag: string,
        likes?: number | null,
        createdAt: string,
        updatedAt: string,
        userPostsId?: string | null,
      },
      author:  {
        __typename: "User",
        id: string,
        username: string,
        fullname: string,
        email: string,
        title: string,
        friendsCount?: number | null,
        followersCount?: number | null,
        profilePicture?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      content: string,
      createdAt: string,
      updatedAt: string,
      userCommentsId?: string | null,
      postCommentsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    fullname: string,
    email: string,
    title: string,
    friendsCount?: number | null,
    followersCount?: number | null,
    profilePicture?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        content: string,
        code: string,
        language: string,
        topicTag: string,
        likes?: number | null,
        createdAt: string,
        updatedAt: string,
        userPostsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        userCommentsId?: string | null,
        postCommentsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    username: string,
    fullname: string,
    email: string,
    title: string,
    friendsCount?: number | null,
    followersCount?: number | null,
    profilePicture?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        content: string,
        code: string,
        language: string,
        topicTag: string,
        likes?: number | null,
        createdAt: string,
        updatedAt: string,
        userPostsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        userCommentsId?: string | null,
        postCommentsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    username: string,
    fullname: string,
    email: string,
    title: string,
    friendsCount?: number | null,
    followersCount?: number | null,
    profilePicture?: string | null,
    posts?:  {
      __typename: "ModelPostConnection",
      items:  Array< {
        __typename: "Post",
        id: string,
        content: string,
        code: string,
        language: string,
        topicTag: string,
        likes?: number | null,
        createdAt: string,
        updatedAt: string,
        userPostsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        userCommentsId?: string | null,
        postCommentsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    id: string,
    content: string,
    code: string,
    language: string,
    topicTag: string,
    author:  {
      __typename: "User",
      id: string,
      username: string,
      fullname: string,
      email: string,
      title: string,
      friendsCount?: number | null,
      followersCount?: number | null,
      profilePicture?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        userCommentsId?: string | null,
        postCommentsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    likes?: number | null,
    createdAt: string,
    updatedAt: string,
    userPostsId?: string | null,
  } | null,
};

export type OnUpdatePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost?:  {
    __typename: "Post",
    id: string,
    content: string,
    code: string,
    language: string,
    topicTag: string,
    author:  {
      __typename: "User",
      id: string,
      username: string,
      fullname: string,
      email: string,
      title: string,
      friendsCount?: number | null,
      followersCount?: number | null,
      profilePicture?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        userCommentsId?: string | null,
        postCommentsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    likes?: number | null,
    createdAt: string,
    updatedAt: string,
    userPostsId?: string | null,
  } | null,
};

export type OnDeletePostSubscriptionVariables = {
  filter?: ModelSubscriptionPostFilterInput | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    id: string,
    content: string,
    code: string,
    language: string,
    topicTag: string,
    author:  {
      __typename: "User",
      id: string,
      username: string,
      fullname: string,
      email: string,
      title: string,
      friendsCount?: number | null,
      followersCount?: number | null,
      profilePicture?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    comments?:  {
      __typename: "ModelCommentConnection",
      items:  Array< {
        __typename: "Comment",
        id: string,
        content: string,
        createdAt: string,
        updatedAt: string,
        userCommentsId?: string | null,
        postCommentsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    likes?: number | null,
    createdAt: string,
    updatedAt: string,
    userPostsId?: string | null,
  } | null,
};

export type OnCreateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment?:  {
    __typename: "Comment",
    id: string,
    post:  {
      __typename: "Post",
      id: string,
      content: string,
      code: string,
      language: string,
      topicTag: string,
      author:  {
        __typename: "User",
        id: string,
        username: string,
        fullname: string,
        email: string,
        title: string,
        friendsCount?: number | null,
        followersCount?: number | null,
        profilePicture?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
    },
    author:  {
      __typename: "User",
      id: string,
      username: string,
      fullname: string,
      email: string,
      title: string,
      friendsCount?: number | null,
      followersCount?: number | null,
      profilePicture?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    content: string,
    createdAt: string,
    updatedAt: string,
    userCommentsId?: string | null,
    postCommentsId?: string | null,
  } | null,
};

export type OnUpdateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment?:  {
    __typename: "Comment",
    id: string,
    post:  {
      __typename: "Post",
      id: string,
      content: string,
      code: string,
      language: string,
      topicTag: string,
      author:  {
        __typename: "User",
        id: string,
        username: string,
        fullname: string,
        email: string,
        title: string,
        friendsCount?: number | null,
        followersCount?: number | null,
        profilePicture?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
    },
    author:  {
      __typename: "User",
      id: string,
      username: string,
      fullname: string,
      email: string,
      title: string,
      friendsCount?: number | null,
      followersCount?: number | null,
      profilePicture?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    content: string,
    createdAt: string,
    updatedAt: string,
    userCommentsId?: string | null,
    postCommentsId?: string | null,
  } | null,
};

export type OnDeleteCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment?:  {
    __typename: "Comment",
    id: string,
    post:  {
      __typename: "Post",
      id: string,
      content: string,
      code: string,
      language: string,
      topicTag: string,
      author:  {
        __typename: "User",
        id: string,
        username: string,
        fullname: string,
        email: string,
        title: string,
        friendsCount?: number | null,
        followersCount?: number | null,
        profilePicture?: string | null,
        createdAt: string,
        updatedAt: string,
      },
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      likes?: number | null,
      createdAt: string,
      updatedAt: string,
      userPostsId?: string | null,
    },
    author:  {
      __typename: "User",
      id: string,
      username: string,
      fullname: string,
      email: string,
      title: string,
      friendsCount?: number | null,
      followersCount?: number | null,
      profilePicture?: string | null,
      posts?:  {
        __typename: "ModelPostConnection",
        nextToken?: string | null,
      } | null,
      comments?:  {
        __typename: "ModelCommentConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    content: string,
    createdAt: string,
    updatedAt: string,
    userCommentsId?: string | null,
    postCommentsId?: string | null,
  } | null,
};
