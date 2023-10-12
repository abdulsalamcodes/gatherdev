import { useMainContext } from "@/appContext";
import { AuthStore, IUser } from "@/stores/AuthStore";
import { observer } from "mobx-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaTools, FaUserEdit, FaUserPlus } from "react-icons/fa";
import styles from "./Profile.module.scss";
import Image from "next/image";

type Props = {
  user: IUser | null;
};

const ProfileSidebar = (props: Props) => {
  const { user } = props;
  const pathname = usePathname();
  console.log("ProfileSidebar", pathname);

  return (
    <div className={styles.sidebar}>
      <div>
        <div className={styles.user}>
          {user?.profilePicture ? (
            <Image
              height={40}
              width={40}
              src={user?.profilePicture}
              alt={user?.fullname || "user"}
              className={styles.avatar}
            />
          ) : (
            <AiOutlineUser className={styles.avatar} />
          )}

          <div>
            <h2 className={styles.fullname}>{user?.fullname}</h2>
            <p className={styles.username}>@{user?.username}</p>
          </div>
        </div>

        <p className={styles.email}>{user?.email}</p>
        <p className={styles.title}>{user?.title}</p>
      </div>

      <div>
        {user?.id === AuthStore.currentUser?.id && pathname !== "/settings" && (
          <Link href={"/settings"} className={styles.action__btn}>
            <FaTools className="mr-2" /> Settings
          </Link>
        )}
        {user?.id !== AuthStore.currentUser?.id ? (
          <button>
            <FaUserPlus className="mr-2" /> Follow
          </button>
        ) : null}
      </div>

      {/* User Stats */}
      <div className={styles.userStats}>
        <div>{user?.posts?.items?.length} Posts</div>
        <div>{user?.friendsCount || 0} Friends</div>
        <div>{user?.followersCount || 0} Followers</div>
      </div>
    </div>
  );
};

export default observer(ProfileSidebar);
