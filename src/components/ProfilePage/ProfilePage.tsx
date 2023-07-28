"use client";

import React from "react";
import Link from "next/link";
import { useMainContext } from "@/appContext";
import PostCard from "@/components/Home/PostCard";
import ProfileSidebar from "./ProfileSidebar";

const ProfilePage = () => {
  const { store } = useMainContext();

  return (
    <div className="bg-background text-text min-h-screen dark:text-white">
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        <div className="grid grid-cols-4 gap-8">
          <aside className="col-span-1">
            {/* Left Sidebar */}
            <ProfileSidebar />
            {/* Add your left sidebar content here */}
          </aside>
          <div className="col-span-3">
            Hello Main
            {/* Main Content Area */}
            {store.auth.currentUser ? (
              <section>
                <div className="mb-4">
                  <h1 className="text-3xl font-bold">
                    {store.auth.currentUser.fullname}
                  </h1>
                  <p className="text-gray-500">
                    @{store.auth.currentUser.username}
                  </p>
                </div>

                {/* User Info */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p>{store.auth.currentUser.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Title</p>
                      <p>{store.auth.currentUser.title}</p>
                    </div>
                  </div>
                </div>

                {/* User Posts */}
                <div className="grid grid-cols-2 gap-4">
                  {store.auth.currentUser.posts.map((post) => (
                    <div key={post.id}>
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
