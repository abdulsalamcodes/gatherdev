import { computed, makeObservable } from "mobx";
import AppStore from "../stores/app";
import { IPost } from "../types/post";
import { IComment } from "@/types/comment";

export default class Post {
  id: string;
  content: string;
  author: string;
  comments?: IComment[] | null;


  constructor(private store: AppStore, post: IPost) {
    this.id = post.id;
    this.content = post.content;
    this.author = post.author;
    this.comments = post.comments;

    makeObservable(this, {
      comments: computed,
    })
  }
}