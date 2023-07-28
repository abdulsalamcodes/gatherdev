import React from "react";
import {
  AiOutlineUsergroupAdd,
  AiOutlineMessage,
  AiOutlineStar,
} from "react-icons/ai";

const RightSidebar = () => {
  // Dummy data for recommended users
  const recommendedUsers = [
    {
      id: 1,
      username: "JaneSmith",
      fullName: "Jane Smith",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      username: "SamBrown",
      fullName: "Sam Brown",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 3,
      username: "EmilyJohnson",
      fullName: "Emily Johnson",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ];

  return (
    <aside className="w-full px-4 sticky top-20">
      {/* Recommended Users */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-gray-800 dark:text-white text-lg font-bold mb-4">
          Recommended Users
        </h2>
        <ul>
          {recommendedUsers.map((user) => (
            <li key={user.id} className="flex items-center mb-2">
              <img
                src={user.profilePicture}
                alt="User"
                className="w-8 h-8 rounded-full mr-2"
              />
              <a
                href={`/users/${user.username}`}
                className="text-gray-800 dark:text-white"
              >
                {user.fullName}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Sponsored Content */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-gray-800 dark:text-white text-lg font-bold mb-4">
          Sponsored Content
        </h2>
        <p className="text-gray-800 dark:text-white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam nec
          consectetur dui.
        </p>
      </div>

      {/* Developer Tools/Resources */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-gray-800 dark:text-white text-lg font-bold mb-4">
          Developer Tools/Resources
        </h2>
        <ul>
          <li className="mb-2">
            <a href="/tools1">Tool 1</a>
          </li>
          <li className="mb-2">
            <a href="/tools2">Tool 2</a>
          </li>
          <li className="mb-2">
            <a href="/tools3">Tool 3</a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default RightSidebar;
