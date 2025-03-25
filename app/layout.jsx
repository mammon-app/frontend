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
  openGraph: {
    title: "Mammon App",
    description: "With Mammon App, you can turn your crypto into cash",
    type: "website",
    url: "https://www.mammonapp.com",
    images: [
      {
        url: "https://www.mammonapp.com/images/mammon-app-favicon.svg", 
        width: 512,
        height: 512,
        alt: "Mammon App Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mammon App",
    description: "With Mammon App, you can turn your crypto into cash",
    images: ["https://www.mammonapp.com/images/mammon-app-favicon.svg"],
  },
};


// Define the RootLayout component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <meta property="og:title" content="Mammon App" />
        <meta property="og:description" content="With Mammon App, you can turn your crypto into cash" />
        <meta property="og:image" content="https://www.mammonapp.com/images/mammon-app-favicon.svg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.mammonapp.com" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mammon App" />
        <meta name="twitter:description" content="With Mammon App, you can turn your crypto into cash" />
        <meta name="twitter:image" content="https://www.mammonapp.com/images/mammon-app-favicon.svg" />

      <link rel="icon" href="./images/mammon-app-favicon.svg" sizes="any" />
      <body className={helveticaNeue.className}>{children}</body>
    </html>
  );
}
