import { useMainContext } from "@/appContext";
import { AuthStore } from "@/stores/AuthStore";
import Link from "next/link";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaTools, FaUserEdit, FaUserPlus } from "react-icons/fa";

type Props = {};

const ProfileSidebar = (props: Props) => {
   const user = AuthStore.currentUser;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        {/* User Avatar */}
        {user?.profilePicture ? (
          <img
            src={user?.profilePicture}
            alt={user?.fullname}
            className="w-16 h-16 rounded-full mr-4"
          />
        ) : (
          <AiOutlineUser 
            className="w-16 h-16 rounded-full mr-4 bg-gray-300"

           />
        )}

        {/* User Details */}
        <div>
          <h2 className="text-xl font-bold">{user?.fullname}</h2>
          <p className="text-gray-500">@{user?.username}</p>
        </div>
      </div>

      {/* User Bio */}
      <p className="text-gray-600 mb-6">{user?.title}</p>

      {/* User Actions */}
      <div className="flex space-x-2 mb-4 flex-wrap gap-2">
        <Link className="flex items-center text-sm justify-center bg-accent-primary hover:bg-accent-secondary text-white px-4 py-2 rounded-md flex-grow" href={'/settings'}>
          <FaTools className="mr-2" /> Settings
        </Link>

        <button className="flex items-center text-sm justify-center border border-accent-primary text-accent-primary hover:text-accent-secondary px-4 py-2 rounded-md flex-grow">
          <FaUserPlus className="mr-2" /> Follow
        </button>
      </div>

      {/* User Stats */}
      <div className="flex justify-around text-gray-500 text-sm mb-4">
        <div>
          <span className="font-bold text-black dark:text-white">
            {/* @ts-ignore */}
            {user?.posts?.items?.length}
          </span>{" "}
          Posts
        </div>
        <div>
          <span className="font-bold text-black dark:text-white">
            {user?.friendsCount || 0}
          </span>{" "}
          Friends
        </div>
        <div>
          <span className="font-bold text-black dark:text-white">
            {user?.followersCount || 0}
          </span>{" "}
          Followers
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
