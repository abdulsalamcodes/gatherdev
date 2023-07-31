"use client";

import { CreatePostMutation, ListPostsQuery } from "@/API";
import { useMainContext } from "@/appContext";
import { GRAPHQL_AUTH_MODE, GraphQLQuery } from "@aws-amplify/api";
import { API, Auth } from "aws-amplify";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import LoadingComponent from "@/components/AtomicComponents/Loading";
import PostCard from "./PostCard";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import CreateNewPost from "./CreateNewPost";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AuthStore } from "@/stores/AuthStore";

const PostPage = () => {
  const { store } = useMainContext();
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const router = useRouter();

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
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        });

        if (res.data?.listPosts?.items) {
          // @ts-ignore
          store.post.loadPosts(res.data.listPosts.items);
        }
      } else {
        logUserOut();
      }
    } catch (error: any) {
      if (error === "The user is not authenticated") {
        router.push("/login");
      }
      toast.error(error || "Something went wrong.", {
        toastId: "fetchPostsError",
      });
    }
    setLoading(false);
  }

  async function createPost(content: string, code: string) {
    try {
      setPosting(true);
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        const newPostResp = await API.graphql<GraphQLQuery<CreatePostMutation>>({
          query: mutations.createPost,
          variables: {
            input: {
              userPostsId: store.auth.currentUser?.id,
              content,
              language: "javascript",
              topicTag: "javascript",
              code,
            },
          },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        });
        console.log("newPostResp:", newPostResp.data?.createPost);
        // @ts-ignore
        store.post.addPost(newPostResp.data?.createPost);
      } else {
        logUserOut();
      }
    } catch (error: any) {
      toast.error(error || "Something went wrong.");
      console.error("Error creating post:", error);
    }
    setPosting(false);
  }

  useEffect(() => {
    fetchPosts();
    const currentUserId = JSON.parse(localStorage.getItem("currentUserId") || "null");
    if (currentUserId) {
      store.auth.loadCurrentUser(currentUserId);
    }
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
              <section>
                {store.post.allPosts?.length > 0 ? (
                  store.post.allPosts?.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <p className="text-center">No Posts Yet</p>
                )}
              </section>
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
