"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { login } from "@/lib/api";
import PasswordField from "./PasswordField";
import styles from "./auth.module.css";

export default function LoginForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const form     = new FormData(e.currentTarget);
    const email    = String(form.get("email")    ?? "");
    const password = String(form.get("password") ?? "");

    try {
      await login({ email, password });
      router.push("/clima");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={styles.card} aria-labelledby="login-title">
      <div className={styles.cardHeader}>
        <h2 id="login-title">Iniciar sesión</h2>
        <p>Ingresa tus credenciales para continuar.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} action="#" noValidate>
        {/* Campo de email */}
        <div className={styles.field}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="usuario@ejemplo.mx"
            autoComplete="email"
            required
            disabled={isLoading}
          />
        </div>

        {/* Campo de contraseña con toggle de visibilidad */}
        <PasswordField
          id="password"
          name="password"
          label="Contraseña"
          placeholder="••••••••"
          autoComplete="current-password"
        />

        {/* Mensaje de error del backend */}
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? "Entrando..." : "Entrar"}
          {!isLoading && <ArrowIcon />}
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
