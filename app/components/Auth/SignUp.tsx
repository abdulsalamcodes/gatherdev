"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import CButton from "../AtomicComponents/CButton/CButton";
import Link from "next/link";
import styles from "./Auth.module.scss";
import { useRouter } from "next/navigation";
import { AuthStore } from "@/stores/AuthStore";
import { toast } from "react-toastify";

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  fullname: string;
};

export const InputField = ({
  id,
  type = "text",
  displayName,
  formik,
}: {
  id: keyof SignUpParameters;
  displayName: string;
  type: "text" | "password" | "email";
  formik: any;
}) => {
  return (
    <label htmlFor={id} className={styles.form__input}>
      <span>{displayName}</span>
      <input
        type={type}
        id={id}
        {...formik.getFieldProps(id)}
        value={formik.values[id]}
      />
      {formik.touched[id] && formik.errors[id] && (
        <p className={styles.errorText}>{formik.errors[id]}</p>
      )}
    </label>
  );
};

// Validation Rules
const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Provided Email not valide")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

// Initial Values.
const formInitialValues = {
  email: "",
  password: "",
  username: "",
  fullname: "",
};

const SignUp = () => {
  const [reqLoading, setReqLoading] = useState(false);
  const router = useRouter();

  // Formik configuration
  const formik = useFormik({
    initialValues: formInitialValues,
    validationSchema,
    onSubmit: (values) => {
      signUp(values);
    },
  });

  async function signUp({
    username,
    password,
    email,
    fullname,
  }: SignUpParameters) {
    try {
      setReqLoading(true);
      const resp = await AuthStore.registerUser({
        username,
        password,
        email,
        fullname,
      });

      if (resp.success) {
        toast.success("Account created successfully.");
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

  return (
    <FormikProvider value={formik}>
      <main className={styles.container}>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <header className={styles.form__header}>
            <h1>Create An Account On Codesphere</h1>
          </header>
          <InputField
            id="fullname"
            type="text"
            displayName="Full Name"
            formik={formik}
          />
          <InputField
            id="username"
            type="text"
            displayName="Username"
            formik={formik}
          />
          <InputField
            id="email"
            type="email"
            displayName="Email"
            formik={formik}
          />
          <InputField
            id="password"
            type="password"
            displayName="Password"
            formik={formik}
          />
          <CButton label={"Sign Up"} type={"submit"} isLoading={reqLoading} />

          <Link href={"/login"} className={styles.createAccount} type="button">
            Already have an account? Please login.
          </Link>
        </form>
      </main>
    </FormikProvider>
  );
};

export default SignUp;
