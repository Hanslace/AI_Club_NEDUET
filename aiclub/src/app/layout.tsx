import type { Metadata } from "next";
import { Navbar , Footer} from "@/../components";

import { Poppins, Space_Grotesk } from "next/font/google";


const poppins = Poppins({
  subsets: ["latin"],          // latin is safest and fastest
  weight: ["400", "500", "600", "700"], // choose the weights you’ll use
  variable: "--font-poppins",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-spaceGrotesk",
  display: "swap",
});

import "./globals.css";



export const metadata: Metadata = {
  title: "AI Club",
  description: "A website showcasing our vibrant and dynamic AI Club here at NEDUET.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
