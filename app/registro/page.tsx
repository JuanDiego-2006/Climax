import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Crear cuenta | Climax",
};

export default function RegistroPage() {
  return (
    <AuthShell mode="registro">
      <RegisterForm />
    </AuthShell>
  );
}
