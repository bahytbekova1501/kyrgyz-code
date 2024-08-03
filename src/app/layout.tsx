"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className="font-sans">
          {/* <div className="container */}
          <Navbar />
          <div className="content">{children}</div>
          {/* </div> */}
          <Footer />
        </body>
      </Provider>
    </html>
  );
}
