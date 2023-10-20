import React, { useState } from "react";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import CButton from "../AtomicComponents/CButton/CButton";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Auth.module.scss";
import { AuthStore } from "@/stores/AuthStore";
import { InputField } from "./SignUp";

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

  async function signIn({ username, password }: LoginParameters) {
    try {
      setReqLoading(true);
      const resp = await AuthStore.loginUser({
        password,
        username,
      });

      if (resp?.success) {
        toast.success("Login successful.");
        router.push("/home");
      } else {
        const errorMessage = resp.message || "Something went wrong.";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage =
        error.message || "Something went wrong. Please try again later.";
      toast.error(errorMessage);
    } finally {
      setReqLoading(false);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      signIn(values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <main className={styles.container}>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <header className={styles.form__header}>
            <h1>Log In Your account</h1>
          </header>
          <InputField
            id="username"
            type="text"
            displayName="Username"
            formik={formik}
          />
          <InputField
            id="password"
            type="password"
            displayName="Password"
            formik={formik}
          />
          <CButton label={"Log In"} type={"submit"} isLoading={reqLoading} />

          <Link href={"/signup"} className={styles.createAccount} type="button">
            Create an account
          </Link>
        </form>
      </main>
    </FormikProvider>
  );
};

export default Login;
