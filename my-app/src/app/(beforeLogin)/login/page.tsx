/**
 * 서버 클라이언트로 리다이렉트 할 시엔 인터셉팅 라우트가 제대로 안되는 이슈 발생
 */
// import { redirect } from "next/navigation";

// export default function Login() {
//   redirect("/i/flow/login");
// }

"use client";

import { useRouter } from "next/navigation";
import Main from "@/app/(beforeLogin)/_component/Main";

export default function Login() {
  const router = useRouter();

  router.replace("/i/flow/login");
  return <Main />;
}
