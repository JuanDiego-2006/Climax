import Link from "next/link";
import type { ReactNode } from "react";
import { IconLeaf } from "@/components/icons";
import styles from "./auth.module.css";

type AuthMode = "login" | "registro";

interface AuthShellProps {
  mode: AuthMode;
  children: ReactNode;
}

export default function AuthShell({ mode, children }: AuthShellProps) {
  return (
    <main className={styles.page}>
      <div className={styles.decorTop} aria-hidden />
      <div className={styles.decorBottom} aria-hidden />

      <section className={styles.container}>
        <header className={styles.brand}>
          <span className={styles.logo}>
            <IconLeaf />
          </span>
          <h1>Climax</h1>
          <p>Sistema de alertas climáticas · Chiapas</p>
        </header>

        <nav className={styles.tabs} aria-label="Acceso a la cuenta">
          <Link
            href="/"
            className={mode === "login" ? styles.activeTab : styles.tab}
          >
            Iniciar sesión
          </Link>
          <Link
            href="/registro"
            className={mode === "registro" ? styles.activeTab : styles.tab}
          >
            Registrarse
          </Link>
        </nav>

        {children}

        <footer className={styles.footer}>
          © 2026 Climax · Chiapas, México
        </footer>
      </section>
    </main>
  );
}
