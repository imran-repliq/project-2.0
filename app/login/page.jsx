"use client";

import Image from "next/image";
import { useState } from "react";

import HealthOsLogo from "../../public/assets/images/logo-text.png";

import { getAccessToken, getRefreshToken } from "@/common/helpers/HttpKit";
import FormikErrorBox from "@/components/shared/ui/FormikErrorBox";
import { Button } from "@/components/shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shared/ui/card";
import { Input } from "@/components/shared/ui/input";
import { Label } from "@/components/shared/ui/label";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { object, string } from "yup";

const yupSchema = object({
  phone: string()
    .required("Please enter your phone number")
    .min(10, "Phone number should be 11 characters without country code")
    .max(11, "Phone Number should not be more than 11 characters"),
  password: string()
    .required("Please enter a password")
    .min(6, "Password must be minimum 6 characters or more"),
});

export default function Page() {
  const router = useRouter();
  console.log({ access: getAccessToken(), refresh: getRefreshToken() });
  const [initialValues, setInitialValues] = useState({
    phone: "",
    password: "",
  });
  const formik = useFormik({
    initialValues,
    validationSchema: yupSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);

      const result = await signIn("credentials", {
        redirect: true,
        id: values.phone,
        password: values.password,
        callbackUrl: "/purchase",
      });
      // if (result.ok) {
      //   router.push("/purchase");
      // }
      console.log({ result });
    },
  });
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     phone: e.target.phone.value,
  //     password: e.target.password.value,
  //   };
  //   console.log(data);
  // };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div>
        <div className="block">
          <Image
            className=" mx-auto mb-4"
            src={HealthOsLogo}
            alt="Picture of the author"
            width={250}
            height={250}
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </div>
        <Card className="w-[380px]">
          <form onSubmit={formik.handleSubmit}>
            <CardHeader>
              <CardTitle className="text-center">Login</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="phone"
                    name="phone"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                    placeholder="e.g. 01xxxxxxxxx"
                  />
                  <FormikErrorBox formik={formik} field="phone" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder="Name of your project"
                  />
                  <FormikErrorBox formik={formik} field="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="">
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
