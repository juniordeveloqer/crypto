import { useState } from "react";
import { UseAuthContext } from "./UseAuthContext";

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const { dispatch } = UseAuthContext();

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:4000/api/user/signup", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if the content type of the response is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      }

      if (response.ok) {
        //local storage
        localStorage.setItem("user", JSON.stringify(json));
        //update the auth context
        dispatch({ type: "LOGIN", payload: json });
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setError("Invalid response from server");
    }
  };

  return { signup, isLoading, error };
};
