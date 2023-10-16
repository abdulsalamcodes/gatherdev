"use client";

import React, { SetStateAction, useState } from "react";
import VerificationInput from "react-verification-input";
import CButton from "../AtomicComponents/CButton/CButton";
import { Auth, Hub } from "aws-amplify";
import { useRouter } from "next/navigation";
import { createUserInAppSync } from "@/utils";
import { toast } from "react-toastify";
import styles from "./Auth.module.scss";
import BgWrap from "../AtomicComponents/BgWrap/BgWrap";

type ConfirmSignUpParameters = {
  username: string;
  code: string;
};

type ResendConfCodeParameters = {
  username: string;
};
interface ConfirmCodeFormProp {
  username: string;
}
const ConfirmCodeForm: React.FC<ConfirmCodeFormProp> = ({ username }) => {
  const [confirmCode, setConfirmCode] = useState("");
  const [reqLoading, setReqLoading] = useState(false);
  const router = useRouter();

  function listenToAutoSignInEvent() {
    Hub.listen("auth", ({ payload }) => {
      const { event } = payload;
      if (event === "autoSignIn") {
        const user = payload.data;
        // assign user
        console.log("User Login successful::", user);
        if (user) {
          setReqLoading(false);
          createUserInAppSync({
            username: user.username,
            email: user.attributes.email,
            id: user.attributes.sub,
          });
          localStorage.setItem(
            "currentUserId",
            JSON.stringify(user.attributes.sub)
          );
          router.push("/home");
        }
      } else if (event === "autoSignIn_failure") {
        // redirect to sign in page
        router.push("/login");
      }
    });
  }

  async function confirmSignUp({ username, code }: ConfirmSignUpParameters) {
    try {
      setReqLoading(true);
      await Auth.confirmSignUp(username, code);
      listenToAutoSignInEvent();
      toast.success("Sign up successful, please login");
    } catch (error: any) {
      toast.error(error || "Something went wrong");
      setReqLoading(false);
      console.log("error confirming sign up", error);
    }
  }

  async function resendConfirmationCode({
    username,
  }: ResendConfCodeParameters) {
    try {
      await Auth.resendSignUp(username);
      console.log("code resent successfully");
      toast.success("Code resent successfully");
    } catch (err: any) {
      console.log("error resending code: ", err);
      toast.error(err.message || "Error resending code");
    }
  }

  const handleComplete = () => {
    confirmSignUp({
      code: confirmCode,
      username: username,
    });
  };

  return (
    <div className={styles.container}>
      <BgWrap />
      <form className={styles.form}>
        <header className={styles.form__header}>
          <h1>Confirm Your Account</h1>
        </header>
        <div className={styles.verificationInput}>
          <VerificationInput
            validChars="0-9"
            autoFocus
            inputProps={{ inputMode: "numeric" }}
            onChange={(value) => setConfirmCode(value)}
            value={confirmCode}
            classNames={{
              container: styles.inputContainer,

              character: styles.character,
              characterInactive: styles.characterInactive,
              characterSelected: styles.characterSelected,
            }}
          />
          <CButton
            label={"Sign Up"}
            isLoading={reqLoading}
            onClick={handleComplete}
          />
          <button
            type="button"
            className={styles.resetBtn}
            onClick={() =>
              resendConfirmationCode({
                username: username,
              })
            }
          >
            Resend confirmation code
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmCodeForm;
