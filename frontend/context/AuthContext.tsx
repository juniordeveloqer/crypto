"use client";

import { createContext, useReducer, ReactNode, useEffect } from "react";

// Tanımlamaları yapalım
type User = { email: string }; // Kullanıcı veri yapısı
type State = { user: User | null }; // State yapısı

// Action türleri
type Action = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

// Context tipi
type ContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

// Varsayılan state
const initialState: State = { user: null };

// Reducer fonksiyonu
const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

// AuthContext'i oluştur
export const AuthContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});

// AuthContextProvider bileşeni
type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  console.log("Authcontext state", state);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
