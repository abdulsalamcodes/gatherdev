import { useMainContext } from "@/appContext";
import React from "react";
import { FaUserEdit, FaUserPlus } from "react-icons/fa";

type Props = {};

const ProfileSidebar = (props: Props) => {
  const { store } = useMainContext();
  const userProfile = {
    username: "JohnDoe",
    fullName: "John Doe",
    bio: "Frontend Developer | JavaScript Enthusiast",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    friendsCount: 123,
    followersCount: 456,
    postsCount: 789,
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        {/* User Avatar */}
        <img
          src={userProfile.profilePicture}
          alt={userProfile.fullName}
          className="w-16 h-16 rounded-full mr-4"
        />

        {/* User Details */}
        <div>
          <h2 className="text-xl font-bold">{userProfile.fullName}</h2>
          <p className="text-gray-500">@{userProfile.username}</p>
        </div>
      </div>

      {/* User Bio */}
      <p className="text-gray-600 mb-6">{userProfile.bio}</p>

      {/* User Actions */}
      <div className="flex space-x-2 mb-4 flex-wrap gap-2">
        <button className="flex items-center text-sm justify-center bg-accent-primary hover:bg-accent-secondary text-white px-4 py-2 rounded-md flex-grow">
          <FaUserEdit className="mr-2" /> Edit Profile
        </button>

        <button className="flex items-center text-sm justify-center border border-accent-primary text-accent-primary hover:text-accent-secondary px-4 py-2 rounded-md flex-grow">
          <FaUserPlus className="mr-2" /> Follow
        </button>
      </div>

      {/* User Stats */}
      <div className="flex justify-around text-gray-500 text-sm mb-4">
        <div>
          <span className="font-bold text-black dark:text-white">{userProfile.postsCount}</span> Posts
        </div>
        <div>
          <span className="font-bold text-black dark:text-white">{userProfile.friendsCount}</span> Friends
        </div>
        <div>
          <span className="font-bold text-black dark:text-white">{userProfile.followersCount}</span> Followers
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
