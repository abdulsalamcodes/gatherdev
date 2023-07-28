import { computed, makeObservable } from "mobx";
import AppStore from "../stores/app";
import { IComment } from "../types/comment";
import { IPost } from "@/types/post";

export default class Comment {
  id: string;
  post?: IPost | null;
  author: string;
  content: string;
  postCommentsId?: string | null;

  constructor(private store: AppStore, comment: IComment) {
    this.id = comment.id;
    this.post = comment.post;
    this.author = comment.author;
    this.content = comment.content;

    makeObservable(this, {
      post: computed,
    });
  }
}
