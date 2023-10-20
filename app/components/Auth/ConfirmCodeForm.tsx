"use client";

import React, { useState } from "react";
import VerificationInput from "react-verification-input";
import CButton from "../AtomicComponents/CButton/CButton";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
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
  function listenToAutoSignInEvent() {}

  type ConfirmSignUpParameters = {
    username: string;
    code: string;
  };

  async function confirmSignUp({ username, code }: ConfirmSignUpParameters) {}

  type ResendConfCodeParameters = {
    username: string;
  };
  async function resendConfirmationCode({
    username,
  }: ResendConfCodeParameters) {}

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
