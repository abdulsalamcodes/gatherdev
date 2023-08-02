import React, { useState } from "react";
import { Card, useTheme } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import * as Yup from "yup";
import { API, Amplify, Auth, Hub } from "aws-amplify";
import { FormikProvider, useFormik } from "formik";
import CButton from "../AtomicComponents/CButton";
import awsconfig from "../../aws-exports";
import VerificationInput from "react-verification-input";
import { toast } from "react-toastify";
import Link from "next/link";
import * as mutations from "../../graphql/mutations";
import { useRouter } from "next/navigation";
import { IUser } from "@/stores/AuthStore";
import { createUserInAppSync } from "@/utils";

Amplify.configure({...awsconfig,ssr: true});

type SignUpParameters = {
  username: string;
  password: string;
  email: string;
};

type ConfirmSignUpParameters = {
  username: string;
  code: string;
};

type ResendConfCodeParameters = {
  username: string;
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
  const { tokens } = useTheme();
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");
  const [reqLoading, setReqLoading] = useState(false);
  const router = useRouter();

  const css = `
  .custom-card-class {
    background-color: #1e1e1e;
    border-radius: ${tokens.radii.medium};
  }`;

  function listenToAutoSignInEvent() {
    Hub.listen("auth", ({ payload }) => {
      const { event } = payload;
      if (event === "autoSignIn") {
        const user = payload.data;
        // assign user
        console.log("User Login successful::", user);
        if (user) {
          setIsCodeSent(false);
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
        setIsCodeSent(true);
      }
      console.log("Values", user);
    } catch (error: any) {
      toast.error(
        error.name === "UsernameExistsException" && "User already exists, please login"
      );
      console.log("error signing up:", error);
    }
    setReqLoading(false);
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
    } catch (err) {
      console.log("error resending code: ", err);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Values", values);
      signUp(values);
    },
  });

  const ConfirmCodeForm = () => {
    const handleComplete = () => {
      confirmSignUp({
        code: confirmCode,
        username: formik.values.username,
      });
    };

    return (
      <div className="flex flex-col items-center justify-center  bg-gray-black">
        <header className="">
          <h1 className="mb-5 text-center text-xl">Confirm Your Account</h1>
        </header>
        <style>{css}</style>
        <Card className="custom-card-class">
          <div className="flex flex-col gap-4 items-center mt-6">
            <VerificationInput
              validChars="0-9"
              autoFocus
              inputProps={{ inputMode: "numeric" }}
              onChange={(value) => setConfirmCode(value)}
              value={confirmCode}
            />
            <CButton
              label={"Sign Up"}
              isLoading={reqLoading}
              onClick={handleComplete}
            />
            <button
              className="text-white text-center text-sm  underline w-full hover:text-gray-100 pt-4 px-4"
              type="button"
              onClick={() =>
                resendConfirmationCode({
                  username: formik.values.username,
                })
              }
            >
              Resend confirmation code
            </button>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <FormikProvider value={formik}>
      {!isCodeSent ? (
        <div className="flex flex-col items-center p-5 justify-center bg-gray-black">
          <form className="w-full max-w-md" onSubmit={formik.handleSubmit}>
            <header className="">
              <h1 className="mb-5 text-center text-xl">
                Create An Account On Codesphere
              </h1>
            </header>
            <style>{css}</style>
            <Card className="custom-card-class">
              <label htmlFor="email" className="block mb-5">
                <span className="text-white mb-3">Email</span>
                <input
                  type="email"
                  id="email"
                  className="mt-1 px-4 py-2 block w-full rounded
                   outline-none
                   bg-gray-900 text-white border border-gray-700"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500">{formik.errors.email}</p>
                )}
              </label>
              <label htmlFor="username" className="block mb-5">
                <span className="text-white mb-3">Username</span>
                <input
                  type="text"
                  id="username"
                  className="mt-1 px-4 py-2 block w-full rounded
                   outline-none
                   bg-gray-900 text-white border border-gray-700"
                  {...formik.getFieldProps("username")}
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="text-red-500">{formik.errors.username}</p>
                )}
              </label>

              <label htmlFor="password" className="block mb-5">
                <span className="text-white mb-3">Password</span>
                <input
                  type="password"
                  id="password"
                  className="mt-1 px-4 py-2 block w-full
                   outline-none
                   rounded bg-gray-900 text-white border border-gray-700"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500">{formik.errors.password}</p>
                )}
              </label>
              <CButton
                label={"Sign Up"}
                // @ts-ignore
                type={"submit"}
                isLoading={reqLoading}
                // onClick={formik.handleSubmit}
              />

              <Link
                href={"/login"}
                className="text-white text-center text-sm  underline w-full hover:text-gray-100 pt-4 px-4"
                type="button"
              >
                Already have an account? Please login.
              </Link>
            </Card>
          </form>
        </div>
      ) : (
        <ConfirmCodeForm />
      )}
    </FormikProvider>
  );
};

export default SignUp;
