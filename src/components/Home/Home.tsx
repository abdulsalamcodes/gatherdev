"use client";

import {
  CreatePostInput,
  CreatePostMutation,
  GetPostQuery,
  ListPostsQuery,
} from "@/API";
import { useMainContext } from "@/appContext";
import { GRAPHQL_AUTH_MODE, GraphQLQuery } from "@aws-amplify/api";
import { API, Auth } from "aws-amplify";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import AuthStore from "@/stores/AuthStore";
import LoadingComponent from "@/components/AtomicComponents/Loading";
import CButton from "../AtomicComponents/CButton";
import PostCard from "./PostCard";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import CreateNewPost from "./CreateNewPost";
import { useRouter } from "next/navigation";

const PostPage = () => {
  const { store } = useMainContext();
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const router = useRouter();
  const user = store.auth.currentUser;

  const postDetails = (content: string, code: string) => ({
    author: {
      id: user?.id,
      username: user?.username,
      fullname: user?.fullname,
      email: user?.email,
      title: user?.title,
    },
    content,
    code,
  });

  const logUserOut = () => {
    store.auth.logout();
    router.push("/login");
  };
  async function fetchPosts() {
    try {
      setLoading(true);
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        const res = await API.graphql<GraphQLQuery<ListPostsQuery>>({
          query: queries.listPosts,
          // variables: { limit: 2 },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        });

        if (res.data?.listPosts?.items) {
          // @ts-ignore
          store.post.load(res.data.listPosts.items);
        }
      } else {
        logUserOut();
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
    setLoading(false);
  }

  async function createPost(content: string, code: string) {
    try {
      setPosting(true);
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        await API.graphql<GraphQLQuery<CreatePostMutation>>({
          query: mutations.createPost,
          variables: { input: postDetails(content, code) },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        });
      } else {
        logUserOut();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
    setPosting(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background text-text">
        {/* Main Content Area */}
        <main className="h-full mx-auto px-4 md:px-8 mt-8 max-w-7xl flex flex-wrap">
          <div className="w-full md:w-1/4">
            <LeftSidebar />
          </div>
          {/* Center Content */}
          <section className="w-full md:w-1/2 px-4 overflow-y-auto">
            <CreateNewPost onSubmit={createPost} isPosting={posting} />
            {loading ? (
              <LoadingComponent />
            ) : (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                {store.post.posts?.length > 0 ? (
                  store.post.posts?.map((post) => (
                    <PostCard
                      key={post.id}
                      post={{
                        ...post,
                        code: "function add(a, b) {\n  return a + b;\n}",
                      }}
                    />
                  ))
                ) : (
                  <p className="text-center">No Posts Yet</p>
                )}
              </div>
            )}
          </section>

          {/* Right Sidebar */}
          <div className="w-full md:w-1/4">
            <RightSidebar />
          </div>
        </main>
      </div>
    </>
  );
};

export default observer(PostPage);
