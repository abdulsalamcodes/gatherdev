import { action, computed, makeObservable, observable } from "mobx";
import { IPost } from "../types/post";
import * as queries from "../graphql/queries";
import * as mutations from "../graphql/mutations";

import { API, Auth } from "aws-amplify";
import { CreatePostMutation, ListPostsQuery } from "../API";
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
  posting: boolean = false;

  constructor() {
    this.posts = [];
    makeObservable(this, {
      posts: observable,
      loading: observable,
      loadPosts: action,
      posting: observable,
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

      // Return error for further handling
      return error;
    } finally {
      this.loading = false;
    }
  }

  async createPost(userId: string, post: IPost) {
    try {
      this.posting = true;
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        const newPostResp = await API.graphql<GraphQLQuery<CreatePostMutation>>(
          {
            query: mutations.createPost,
            variables: {
              input: {
                userPostsId: userId,
                content: post.content,
                language: post.language,
                topicTag: post.topicTag,
                code: post.code,
              },
            },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          }
        );
        console.log("newPostResp:", newPostResp.data?.createPost);
        // @ts-ignore
        PostStore.addPost(newPostResp.data?.createPost);
      } else {
        AuthStore.logout();
      }
    } catch (error: any) {
      toast.error(error || "Something went wrong.");
      console.error("Error creating post:", error);
    }
    this.posting = false;
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
