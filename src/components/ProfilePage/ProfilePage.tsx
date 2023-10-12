"use client";

import React, { useEffect } from "react";
import PostCard from "@/components/Home/PostCard";
import ProfileSidebar from "./ProfileSidebar";
import { observer } from "mobx-react";
import { IPost } from "@/types/post";
import { AuthStore } from "@/stores/AuthStore";
import styles from "./Profile.module.scss";

const ProfilePage = ({ username }: { username?: string }) => {
  const { profileUser, currentUser } = AuthStore;
  const user = username ? profileUser : currentUser;

  useEffect(() => {
    if (username) {
      console.log("Loading user by username", username);
      AuthStore.loadUserByUsername(username);
    }
  }, [username]);

  return (
    <div className={styles.profile}>
      <aside className={styles.aside}>
        <ProfileSidebar user={user!} />
      </aside>

      {/* My posts ///// My contributions */}
      <div className={styles.main}>
        {user ? (
          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">User Posts</h2>
              {/* @ts-ignore */}
              {user.posts?.items?.length > 0 ? (
                <div className="grid gap-4">
                  {/* @ts-ignore */}
                  {user.posts?.items?.map((post: IPost) => (
                    <div key={post.id}>
                      <PostCard post={post} user={user} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No posts yet.</p>
              )}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default observer(ProfilePage);
