
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Amplify } from "aws-amplify";

const fira_code = Fira_Code({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codesphere - Connect and Collaborate with Developers",
  description:
    "Join Codesphere, the ultimate social network for developers, to connect, collaborate, and take your coding journey to new heights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={fira_code.className}>
        {/* <Providers> */}
          <Navbar />
          {children}
        {/* </Providers> */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}
