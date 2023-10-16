import React from "react";

import { Amplify } from "aws-amplify";
import awsmobile from "@/aws-exports";
import Settings from "@/components/Settings/Settings";

Amplify.configure({ ...awsmobile, ssr: true });

const SettingsPage = () => {
  return <Settings />;
};

export default SettingsPage;
