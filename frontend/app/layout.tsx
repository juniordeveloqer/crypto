import Navbar from "./components/Navbar";
import "./globals.css";
import titillium_Web from "./fonts";
import { AuthContextProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <html lang="en" className={`${titillium_Web.variable}`}>
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </AuthContextProvider>
  );
}
