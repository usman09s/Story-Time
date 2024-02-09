"use client";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AuthLayout from "../layouts/AuthLayout";
import AuthButton from "@/components/ui/AuthButton/AuthButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResetPasswordSchema } from "@/lib/AuthValidation";
import { ResetPassword } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ErrorMessage";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPassword>({ resolver: zodResolver(ResetPasswordSchema) });

  const onSubmit: SubmitHandler<ResetPassword> = async (data) => {
    console.log(data);
  };
  return (
    <>
      <AuthLayout title="Reset Password" subTitle="Enter your details below">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="password"
              className="text-xl text-[#395E66] font-bold"
            >
              New Password
            </Label>
            <div className="relative">
              <Input
                {...register("password")}
                type="password"
                id="password"
                placeholder="Type here"
                className="py-6 px-10"
              />
              <Image
                src={"/assets/lock.svg"}
                alt="Lock Icon"
                width={20}
                height={50}
                className="absolute top-3 left-3"
              />
            </div>
          </div>

          <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
            <Label
              htmlFor="cpassword"
              className="text-xl text-[#395E66] font-bold"
            >
              Retype New Password
            </Label>
            <div className="relative">
              <Input
                {...register("confirmPassword")}
                type="password"
                id="cpassword"
                placeholder="Type here"
                className="py-6 px-10"
              />
              <Image
                src={"/assets/lock.svg"}
                alt="Lock Icon"
                width={20}
                height={50}
                className="absolute top-3 left-3"
              />
            </div>
          </div>
          {errors?.password?.message || errors?.confirmPassword?.message ? (
            <ErrorMessage
              text={errors?.confirmPassword?.message ?? errors?.password?.message ?? ""}
            />
          ) : null}
          <AuthButton buttonTitle={"Sign In"} />
        </form>
      </AuthLayout>
    </>
  );
}
