import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VerbavoAPI",
  description: "Convert speech from one language to another seamlessly with Verbavo API",
};

/**
 * Root layout component for the application.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {React.JSX.Element} A React element representing the root HTML structure with providers, navbar, and child components.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <Providers>
        <Navbar/>
        {children}
       </Providers>
      </body>
    </html>
  );
}
