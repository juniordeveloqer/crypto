import { useState } from "react";
import { UseAuthContext } from "./UseAuthContext";

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = UseAuthContext();

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/signup", { // `localhost:3000` kısmını kaldırdım; Next.js ortamında bu genellikle gerekmez
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // `credentials` ve `Authorization` başlıkları gerekli değilse kaldırabilirsiniz
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const json = await response.json();

        // Token'ı localStorage'a kaydet
        localStorage.setItem("user", JSON.stringify(json));
        console.log("Storing user data in localStorage:", json);

        // Auth context'i güncelle
        dispatch({ type: "LOGIN", payload: json });
      } else {
        const json = await response.json();
        setError(json.error || "Unknown error occurred");
      }
    } catch (err) {
      setError("Failed to signup");
      console.error("Failed to signup:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
