"use client";
import React, { useEffect } from "react";
import { Amplify } from "aws-amplify";
import { observer } from "mobx-react";
import LoadingComponent from "../AtomicComponents/Loading";
import PostCard from "./PostCard";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import CreateNewPost from "./CreateNewPost";
import { PostStore } from "../../stores/postStore";
import styles from "./Feed.module.scss";
import awsconfig from "../../aws-exports";

Amplify.configure(awsconfig);

const Feed = () => {
  // Only reload the feed when there are no posts.
  useEffect(() => {
    if (PostStore.allPosts.length === 0) {
      PostStore.loadPosts();
    }
  }, []);

  const MainContent = () => {
    if (PostStore.allPosts.length > 0) {
      return (
        <section>
          {PostStore.allPosts.map((post) => (
            <PostCard key={post.id} post={post} user={post.author} />
          ))}
        </section>
      );
    } else {
      return <p className="text-center">No Posts Yet</p>;
    }
  };

  // Render loading component if posts are still fetching.
  if (PostStore.loading) {
    return (
      <div className={styles.loaderWrapper}>
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.left}>
          <LeftSidebar />
        </div>
        <section className={styles.center}>
          <CreateNewPost />
          <MainContent />
        </section>
        <div className={styles.right}>
          <RightSidebar />
        </div>
      </main>
    </div>
  );
};

export default observer(Feed);
