"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';

// Định nghĩa kiểu cho user
interface User {
  email: string;
  password: string;
}

export function SigninForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [user, setUser] = useState<User>({
    email: "",
    password: ""
  });

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log(response.data);
      toast.success("Login successfully!");
      router.push('/home');
    } catch (error: any) {
      console.log("Login failed!", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.password.length > 0 && user.email.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={(e) => e.preventDefault()}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">{loading ? 'Processing' : 'Login'}</CardTitle>
            <CardDescription>
              Enter your details to sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user.email}
                placeholder="email"
                type="text"
                onChange={(e) => setUser({
                  ...user,
                  email: e.target.value
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={user.password}
                placeholder="password"
                type="password"
                onChange={(e) => setUser({
                  ...user,
                  password: e.target.value
                })}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button
              className="w-full"
              onClick={onLogin}
              disabled={buttonDisabled}
            >
              Login
            </button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline ml-2" href="/signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
