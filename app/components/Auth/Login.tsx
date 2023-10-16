import React, { useState } from "react";
import "@aws-amplify/ui-react/styles.css";
import * as Yup from "yup";
import { Amplify, Auth } from "aws-amplify";
import { FormikProvider, useFormik } from "formik";
import CButton from "../AtomicComponents/CButton/CButton";
import awsconfig from "../../aws-exports";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Auth.module.scss";
import { AuthStore } from "@/stores/AuthStore";
import BgWrap from "../AtomicComponents/BgWrap/BgWrap";

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
  const [reqLoading, setReqLoading] = useState(false);
  const router = useRouter();

  type SignInParameters = {
    username: string;
    password: string;
  };

  function handleLoginSuccess(user: any) {
    toast.success(`Welcome back, ${user.username}!`);
    console.log("[LOGIN SUCCESS]", user);
  }

  function handleLoginError(error: any) {
    if (error.name === "UserNotFoundException") {
      toast.error("User does not exist, Please sign up.");
      return;
    }

    if (error.name === "UserNotConfirmedException") {
      router.push(`/confirm-account?username=${formik.values.username}`);
      return;
    }

    console.log("[LOGIN ERROR]", error.name);
    toast.error(error.message || "Login failed, please try again.");
  }

  async function signIn({ username, password }: SignInParameters) {
    try {
      setReqLoading(true);
      const user = await Auth.signIn(username, password);
      Auth.rememberDevice();
      if (user) {
        await AuthStore.loadCurrentUser(user.attributes.sub);
        handleLoginSuccess(user);
        router.push("/home");
      }
    } catch (error: any) {
      handleLoginError(error);
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
        <BgWrap />

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <header className={styles.form__header}>
            <h1>Log In Your account</h1>
          </header>
          <label htmlFor="username" className={styles.form__input}>
            <span>Username</span>
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
            <span>Password</span>
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
            label={"Log In"}
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
