import { useMainContext } from "@/appContext";
import { AuthStore } from "@/stores/AuthStore";
import { observer } from "mobx-react";
import React, { useEffect } from "react";

const RightSidebar = () => {
 
  useEffect(() => {
    AuthStore.loadAllUsers();
  }, []);

  const developerTools = [
    {
      title: "GitHub",
      description:
        "A development platform for hosting and reviewing code, managing projects, and building software.",
      link: "https://github.com/",
    },
    {
      title: "Visual Studio Code",
      description:
        "A powerful code editor with built-in Git integration and support for various programming languages.",
      link: "https://code.visualstudio.com/",
    },
    {
      title: "npm",
      description: "A package manager for JavaScript and Node.js libraries.",
      link: "https://www.npmjs.com/",
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
          {AuthStore.allUsers.map((user) => (
            <li key={user.id} className="flex items-center mb-2">
              <img
                src={
                  user.profilePicture ||
                  "https://randomuser.me/api/portraits/men/1.jpg"
                }
                alt="User"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <a
                  href={`/users/${user.username}`}
                  className="text-gray-800 dark:text-white"
                >
                  {user.fullname}
                </a>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {user.title}
                </p>
              </div>
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
          Discover More about Codespere! Unleash your coding potential with us.
          Join our exclusive live webinar at <a
                href={'https://joinentre.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >joinentre.com</a>
        </p>
      </div>

      {/* Developer Tools/Resources */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-4">
        <h2 className="text-gray-800 dark:text-white text-lg font-bold mb-4">
          Developer Tools/Resources
        </h2>
        <ul>
          {developerTools.map((tool) => (
            <li key={tool.title} className="mb-4">
              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                <h3 className="text-gray-800 dark:text-white font-bold mb-1">
                  {tool.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {tool.description}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default observer(RightSidebar);
