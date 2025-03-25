import { Red_Hat_Mono } from "next/font/google";
import "./globals.css";

// Import Red Hat Mono font with desired subsets
const redHatMono = Red_Hat_Mono({ subsets: ["latin"] });

// Define the font-family style for Helvetica Neue
const helveticaNeue = {
  className: "helvetica-neue",
};

// Set up metadata for the application
export const metadata = {
  title: "Mammon App",
  description: "With Mammon App, you can turn your crypto into cash",
};

// Define the RootLayout component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="./images/mammon-finance-favicon.svg" sizes="any" />
      <body className={helveticaNeue.className}>{children}</body>
    </html>
  );
}
