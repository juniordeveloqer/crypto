import { UseAuthContext } from "./UseAuthContext";

export const Uselogout = () => {
  const { dispatch } = UseAuthContext();

  const logout = async () => {
    try {
      // Çıkış işlemini sunucu tarafında gerçekleştir
      await fetch('/api/user/logout', {
        method: 'POST',
      });
      // LocalStorage'dan kullanıcıyı sil
      localStorage.removeItem("user");
      // AuthContext'teki kullanıcıyı da çıkış yapmış olarak işaretle
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return { logout };
};
