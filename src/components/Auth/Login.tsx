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

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: "us-east-2", // Replace with process.env.NEXT_PUBLIC_REGION
    userPoolId: "us-east-2_bBZvwUxqo", // Replace with process.env.NEXT_PUBLIC_USER_POOL_ID
    userPoolWebClientId: "7feods9m242qjnvrsp6healo68", // Replace with process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID
    cookieStorage: {
      domain: "localhost",
      secure: false, // Set to true if using https
      path: "/",
      sameSite: "strict",
      expires: 365, // Cookie expiry in days
    },
  },
  aws_appsync_graphqlEndpoint:
    "https://pjknaqntavd5tf3jfwobwlw72m.appsync-api.us-east-2.amazonaws.com/graphql",
  aws_appsync_region: "us-east-2",
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: "da2-pcgrdhfpsjg5himhp6mc3vueqe",
  oauth: {
    domain: "codespheredc73fdcb-dc73fdcb-dev.auth.us-east-2.amazoncognito.com",
    scope: [
      "phone",
      "email",
      "openid",
      "profile",
      "aws.cognito.signin.user.admin",
    ],
    redirectSignIn: "http://localhost:3000/",
    redirectSignOut: "http://localhost:3000/",
    responseType: "code",
  },
  federationTarget: "COGNITO_USER_POOLS",
  aws_cognito_username_attributes: [],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ["EMAIL"],
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: ["EMAIL"],
});

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

  const css = `
  .custom-card-class {
    background-color: #1e1e1e;
    border-radius: ${tokens.radii.medium};
  }`;

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
        if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
          const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
          const newPassword = "newPassword";
          const loggedInUser = await Auth.completeNewPassword(
            user, // the Cognito User Object
            newPassword, // the new password
            requiredAttributes
          );
          console.log(loggedInUser);
        }
        console.log("[LOGININ USER]", user);

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
      toast.error(error.message || "Login failed, please try again.");
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
      <div className="flex flex-col items-center p-5 justify-center bg-gray-black">
        <form className="w-full max-w-md" onSubmit={formik.handleSubmit}>
          <header className="">
            <h1 className="mb-5 text-center text-xl">Access your account </h1>
          </header>
          <style>{css}</style>
          <Card className="custom-card-class">
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
              label={"Access"}
              // @ts-ignore
              type={"submit"}
              isLoading={reqLoading}
              // onClick={formik.handleSubmit}
            />

            <Link
              href={"/signup"}
              className="text-white text-center text-sm  underline w-full hover:text-gray-100 pt-4 px-4"
              type="button"
            >
              Create an account
            </Link>
          </Card>
        </form>
      </div>
    </FormikProvider>
  );
};

export default Login;
