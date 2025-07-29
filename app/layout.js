"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { parseCookies, setCookie } from "nookies";
import { AuthProvider } from "../src/Context/AuthContext";
import styles from "./layout.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RootLayout({ children }) {
  const router = useRouter();
  const { token1 } = parseCookies();

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && !token1) {
      setCookie(undefined, "token1", "fake_token_teste");
      router.push("/");
    } else if (!token1) {
      router.push("/login");
    }
  }, []);

  return (
    <html suppressHydrationWarning>
      <body className={styles.root}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}