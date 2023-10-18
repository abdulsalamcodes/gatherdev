"use client";
import React, { useEffect } from "react";
import { observer } from "mobx-react";
import Loader from "../AtomicComponents/Loader/Loader";
import PostCard from "./PostCard/PostCard";
import LeftSidebar from "./Sidebar/LeftSidebar";
import RightSidebar from "./Sidebar/RightSidebar";
import CreateNewPost from "./CreateNewPost/CreateNewPost";
import { PostStore } from "../../stores/postStore";
import styles from "./Feed.module.scss";

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
        <Loader />
      </div>
    );
  }

  return (
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
  );
};

export default observer(Feed);
