"use client";
import Image from "next/image";
import AuthLayout from "./layouts/AuthLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninFields } from "@/types/types";
import { SignInSchema } from "@/lib/AuthValidation";
import AuthButton from "@/components/ui/AuthButton/AuthButton";
import ErrorMessage from "@/components/ErrorMessage";

export default function Home() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFields>({ resolver: zodResolver(SignInSchema) });

  const onSubmit: SubmitHandler<SigninFields> = async (data) => {
    console.log(data);

    router.push("/dashboard");
  };

  return (
    <>
      <AuthLayout title="Sign in to manage" subTitle="Enter your details below">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email" className="text-xl text-[#395E66] font-bold">
              Email Address
            </Label>
            <Input
              {...register("email")}
              type="email"
              id="email"
              placeholder="Type here"
              className="py-6"
            />
          </div>

          <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
            <div className="flex justify-between items-center">
              <Label
                htmlFor="password"
                className="text-xl text-[#395E66] font-bold"
              >
                Password
              </Label>
              <Link
                className="font-bold text-[#395E66]"
                href={"/forget-password"}
              >
                forget password?
              </Link>
            </div>
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
            {errors?.email?.message || errors?.password?.message ? (
              <ErrorMessage
                text={errors?.email?.message || errors?.password?.message}
              />
            ) : null}
          </div>
          <AuthButton buttonTitle={"Sign In"} />
        </form>
      </AuthLayout>
    </>
  );
}

