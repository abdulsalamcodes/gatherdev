import React, { useState } from "react";
import { Card, useTheme } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import * as Yup from "yup";
import { Amplify, Auth, Hub } from "aws-amplify";
import { FormikProvider, useFormik } from "formik";
import CButton from "../AtomicComponents/CButton";
import awsconfig from "../../aws-exports";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./Auth.module.scss";

Amplify.configure({ ...awsconfig, ssr: true });

type LoginParameters = {
  username: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const initialValues: LoginParameters = {
  password: "",
  username: "",
};

const Login = () => {
  const { tokens } = useTheme();
  const [reqLoading, setReqLoading] = useState(false);
  const router = useRouter();

  type SignInParameters = {
    username: string;
    password: string;
  };

  async function signIn({ username, password }: SignInParameters) {
    try {
      setReqLoading(true);
      const user = await Auth.signIn(username, password);
      Auth.rememberDevice();
      if (user) {
        localStorage.setItem(
          "currentUserId",
          JSON.stringify(user.attributes.sub)
        );
        router.push("/home");
        toast.success("Login successful");
      }
    } catch (error: any) {
      if (error.name === "UserNotFoundException") {
        toast.error("User does not exist, Please sign up.");
        return;
      }
      console.log("[LOGININ ERROR]", error);
      toast.error(error || "Login failed, please try again.");
    } finally {
      setReqLoading(false);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Values", values);
      signIn(values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <main className={styles.container}>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <header className={styles.form__header}>
            <h1 className={`${styles.textCenter}`}>Log In Your account</h1>
          </header>
          <label htmlFor="username" className={styles.form__input}>
            <span>Username</span>
            <input
              type="text"
              id="username"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <p className={`text-red-500`}>{formik.errors.username}</p>
            )}
          </label>
          <label htmlFor="password" className={styles.form__input}>
            <span>Password</span>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className={`text-red-500`}>{formik.errors.password}</p>
            )}
          </label>
          <CButton
            label={"Access"}
            // @ts-ignore
            type={"submit"}
            isLoading={reqLoading}
          />

          <Link href={"/signup"} className={styles.createAccount} type="button">
            Create an account
          </Link>
        </form>
      </main>
    </FormikProvider>
  );
};

export default Login;
