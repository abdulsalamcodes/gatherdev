import { IPost } from "./post";

export type IComment = {
    __typename: "Comment",
    id: string,
    post?: IPost | null,
    author: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    postCommentsId?: string | null,
  };