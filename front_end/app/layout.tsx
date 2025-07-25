import type { Metadata } from "next";
import "./globals.css";
import { Header } from "./components/ui/header";
import { Roboto } from "next/font/google";
import TopLoader from "./components/ui/topLoader";
import { AuthProvider } from "./contexts/AuthContext";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ambiciente",
  description:
    "Digital platform dedicated to environmental care and preservation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="box-border w-screen">
        <div className={`${roboto.className}`}>
          <AuthProvider>
            <Header />
            <TopLoader />
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
