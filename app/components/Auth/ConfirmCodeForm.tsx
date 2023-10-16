import React, { useState } from "react";
import VerificationInput from "react-verification-input";
import CButton from "../AtomicComponents/CButton/CButton";
import { API, Amplify, Auth, Hub } from "aws-amplify";
import { useRouter } from "next/navigation";
import { IUser } from "../../stores/AuthStore";
import { createUserInAppSync } from "@/utils";
import { toast } from "react-toastify";

type ConfirmSignUpParameters = {
  username: string;
  code: string;
};

type ResendConfCodeParameters = {
  username: string;
};
interface ConfirmCodeFormProp {
  formik: any;
  reqLoading: boolean;
  setReqLoading: (value: boolean) => null;
  setIsCodeSent: (value: boolean) => null;
}
const ConfirmCodeForm: React.FC<ConfirmCodeFormProp> = ({
  formik,
  reqLoading,
  setReqLoading,
  setIsCodeSent,
}) => {
  const [confirmCode, setConfirmCode] = useState("");
  const router = useRouter();

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
    </div>
  );
};

export default ConfirmCodeForm;
