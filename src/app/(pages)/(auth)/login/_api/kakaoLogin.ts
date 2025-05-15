import { z } from "zod";

const KakaoLoginResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_token: z.string(),
  refresh_token_expires_in: z.number(),
  scope: z.string(),
  token_type: z.string(),
});

export const kakaoLogin = async (code: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/api/kakao/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    },
  );

  if (response.ok) {
    console.log("response" + response);
    const json = await response.json();
    const validatedData = KakaoLoginResponseSchema.parse(json.data);
    return validatedData;
  }

  throw new Error("Failed to login with Kakao");
};
