import { useState } from "react";
import { useRouter } from 'next/navigation'
import { UseAuthContext } from "./UseAuthContext";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = UseAuthContext();
  const router = useRouter(); // Router'ı kullanmak için ekledik

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const json = await response.json();

        if (!response.ok) {
          setIsLoading(false);
          setError(json.error || "Unknown error occurred");
          console.log("Login failed:", json.error);
          return;
        }

        // Giriş başarılı, token'ı localStorage'a kaydedin
        localStorage.setItem("user", JSON.stringify(json));
        console.log("Storing user data in localStorage:", json);

        // Auth context'i güncelle
        dispatch({ type: "LOGIN", payload: json });

        // Başarıyla giriş yaptıktan sonra yönlendirme yap
        router.push("/"); // Ana sayfaya yönlendir

        setIsLoading(false);
        console.log("Login successful");
      } else {
        setIsLoading(false);
        setError("Invalid response from server");
        console.log("Invalid response from server");
      }
    } catch (err) {
      setIsLoading(false);
      setError("Failed to login");
      console.error("Failed to login:", err);
    }
  };

  return { login, isLoading, error };
};
