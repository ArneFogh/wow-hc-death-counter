import localFont from "next/font/local";
import { Open_Sans } from "next/font/google";
import "./globals.css";

// LifeCraft font til overskrifter
const lifeCraft = localFont({
  src: "./fonts/LifeCraft_Font.ttf",
  variable: "--font-life-craft",
  weight: "400",
  style: "normal",
});

// Open Sans font til data og indhold
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "700"], // Normal og fed tekst
});

export const metadata = {
  title: "Mayo death counter",
  description: "A list of team mayo deaths",
  icons: {
    icon: "/mayocounter.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${lifeCraft.variable} ${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
