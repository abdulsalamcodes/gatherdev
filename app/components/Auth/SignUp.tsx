"use client";
import React, { useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import * as Yup from "yup";
import { Amplify, Auth } from "aws-amplify";
import { FormikProvider, useFormik } from "formik";
import CButton from "../AtomicComponents/CButton/CButton";
import awsconfig from "../../aws-exports";
import { toast } from "react-toastify";
import Link from "next/link";
import styles from "./Auth.module.scss";
import BgWrap from "../AtomicComponents/BgWrap/BgWrap";
import { useRouter } from "next/navigation";

Amplify.configure({ ...awsconfig, ssr: true });

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const initialValues: SignUpParameters = {
  email: "",
  password: "",
  username: "",
};

const SignUp = () => {
  const [reqLoading, setReqLoading] = useState(false);
  const router = useRouter();

  async function signUp({ username, password, email }: SignUpParameters) {
    try {
      setReqLoading(true);
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
        autoSignIn: {
          enabled: true,
        },
      });
      if (user) {
        router.push(`/confirm-account?username=${username}`);
      }
      console.log("Values", user);
    } catch (error: any) {
      toast.error(
        error.name === "UsernameExistsException" &&
          "User already exists, please login"
      );
      console.log("error signing up:", error);
    }
    setReqLoading(false);
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Values", values);
      signUp(values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <main className={styles.container}>
        <BgWrap />
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <header className={styles.form__header}>
            <h1>Create An Account On Codesphere</h1>
          </header>
          <label htmlFor="email" className={styles.form__input}>
            <span className="text-white mb-3">Email</span>
            <input type="email" id="email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email && (
              <p className={styles.errorText}>{formik.errors.email}</p>
            )}
          </label>
          <label htmlFor="username" className={styles.form__input}>
            <span className="text-white mb-3">Username</span>
            <input
              type="text"
              id="username"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <p className={styles.errorText}>{formik.errors.username}</p>
            )}
          </label>

          <label htmlFor="password" className={styles.form__input}>
            <span className="text-white mb-3">Password</span>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className={styles.errorText}>{formik.errors.password}</p>
            )}
          </label>
          <CButton
            label={"Sign Up"}
            // @ts-ignore
            type={"submit"}
            isLoading={reqLoading}
          />

          <Link href={"/login"} className={styles.createAccount} type="button">
            Already have an account? Please login.
          </Link>
        </form>
      </main>
    </FormikProvider>
  );
};

export default SignUp;
