"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { register } from "@/lib/api";
import PasswordField from "./PasswordField";
import styles from "./auth.module.css";

export default function RegisterForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form         = new FormData(e.currentTarget);
    const name         = String(form.get("name")         ?? "").trim();
    const lastName     = String(form.get("lastName")     ?? "").trim();
    const email        = String(form.get("email")        ?? "");
    const password     = String(form.get("password")     ?? "");
    const confirmation = String(form.get("confirmation") ?? "");

    if (password !== confirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);

    try {
      await register({ name, lastName, email, password });
      router.push("/clima");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo crear la cuenta.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={styles.card} aria-labelledby="register-title">
      <div className={styles.cardHeader}>
        <h2 id="register-title">Crear cuenta</h2>
        <p>Registra tus datos para acceder al sistema.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} action="#" noValidate>
        {/* Nombre — el backend espera "name" y "lastName" por separado */}
        <div className={styles.field}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Juan"
            autoComplete="given-name"
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="lastName">Apellido</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Pérez Hernández"
            autoComplete="family-name"
            required
            disabled={isLoading}
          />
        </div>

        {/* Correo */}
        <div className={styles.field}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="correo@ejemplo.mx"
            autoComplete="email"
            required
            disabled={isLoading}
          />
        </div>

        {/* Contraseña */}
        <PasswordField
          id="password"
          name="password"
          label="Contraseña"
          placeholder="Mínimo 6 caracteres"
          autoComplete="new-password"
          minLength={6}
        />

        {/* Confirmación de contraseña */}
        <PasswordField
          id="confirmation"
          name="confirmation"
          label="Confirmar contraseña"
          placeholder="Repite tu contraseña"
          autoComplete="new-password"
          minLength={6}
        />

        {/* Error del cliente o del backend */}
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
          {isLoading ? "Creando cuenta..." : "Crear cuenta"}
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
