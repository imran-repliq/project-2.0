import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Procurement",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="px-2 lg:px-0 bg-[#f9f9f9]">{children}</main>
      </body>
    </html>
  );
}
