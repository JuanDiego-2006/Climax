import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export default function Home() {
  return (
    <AuthShell mode="login">
      <LoginForm />
    </AuthShell>
  );
}
