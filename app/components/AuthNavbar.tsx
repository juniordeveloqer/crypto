"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./logoutbutton";
import { UseAuthContext } from "@/hooks/UseAuthContext";
import logo from "@/public/images/Group.svg";
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { state } = UseAuthContext(); // Destructure state from context
  const { user } = state; // Extract user from state
  const pathname = usePathname(); // Get the current pathname

  // Check if the current route is /nftrankings/{slug}
  const isNftRankingsPage = pathname.startsWith('/nftrankings/') && pathname.split('/').length === 3;

  return (
    <div className={`h-16 ${isNftRankingsPage ? "bg-transparent" : "bg-BackgroundPrimary"} transition-all fixed top-0 left-0 right-0 z-20`}>
      <div className="flex justify-between items-center w-navbar max-w-[1036px] h-full mx-auto">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center">
            <Image
              src={logo}
              alt="Picture of the logo"
              priority
              style={{ width: "30px", height: "auto" }}
            />
            <span className="text-textPrimary text-center text-xl font-semibold pl-2 mt-1">
              COLD
            </span>
          </div>
        </Link>
        {/* Buttons */}
        {!user && (
          <div className="flex gap-4">
            <button className="text-button-Text bg-button-Primary hover:bg-button-Hover hover:border-b-button-HoverSecondary border-b-4 rounded-md border-b-button-Secondary px-6 py-1.5 text-xs font-semibold">
              <Link href="/signup">signup</Link>
            </button>
            <button className="text-button-Text bg-button-Primary hover:bg-button-Hover hover:border-b-button-HoverSecondary border-b-4 rounded-md border-b-button-Secondary px-6 py-1.5 text-xs font-semibold">
              <Link href="/login">Login</Link>
            </button>
          </div>
        )}
        {/* LOGOUT */}
        <div className="flex gap-4">
          {user ? (
            <>
              <span className="text-textPrimary mt-1">{user.email}</span>
              <LogoutButton />
            </>
          ) : (
            <span className="text-textPrimary mt-1">User not logged in</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
