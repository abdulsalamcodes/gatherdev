import { action, makeObservable, observable } from "mobx";
import { IPost } from "../types/post";
import axios from "axios";
import { apiConfig, errorHandler } from "@/utils";

class PostStoreClass {
  public posts: IPost[];
  public loading: boolean;
  public posting: boolean;

  constructor() {
    this.posts = [];
    this.loading = false;
    this.posting = false;

    makeObservable(this, {
      loadPosts: action,
      addPost: action,
      posts: observable,
      loading: observable,
      posting: observable,
    });
  }

  async loadPosts() {
    try {
      this.loading = true;
      const resp = await axios.request(apiConfig("get", "post"));
      console.log("Posts", resp.data.data);
      this.posts = resp.data.data;
      return resp.data;
    } catch (error) {
      return errorHandler(error);
    } finally {
      this.loading = false;
    }
  }

  async createPost(post: IPost) {
    try {
      this.posting = true;
      const resp = await axios.request(apiConfig("post", "post", post));
      this.addPost(resp.data.post);
      return resp.data;
    } catch (error) {
      return errorHandler(error);
    } finally {
      this.posting = false;
    }
  }

  addPost(post: IPost) {
    this.posts.unshift(post);
  }
}

export default PostStoreClass;
export const PostStore = new PostStoreClass();
