import { IComment } from "./comment";

export type IPost = {
  __typename: "Post",
  id: string,
  content: string,
  author: string,
  comments?: IComment[] | null,
  createdAt: string,
  updatedAt: string,
};