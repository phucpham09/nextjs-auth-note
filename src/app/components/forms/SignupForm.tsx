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

interface User {
  email: string,
  password: string,
  username: string
}

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    username: ""
  });
    const onSignup = async () =>{
      try {
          setLoading(true);
          const response = await axios.post('/api/users/signup', user);
          console.log("Signup successfully", response.data);

          router.push("/login");
      } catch (error: any) {
          console.log("Signup failed!", error.message);
          toast.error(error.message);
      } finally{
          setLoading(false)
      }
  }

    useEffect(() =>{
        if(user.password.length > 0 && user.email.length > 0 && user.username.length > 0){
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    }, [user])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={(e) => e.preventDefault()}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">{loading? 'Processing' : 'Signup'}</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id='username'
                value={user.username}
                placeholder='username'
                type='text'
                onChange={(e) => setUser({
                    ...user,
                    username: e.target.value
                })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id='email'
                value={user.email}
                placeholder='email'
                type='text'
                onChange={(e) => setUser({
                    ...user,
                    email: e.target.value
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id='password'
                value={user.password}
                placeholder='password'
                type='text'
                onChange={(e) => setUser({
                    ...user,
                    password: e.target.value
                })}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button onClick={onSignup}
            className="w-full"
            disabled={buttonDisabled}>
           Sign up</button>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="underline ml-2" href="/login">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}