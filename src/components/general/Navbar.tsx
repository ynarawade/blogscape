import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "../ui/button";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="flex justify-between items-center py-6 px-4 border-b">
      
      {/* Logo & Navigation */}
      <div className="flex items-center space-x-8">
        <Link href="/">
          <h1 className="text-2xl font-bold text-gray-900">
            Blog<span className="text-blue-600">scape</span>
          </h1>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            Home
          </Link>
          {user && (
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Auth Section */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <div className="flex items-center space-x-3">
            <RegisterLink className={buttonVariants({ variant: "ghost" })}>
              Sign Up
            </RegisterLink>
            <LoginLink className={buttonVariants()}>
              Login
            </LoginLink>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.picture || ''} alt={user.given_name || 'User'} />
              <AvatarFallback className="bg-blue-600 text-white text-sm">
                {user.given_name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <LogoutLink className={buttonVariants({ variant: "outline" })}>
              Logout
            </LogoutLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;