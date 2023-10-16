"use client";

import React, { useState } from "react";
import VerificationInput from "react-verification-input";
import CButton from "../AtomicComponents/CButton/CButton";
import * as Yup from "yup";
import { Auth, Hub } from "aws-amplify";
import { useRouter } from "next/navigation";
import { createUserInAppSync } from "@/utils";
import { toast } from "react-toastify";
import styles from "./Auth.module.scss";
import BgWrap from "../AtomicComponents/BgWrap/BgWrap";
import { FormikProvider, useFormik } from "formik";

interface ConfirmCodeFormProp {
  username: string;
}
const ConfirmCodeForm: React.FC<ConfirmCodeFormProp> = ({ username }) => {
  const [posting, setPosting] = useState(false);
  const router = useRouter();

  // This function logs user in immediately after confirmation.
  function listenToAutoSignInEvent() {
    Hub.listen("auth", ({ payload }) => {
      const { event } = payload;
      if (event === "autoSignIn") {
        const user = payload.data;
        console.log("User Login successful::", user);
        // assign user
        if (user) {
          setPosting(false);
          createUserInAppSync({
            username: user.username,
            email: user.attributes.email,
            id: user.attributes.sub,
          });
          router.push("/home");
        }
      } else if (event === "autoSignIn_failure") {
        router.push("/login");
      }
    });
  }

  type ConfirmSignUpParameters = {
    username: string;
    code: string;
  };

  async function confirmSignUp({ username, code }: ConfirmSignUpParameters) {
    try {
      setPosting(true);
      await Auth.confirmSignUp(username, code);
      listenToAutoSignInEvent();
      toast.success("Sign up successful, please login");
    } catch (error: any) {
      toast.error(error || "Something went wrong");
      setPosting(false);
      console.log("error confirming sign up", error);
    }
  }

  type ResendConfCodeParameters = {
    username: string;
  };
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

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const initialValues: {
    username: string;
    code: string;
  } = {
    code: "",
    username: username,
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      confirmSignUp(values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <div className={styles.container}>
        <BgWrap />
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <header className={styles.form__header}>
            <h1>Confirm Your Account</h1>
          </header>
          <div className={styles.verificationInput}>
            <VerificationInput
              validChars="0-9"
              autoFocus
              inputProps={{ inputMode: "numeric" }}
              onChange={(value) => formik.setFieldValue("code", value)}
              value={formik.values.code}
              classNames={{
                container: styles.inputContainer,
                character: styles.character,
                characterInactive: styles.characterInactive,
                characterSelected: styles.characterSelected,
              }}
            />
            <CButton label={"Confirm"} type="submit" isLoading={posting} />
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
    </FormikProvider>
  );
};

export default ConfirmCodeForm;
