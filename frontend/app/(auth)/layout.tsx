import Navbar from "../components/AuthNavbar";
import "../globals.css";
import titillium_Web from "../fonts";
import { AuthContextProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${titillium_Web.variable}`}>
      <body>
        <Navbar />
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
