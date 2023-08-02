"use client";

import React, { useEffect } from "react";
import PostCard from "@/components/Home/PostCard";
import ProfileSidebar from "./ProfileSidebar";
import { observer } from "mobx-react";
import { IPost } from "@/types/post";
import { AuthStore, IUser } from "@/stores/AuthStore";

const ProfilePage = ({ username }: { username?: string }) => {
  const { profileUser, currentUser } = AuthStore;
  const user = username ? profileUser : currentUser;

  useEffect(() => {
    if (username) {
      console.log("Loading user by username", username);
      AuthStore.loadUserByUsername(username);
    }
  }, []);

  return (
    <div className="bg-background text-text min-h-screen  text-white">
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        <div className="grid grid-cols-4 gap-8">
          <aside className="col-span-1">
            {/* Left Sidebar */}
            <ProfileSidebar user={user!} />
            {/* Add your left sidebar content here */}
          </aside>
          <div className="col-span-3">
            {/* Main Content Area */}
            {user ? (
              <section>
                <div className="mb-4">
                  <h1 className="text-3xl font-bold">{user.fullname}</h1>
                  <p className="text-gray-500">@{user.username}</p>
                </div>

                {/* User Info */}
                <div className="   bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p>{user.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Title</p>
                      <p>{user.title}</p>
                    </div>
                  </div>
                </div>

                {/* User Posts */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">User Posts</h2>
                  {/* @ts-ignore */}
                  {user.posts?.items?.length > 0 ? (
                    <div className="flex flex-col gap-5">
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
      </main>
    </div>
  );
};

export default observer(ProfilePage);
