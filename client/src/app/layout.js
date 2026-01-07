import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CartDrawer from "@/components/cart/CartDrawer";
import AuthModal from "@/components/auth/AuthModal";

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: 'swap',
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "LUMIÈRE | Luxury Jewelry & Gifts",
  description: "Exquisite jewelry for the modern era.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
              <CartDrawer />
              <AuthModal />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
