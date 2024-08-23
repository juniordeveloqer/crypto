import { useState } from "react";
import { UseAuthContext } from "./UseAuthContext";

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = UseAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: 'include', // Cookie'leri göndermek için

        },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const json = await response.json();

        if (!response.ok) {
          setIsLoading(false);
          setError(json.error);
          console.log("Login failed:", json.error);
          return;
        }

        // Giriş başarılı, token'ı kaydedin
        localStorage.setItem("user", JSON.stringify(json));
        console.log("Storing user data in localStorage:", json);

        // `dispatch` ile login aksiyonu gönder
        dispatch({ type: "LOGIN", payload: json });
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
      console.log("Failed to login:", err);
    }
  };

  return { login, isLoading, error };
};
