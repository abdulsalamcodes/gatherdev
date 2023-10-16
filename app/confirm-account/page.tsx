import React from "react";
import ConfirmCodeForm from "@/components/Auth/ConfirmCodeForm";

const ConfirmCodeFormPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  return <ConfirmCodeForm username={searchParams.username} />;
};

export default ConfirmCodeFormPage;
