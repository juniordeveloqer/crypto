import { UseAuthContext } from "./UseAuthContext";

export const Uselogout = () => {
  const { dispatch } = UseAuthContext();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
