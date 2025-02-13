"use client";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authApi } from "@/services/api";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const registerSchema = yup.object({
  firstName: yup.string().min(2, "First name must be at least 2 characters").required("Required"),
  lastName: yup.string().min(2, "Last name must be at least 2 characters").required("Required"),
  email: yup
  .string()
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    "Invalid email format"
  )
  .required("Required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Required"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), undefined], "Passwords must match").required("Required"),
  userType: yup.string().oneOf(["creator", "brand"]).required(),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      userType: "creator",
    },
  });

  const userType = watch("userType");

  const registerMutation = useMutation({
    mutationFn: (data: RegisterFormData) => {
      // const registerData = {
      //   firstName: data.firstName,
      //   lastName: data.lastName,
      //   email: data.email,
      //   password: data.password,
      //   userType: data.userType,
      // };
      // return authApi.register(registerData);
      return Promise.resolve({ success: true });
    },
    onSuccess: () => {
      router.push("/questionnaire?userType=" + userType);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Register</h2>
      </CardHeader>
      <CardContent>
        <Tabs
          value={userType}
          className="w-full"
          onValueChange={(value) =>
            setValue("userType", value as "creator" | "brand")
          }
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="creator">Creator</TabsTrigger>
            <TabsTrigger value="brand">Brand</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="First Name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Last Name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Register"
              )}
            </Button>
            <p className="text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Login
              </Link>
            </p>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
}
