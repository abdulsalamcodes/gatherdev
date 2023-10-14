import { FormikContextType, FormikErrors } from "formik";
import React from "react";

type Props = {
  formik: FormikContextType<any>,
};

export default function CInput({ formik }: Props) {
  return (
    <label htmlFor="password" className="block mb-5">
      <span className="text-white">Password</span>
      <input
        type="password"
        id="password"
        className="mt-1 px-4 py-2 block w-full rounded bg-gray-900 text-white border border-gray-700"
        {...formik.getFieldProps("password")}
      />
      {formik.touched.password && formik.errors.password && (
        // @ts-ignore
        <p className="text-red-500">{formik.errors.password}</p>
      )}
    </label>
  );
}
