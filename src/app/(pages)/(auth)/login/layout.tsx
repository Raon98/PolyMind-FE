"use client";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { kakaoLogin } from "./_api/kakaoLogin";

function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      console.log("Received code:" + code);
      // 백엔드로 인증 코드 전송
      const sendCodeToBackend = async () => {
        const {
          expires_in,
          access_token,
          refresh_token,
          refresh_token_expires_in,
        } = await kakaoLogin(code);

        router.replace("/login");

        // 토큰 저장 로직
        const result = await signIn("credentials", {
          redirect: false,
          access_token: access_token,
          expires_in: expires_in,
          refresh_token: refresh_token,
          refresh_token_expires_in: refresh_token_expires_in,
        });
        console.log("result" + result);

        if (result?.ok) {
          router.push("/chat");
        } else {
          router.replace("/login");
        }
      };

      sendCodeToBackend();
    }
  }, [searchParams, router]);

  return null;
}

export default function LoginLayout() {
  const handleLogin = async () => {
    try {
      // 카카오 로그인 URL로 리다이렉션
      const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
      const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
      const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

      window.location.href = KAKAO_AUTH_URL;
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
      <Suspense fallback={<div>Loading...</div>}>
        <KakaoCallback />
      </Suspense>
    </div>
  );
}
