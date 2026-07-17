"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import PasswordField from "./PasswordField";
import styles from "./auth.module.css";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") ?? "");
    const confirmation = String(formData.get("passwordConfirmation") ?? "");

    if (password !== confirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError("");
    router.push("/clima");
  }

  return (
    <section className={styles.card} aria-labelledby="register-title">
      <div className={styles.cardHeader}>
        <h2 id="register-title">Crear cuenta</h2>
        <p>Registra tus datos para acceder al sistema.</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="fullName">Nombre completo</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Juan Pérez Hernández"
            autoComplete="name"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="registerEmail">Correo electrónico</label>
          <input
            id="registerEmail"
            name="email"
            type="email"
            placeholder="correo@ejemplo.mx"
            autoComplete="email"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="role">Rol</label>
          <select id="role" name="role" defaultValue="" required>
            <option value="" disabled>
              Selecciona un rol
            </option>
            <option value="agricultor">Agricultor</option>
            <option value="proteccion-civil">Protección Civil</option>
            <option value="ciudadano">Ciudadano</option>
          </select>
        </div>

        <PasswordField
          id="registerPassword"
          name="password"
          label="Contraseña"
          placeholder="Mínimo 6 caracteres"
          autoComplete="new-password"
          minLength={6}
        />

        <PasswordField
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="Confirmar contraseña"
          placeholder="Repite tu contraseña"
          autoComplete="new-password"
          minLength={6}
        />

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <button type="submit" className={styles.submitButton}>
          Crear cuenta
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
