import React from "react";
import ProfilePage from "@/components/ProfilePage/ProfilePage";

const Profile = ({ params }: { params: { username: string } }) => {
  return <ProfilePage username={params.username} />
}

export default Profile;
