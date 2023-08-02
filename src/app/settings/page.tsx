"use client";

import React, { useState } from "react";
import { useMainContext } from "@/appContext";
import { observer } from "mobx-react";
import { AuthStore } from "@/stores/AuthStore";
import ProfileSidebar from "@/components/ProfilePage/ProfileSidebar";
import CButton from "@/components/AtomicComponents/CButton";

const SettingsPage = () => {
 
  const [fullname, setFullname] = useState(AuthStore.currentUser?.fullname || "");
  const [title, setTitle] = useState(AuthStore.currentUser?.title || "");

  // const handleDarkModeToggle = () => {
  //   store.app.toggleDarkMode();
  // };

  const handleSaveChanges = () => {
    // Update the user's fullname and title
    const updatedUser = { ...AuthStore.currentUser, fullname, title };
    AuthStore.loadCurrentUser(updatedUser.id);
  };

  return (
    <div className="bg-background text-text min-h-screen  text-white">
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        <div className="grid grid-cols-4 gap-8">
          <aside className="col-span-1">
            {/* Left Sidebar */}
            <ProfileSidebar />
            {/* Add your left sidebar content here */}
          </aside>
          <div className="col-span-3">
            {/* Main Content Area */}
            <section>
              <h1 className="text-3xl font-bold mb-4">Settings</h1>
              <div className="   bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                <h2 className="text-gray-800  text-white text-lg font-bold mb-4">
                  General
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-5">
                    <label htmlFor="darkModeToggle" className="text-gray-600">
                      Dark Mode
                    </label>
                    <input
                      type="checkbox"
                      id="darkModeToggle"
                      className="w-6 h-6 mt-1"
                      checked
                      // checked={store.app.darkMode}
                      // onChange={handleDarkModeToggle}
                    />
                  </div>
                  {/* Add other general settings here */}
                </div>
              </div>
              <div className="   bg-gray-800 p-4 rounded-lg shadow-md mb-4">
                <h2 className="text-gray-800  text-white text-lg font-bold mb-4">
                  Account
                </h2>
                <div className="mb-4">
                  <label htmlFor="fullname" className="text-gray-600">
                    Fullname
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    className="mt-1 px-4 py-2 block w-full
                    outline-none
                    rounded bg-gray-900 text-white border border-gray-700"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="title" className="text-gray-600">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="mt-1 px-4 py-2 block w-full
                    outline-none
                    rounded bg-gray-900 text-white border border-gray-700"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <CButton label="Save Changes" onClick={handleSaveChanges} />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default observer(SettingsPage);
