"use client";

import React, { useState } from "react";
import { observer } from "mobx-react";
import styles from "./Settings.module.scss";
import { AuthStore } from "@/stores/AuthStore";
import ProfileSidebar from "../ProfilePage/ProfileSidebar";
import CButton from "../AtomicComponents/CButton/CButton";

const SettingsPage = () => {
  const [fullname, setFullname] = useState(
    AuthStore.currentUser?.fullname || ""
  );
  const [title, setTitle] = useState(AuthStore.currentUser?.title || "");

  const handleSaveChanges = () => {
    AuthStore.updateUser(fullname, title);
  };

  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <ProfileSidebar user={AuthStore.currentUser} />
      </div>

      <div className={styles.center}>
        <div className={styles.accountSetting}>
          <label htmlFor="fullname" className={styles.settingLabel}>
            Fullname
          </label>
          <input
            type="text"
            id="fullname"
            className={styles.settingInput}
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className={styles.accountSetting}>
          <label htmlFor="title" className={styles.settingLabel}>
            Title
          </label>
          <input
            type="text"
            id="title"
            className={styles.settingInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.footer}>
          <button className={styles.button} onClick={handleSaveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
};

export default observer(SettingsPage);
