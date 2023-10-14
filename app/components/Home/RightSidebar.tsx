import { useMainContext } from "@/appContext";
import { AuthStore } from "../../stores/AuthStore";
import { observer } from "mobx-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import styles from "./Sidebar.module.scss";

const RightSidebar = () => {
  useEffect(() => {
    AuthStore.loadAllUsers();
  }, []);

  return (
    <aside className={styles.sidebar}>
      {/* Recommended Users */}
      <div className={styles.card}>
        <h2 className={styles.header}>Recommended Users</h2>
        <ul>
          {AuthStore.allUsers.map((user) => (
            <li key={user.id} className={styles.userCard}>
              <Image
                height={40}
                width={40}
                src={
                  user.profilePicture ||
                  "https://randomuser.me/api/portraits/men/1.jpg"
                }
                alt="User"
                className={styles.image}
              />
              <div>
                <Link
                  href={`/profile/${user.username}`}
                  className={styles.name}
                >
                  {user.fullname}
                </Link>
                <p className={styles.title}>{user.title}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default observer(RightSidebar);
