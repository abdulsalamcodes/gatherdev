"use client";

import React, { useEffect } from "react";
import { observer } from "mobx-react";
import Loader from "../AtomicComponents/Loader/Loader";
import PostCard from "./PostCard/PostCard";
import LeftSidebar from "./Sidebar/LeftSidebar";
import RightSidebar from "./Sidebar/RightSidebar";
import CreateNewPost from "./CreateNewPost/CreateNewPost";
import styles from "./Feed.module.scss";
import { PostStore } from "@/stores/postStore";

const Feed = () => {
  const { loading, posts } = PostStore;

  useEffect(() => {
    PostStore.loadPosts();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <LeftSidebar />
      </div>
      <section className={styles.center}>
        <CreateNewPost />
        <section>
          {loading ? (
            <div className={styles.loaderWrapper}>
              <Loader />
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post._id} post={post} user={post.author} />
            ))
          )}
        </section>
      </section>
      <div className={styles.right}>
        <RightSidebar />
      </div>
    </main>
  );
};

export default observer(Feed);
