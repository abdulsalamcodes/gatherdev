import { AuthStore } from "@/stores/AuthStore";
import { observer } from "mobx-react";
import React from "react";

const LeftSidebar = () => {
 
  return (
    <aside className="px-4 sticky top-20">
      <div className="   bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        {/* Profile Information */}
        <div className="flex items-center mb-4">
          <img
            src={
              AuthStore.currentUser?.profilePicture ||
              "https://randomuser.me/api/portraits/men/1.jpg"
            }
            alt="Profile"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <span className="text-xl font-bold">
              {AuthStore.currentUser?.fullname || "Anonymous"}
            </span>
            <p className="text-gray-500  text-gray-300">
              {AuthStore.currentUser?.username}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-800  text-white text-sm mb-4">
          {AuthStore.currentUser?.title}
        </p>

        {/* Friends/Followers Count */}
        <div className="flex justify-between text-gray-800  text-white text-sm">
          <div>
            <span className="font-bold">
              {AuthStore.currentUser?.friendsCount || 0}
            </span>{" "}
            Friends
          </div>
          <div>
            <span className="font-bold">
              {AuthStore.currentUser?.followersCount || 0}
            </span>{" "}
            Followers
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="   bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <ul className="text-gray-800  text-white">
          <li className="mb-2">
            <a href="/profile" className="text-blue-500 hover:underline">
              My Profile
            </a>
          </li>
          <li className="mb-2">
            <a href="/settings" className="text-blue-500 hover:underline">
              Settings
            </a>
          </li>
          {/* <li className="mb-2">
            <a href="/notifications" className="text-blue-500 hover:underline">
              Notifications
            </a>
          </li> */}
        </ul>
      </div>

      {/* Trending Topics */}
      <div className="   bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-gray-800  text-white text-lg font-bold mb-4">
          Trending Topics
        </h2>
        <ul className="text-gray-800  text-white">
          <li className="mb-2">
            <a href="#" className="text-green-500 hover:underline">
              #javascript
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-green-500 hover:underline">
              #python
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-green-500 hover:underline">
              #best-practices
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default observer(LeftSidebar);
