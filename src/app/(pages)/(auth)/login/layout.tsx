"use client";
import { signIn } from "next-auth/react";

export default function LoginLayout() {
  const handleLogin = async () => {
    try {
      const result = await signIn("kakao", {
        redirect: false,
      });
      console.log(result);
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8">
        <h1 className="text-2xl font-bold text-center">로그인</h1>
        <button
          onClick={() => handleLogin()}
          className="w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg"
        >
          카카오로 로그인
        </button>
      </div>
    </div>
  );
}
