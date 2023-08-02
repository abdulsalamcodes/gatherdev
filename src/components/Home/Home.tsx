"use client";

import { CreatePostMutation, ListPostsQuery } from "@/API";
import { useMainContext } from "@/appContext";
import { GRAPHQL_AUTH_MODE, GraphQLQuery } from "@aws-amplify/api";
import { API, Amplify, Auth } from "aws-amplify";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import * as mutations from "../../graphql/mutations";
import LoadingComponent from "@/components/AtomicComponents/Loading";
import PostCard from "./PostCard";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import CreateNewPost from "./CreateNewPost";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AuthStore } from "@/stores/AuthStore";
import { PostStore } from "@/stores/postStore";
import awsconfig from "../../aws-exports";

Amplify.configure(awsconfig);

const PostPage = () => {
  const [posting, setPosting] = useState(false);
  const { currentUser } = AuthStore;
  const router = useRouter();
  const logUserOut = () => {
    AuthStore.logout();
    router.push("/login");
  };

  async function createPost(
    content: string,
    code: string,
    language: string,
    topicTag: string
  ) {
    try {
      setPosting(true);
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        const newPostResp = await API.graphql<GraphQLQuery<CreatePostMutation>>(
          {
            query: mutations.createPost,
            variables: {
              input: {
                userPostsId: currentUser?.id,
                content,
                language,
                topicTag,
                code,
              },
            },
            authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
          }
        );
        console.log("newPostResp:", newPostResp.data?.createPost);
        // @ts-ignore
        PostStore.addPost(newPostResp.data?.createPost);
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
    PostStore.loadPosts().then((res) => {
      if (res === "The user is not authenticated") {
        logUserOut();
      }
    });
    const currentUserId = JSON.parse(
      localStorage.getItem("currentUserId") || "null"
    );
    if (currentUserId) {
      AuthStore.loadCurrentUser(currentUserId);
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-background text-text">
        {/* Main Content Area */}
        <main className="h-full mx-auto px-4 md:px-8 mt-8 max-w-7xl flex flex-wrap">
          {/* Left Sidebar */}
          <div className="w-full hidden sm:block md:w-1/4 mb-5">
            <LeftSidebar />
          </div>

          {/* Center Content */}
          <section className="w-full md:w-1/2 px-4 overflow-y-auto">
            <CreateNewPost onSubmit={createPost} isPosting={posting} />
            {PostStore.loading ? (
              <LoadingComponent />
            ) : (
              <section>
                {PostStore.allPosts?.length > 0 ? (
                  PostStore.allPosts?.map((post) => (
                    <PostCard key={post.id} post={post} user={post.author} />
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
