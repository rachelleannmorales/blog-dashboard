import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MuiThemeProvider from "@/providers/MuiThemeProvider";
import StoreProvider from '@/providers/StoreProvider';
import { Container } from "@mui/material";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog Dashboard",
  description: "Blog Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          <MuiThemeProvider>
            <Container 
              maxWidth="lg"
              sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}>
              {children}
            </Container>
          </MuiThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
