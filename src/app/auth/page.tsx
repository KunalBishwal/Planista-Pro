"use client";
import { useState } from "react";
import type React from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Import React Hook Form and Yup
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Define validation schema using Yup
const schema = yup.object({
    name: yup.string().when("$isLogin", {
        is: false,
        then: (schema) => schema.required("Name is required during sign-up"),
        otherwise: (schema) => schema,
    }),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required")
        .matches(/@gmail\.com$/, "Email must be a Gmail address"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one digit"),
}).required();

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  // Use React Hook Form with validation schema
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleAuth = async (data: any) => {
    if (isLogin) {
      const res = await signIn("credentials", { email: data.email, password: data.password, redirect: false });
      if (res?.error) {
        alert("Login failed: " + res.error);
      }
    } else {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        alert("Account created! You can log in now.");
        setIsLogin(true);
        reset();
      } else {
        alert("Error creating account");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFE6E2] relative overflow-hidden">
      {/* Background animations */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F9B4AB] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-[#F28179] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#D0584E] rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full z-10"
      >
        <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-[#B8473F]">
              {isLogin ? "Log in to your account" : "Create a new account"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleAuth)} className="space-y-4">
              {!isLogin && (
                <div>
                  <Label htmlFor="name" className="text-[#B8473F]">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    {...register("name")}
                    className="bg-white/50 border-[#F28179] text-[#B8473F]"
                  />
                  {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </div>
              )}
              <div>
                <Label htmlFor="email" className="text-[#B8473F]">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="bg-white/50 border-[#F28179] text-[#B8473F]"
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
              </div>
              <div>
                <Label htmlFor="password" className="text-[#B8473F]">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="bg-white/50 border-[#F28179] text-[#B8473F]"
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
              </div>
              <Button type="submit" className="w-full bg-[#F28179] hover:bg-[#D0584E] text-white">
                {isLogin ? "Log in" : "Sign up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-[#B8473F]">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 font-medium underline text-[#F28179] hover:text-[#D0584E]"
              >
                {isLogin ? "Sign up" : "Log in"}
              </button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
