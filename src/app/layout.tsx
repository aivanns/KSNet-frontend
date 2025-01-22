'use client'

import { Montserrat } from "next/font/google";
import "@/shared/styles/globals.css";
import Providers from "@/shared/utils/providers/providers";
import { useEffect } from "react";
import { useUserStore } from "@/entities/user/model/store";

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { fetchUser } = useUserStore();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased bg-white`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
