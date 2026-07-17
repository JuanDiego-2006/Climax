"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import PasswordField from "./PasswordField";
import styles from "./auth.module.css";

export default function LoginForm() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/clima");
  }

  return (
    <section className={styles.card} aria-labelledby="login-title">
      <div className={styles.cardHeader}>
        <h2 id="login-title">Iniciar sesión</h2>
        <p>Ingresa tus credenciales para continuar.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="usuario@ejemplo.mx"
            autoComplete="email"
            required
          />
        </div>

        <PasswordField
          id="password"
          name="password"
          label="Contraseña"
          placeholder="••••••••"
          autoComplete="current-password"
        />

        <button type="submit" className={styles.submitButton}>
          Entrar
          <ArrowIcon />
        </button>
      </form>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" />
    </svg>
  );
}
