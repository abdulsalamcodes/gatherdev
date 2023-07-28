import { useMainContext } from "@/appContext";
import React from "react";

const LeftSidebar = () => {
  // Dummy data for the user's profile
  const { store } = useMainContext();

  return (
    <aside className="px-4 sticky top-20">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        {/* Profile Information */}
        <div className="flex items-center mb-4">
          <img
            src={store.auth.currentUser?.profilePicture || 'https://randomuser.me/api/portraits/men/1.jpg'}
            alt="Profile"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <span className="text-xl font-bold">
              {store.auth.currentUser?.username}
            </span>
            <p className="text-gray-500 dark:text-gray-300">
              {store.auth.currentUser?.username}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-800 dark:text-white text-sm mb-4">
          {store.auth.currentUser?.title}
        </p>

        {/* Friends/Followers Count */}
        <div className="flex justify-between text-gray-800 dark:text-white text-sm">
          <div>
            <span className="font-bold">
              {store.auth.currentUser?.friendsCount || 213}
            </span>{" "}
            Friends
          </div>
          <div>
            <span className="font-bold">
              {store.auth.currentUser?.followersCount || 233}
            </span>{" "}
            Followers
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <ul className="text-gray-800 dark:text-white">
          <li className="mb-2">
            <a href="/profile">My Profile</a>
          </li>
          <li className="mb-2">
            <a href="/settings">Settings</a>
          </li>
          <li className="mb-2">
            <a href="/notifications">Notifications</a>
          </li>
        </ul>
      </div>

      {/* Trending Topics */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-gray-800 dark:text-white text-lg font-bold mb-4">
          Trending Topics
        </h2>
        <ul className="text-gray-800 dark:text-white">
          <li className="mb-2">
            <a href="/topic1">#Topic1</a>
          </li>
          <li className="mb-2">
            <a href="/topic2">#Topic2</a>
          </li>
          <li className="mb-2">
            <a href="/topic3">#Topic3</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default LeftSidebar;
