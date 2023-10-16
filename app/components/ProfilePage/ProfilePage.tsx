"use client";

import React from "react";
import PostCard from "../Home/PostCard/PostCard";
import ProfileSidebar from "./ProfileSidebar";
import { observer } from "mobx-react";
import { IPost } from "../../types/post";
import { AuthStore } from "../../stores/AuthStore";
import styles from "./Profile.module.scss";

const ProfilePage = ({ username }: { username?: string }) => {
  const { profileUser, currentUser } = AuthStore;
  const user = username ? profileUser : currentUser;
  const isPostsEmpty = user?.posts?.items?.length === 0;

  if (username) {
    console.log("Loading user by username", username);
    AuthStore.loadUserByUsername(username);
  }

  const Posts = () => {
    return (
      <div className="grid gap-4">
        {user?.posts?.items?.map((post: IPost) => (
          <div key={post.id}>
            <PostCard post={post} user={user} />
          </div>
        ))}
      </div>
    );
  };

  const PostEmpty = () => {
    return <p>No posts yet.</p>;
  };

  return (
    <div className={styles.profile}>
      <aside className={styles.aside}>
        <ProfileSidebar user={user!} />
      </aside>

      {/* My posts ///// My contributions */}
      <div className={styles.main}>
        {user ? (
          <section>
            <div>
              <h2>User Posts</h2>
              {isPostsEmpty ? <PostEmpty /> : <Posts />}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default observer(ProfilePage);
