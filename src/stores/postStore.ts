import { action, computed, makeObservable, observable } from "mobx";
import Post from "@/models/postModel";
import { IPost } from "@/types/post";
import AppStore from "./app";

class PostStore {
  posts: IPost[];

  constructor(private store: AppStore) {
    this.posts = [];
    makeObservable(this, {
      posts: observable,
      loadPosts: action,
      addPost: action,
      allPosts: computed,
    });
  }

  loadPosts(posts: IPost[]) {
    this.posts = posts;
  }

  addPost(post: IPost) {
    this.posts.unshift(post);
  }

  get allPosts() {
    return Array.from(this.posts);
  }
}

export default PostStore;
