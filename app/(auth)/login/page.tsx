"use client";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import EmailIcon from "@/public/icons/Email-username.svg";
import PasswordIcon from "@/public/icons/password.svg";
import { useLogin } from "@/hooks/UseLogin";
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form submitted with email:", email, "password:", password);
    await login(email, password);
    console.log("Login process finished");

    // Başarılı giriş sonrası yönlendirme
    if (!error) {
      router.push('/'); // Ana sayfaya yönlendir
    }
  };

  return (
    <section>
      <div className="text-3xl text-button-Text"></div>
      <div className="items-center align-middle justify-center flex relative">
        <form
          className="absolute items-center justify-center pb-24"
          onSubmit={handleSubmit}
        >
          {/* LOGO */}
          <div className="flex items-center justify-center pb-[27px]">
            <Image
              src="/images/groupblack.svg"
              width={500}
              height={500}
              alt="Picture of the logo"
              priority
              style={{ width: "40px", height: "auto" }}
            />
            <span className="text-Primary text-center text-[24px] font-semibold pl-1 mt-1">
              COLD
            </span>
          </div>
          {/* Text */}
          <span className="text-[15px] text-Primary flex justify-center text-center font-semibold pb-11">
            Login to track your favorite coin
            <span className="text-button-HoverSecondary pl-1">easily</span>
          </span>
          {/* Input fields */}
          <div className="flex flex-col gap-4">
            {/* Email input */}
            <div className="relative block">
              <span className="sr-only">Email</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Image src={EmailIcon} alt="EmailIcon" />
              </span>
              <input
                className="placeholder:font-semibold placeholder:text-slate-400 placeholder:text-[15px] block bg-PlaceholderColor w-full rounded-sm py-3 pl-11 pr-16 shadow-sm"
                placeholder="Email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            {/* Password input */}
            <label className="relative block">
              <span className="sr-only">Password</span>
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <Image src={PasswordIcon} alt="PasswordIcon" />
              </span>
              <input
                className="placeholder:text-slate-400 placeholder:font-semibold placeholder:text-[15px] bg-PlaceholderColor w-full rounded-sm py-3 pl-11 pr-16 shadow-sm"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>
          </div>
          {/* Login Button */}
          <div className="relative pt-[30px] justify-center flex">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-grow text-Secondary font-semibold justify-between text-[15px] text-center py-3 bg-button-Login rounded-sm"
            >
              Log in
            </button>
            {error && <div>{error}</div>}
          </div>
        </form>
        <Image
          src="/images/authpage.svg"
          alt="Auth background svg"
          width={500}
          height={500}
          style={{ width: "850px", height: "auto", marginLeft: "23px" }}
          priority
        />
      </div>
    </section>
  );
};

export default Login;
