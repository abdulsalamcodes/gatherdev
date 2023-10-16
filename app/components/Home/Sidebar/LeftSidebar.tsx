import { AuthStore } from "../../../stores/AuthStore";
import { observer } from "mobx-react";
import React from "react";
import styles from "./Sidebar.module.scss";
import Image from "next/image";

const LeftSidebar = () => {
  const tags = ["javascript", "python", "reactjs", "nextjs"];
  return (
    <aside className={styles.sidebar}>
      <div className={styles.card}>
        <div className={styles.userCard}>
          <Image
            src={
              AuthStore.currentUser?.profilePicture ||
              "https://randomuser.me/api/portraits/men/1.jpg"
            }
            height={40}
            width={40}
            alt="Profile"
            className={styles.image}
          />
          <div>
            <p className={styles.name}>{AuthStore.currentUser?.username}</p>
            <p className={styles.title}>{AuthStore.currentUser?.title}</p>
          </div>
        </div>

        {/* Friends/Followers Count */}
        <div className={styles.connections}>
          <p className={styles.connection}>
            {AuthStore.currentUser?.friendsCount || 0} Friends
          </p>
          <p className={styles.connection}>
            {AuthStore.currentUser?.followersCount || 0} Followers
          </p>
        </div>
      </div>

      {/* Trending Topics */}
      <div className={styles.card}>
        <h2 className={styles.header}>Filter By Tags</h2>
        <ul className={styles.tags}>
          {tags.map((tag) => (
            <li className={styles.tag} key={tag}>
              <a href="#">#{tag}</a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default observer(LeftSidebar);
