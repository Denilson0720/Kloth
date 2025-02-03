import type { Metadata } from "next";
import NavBar from "./ui/navbar";
import Footer from "./ui/footer";
// import "./globals.css";
import './ui/globals.css'
import { opensans } from "./ui/fonts";


export const metadata: Metadata = {
  title: "Kloth",
  description: "The future of everyday wear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${opensans.className} antialiased relative`}
      >
          <NavBar/>
            {children}
          <Footer/>
  
      </body>
    </html>
  );
}
