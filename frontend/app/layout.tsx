import Navbar from "./components/Navbar";
import "./globals.css";
import titillium_Web from "./fonts";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${titillium_Web.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
