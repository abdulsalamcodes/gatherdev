"use client";
import { Amplify } from "aws-amplify";
import { observer } from "mobx-react";
import { useEffect } from "react";
import LoadingComponent from "@/components/AtomicComponents/Loading";
import PostCard from "./PostCard";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import CreateNewPost from "./CreateNewPost";
import { useRouter } from "next/navigation";
import { AuthStore } from "@/stores/AuthStore";
import { PostStore } from "@/stores/postStore";
import styles from "./Feed.module.scss";

import awsconfig from "../../aws-exports";

Amplify.configure(awsconfig);

const Feed = () => {
  const router = useRouter();
  const isPostsEmpty = PostStore.allPosts?.length === 0;

  const logUserOut = () => {
    AuthStore.logout();
    router.push("/login");
  };

  useEffect(() => {
    if (isPostsEmpty) {
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
    }
  }, []);

  const MainContent = () => {
    return (
      <section>
        {!isPostsEmpty ? (
          PostStore.allPosts?.map((post) => (
            <PostCard key={post.id} post={post} user={post.author} />
          ))
        ) : (
          <p className="text-center">No Posts Yet</p>
        )}
      </section>
    );
  };

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <div className={styles.left}>
            <LeftSidebar />
          </div>
          <section className={styles.center}>
            <CreateNewPost />
            {PostStore.loading ? <LoadingComponent /> : <MainContent />}
          </section>
          <div className={styles.right}>
            <RightSidebar />
          </div>
        </main>
      </div>
    </>
  );
};

export default observer(Feed);
