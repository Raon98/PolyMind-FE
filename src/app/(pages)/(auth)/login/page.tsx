import { Suspense } from "react";
import LoginLayout from "./layout";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginLayout />
    </Suspense>
  );
}
