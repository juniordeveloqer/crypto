"use client";

import { useEffect } from "react";
import { UseAuthContext } from "@/hooks/UseAuthContext";
import HeroSection from "./components/hero";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const HomePage = ({ children }: { children: React.ReactNode }) => {
  const { state } = UseAuthContext(); // Destructure state from context
  const { user } = state; // Extract user from state

  useEffect(() => {
    if (!user) {
      redirect("http://localhost:3000/login");
    }
  }, [user]);

  return (
    <section className="bg-black h-lvh">
      <HeroSection />
    </section>
  );
};

export default HomePage;
