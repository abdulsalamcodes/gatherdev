import { action, computed, makeObservable, observable } from "mobx";
import { IPost } from "@/types/post";
import AppStore from "./app";
import * as queries from "../graphql/queries";
import { API, Auth } from "aws-amplify";
import { ListPostsQuery } from "@/API";
import {
  GRAPHQL_AUTH_MODE,
  GraphQLQuery,
  GraphQLResult,
} from "@aws-amplify/api";
import { toast } from "react-toastify";
import { AuthStore } from "./AuthStore";

class PostStoreClass {
  posts: IPost[];
  loading: boolean = false;

  constructor() {
    this.posts = [];
    makeObservable(this, {
      posts: observable,
      loading: observable,
      loadPosts: action,
      addPost: action,
      allPosts: computed,
    });
  }

  async loadPosts() {
    try {
      this.loading = true;
      // Ensure the user is authenticated before making the API call
      await Auth.currentAuthenticatedUser();

      // Fetch posts using GraphQL API
      // @ts-ignore
      const res: GraphQLResult<ListPostsQuery> = await API.graphql({
        query: queries.listPosts,
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });

      if (res.data?.listPosts?.items) {
        // @ts-ignore
        const posts: IPost[] = res.data.listPosts.items;
        this.posts = posts;
      }
    } catch (error: any) {
      console.log("Error fetching posts in AppSync:", error);
      toast.error(error || "Something went wrong.", {
        toastId: "fetchPostsError",
      });

      // Handle authentication error
      if (error === "The user is not authenticated") {
        AuthStore.logout();
      }

      // Return error for further handling
      return error;
    } finally {
      this.loading = false;
    }
  }

  addPost(post: IPost) {
    this.posts.unshift(post);
  }

  get allPosts() {
    return Array.from(this.posts);
  }
}

export default PostStoreClass;
export const PostStore = new PostStoreClass();
