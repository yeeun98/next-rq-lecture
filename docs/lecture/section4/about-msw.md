# MSW (Mock Service Worker)

## 1) 설치

```bash
# 패키지 설치 (v2 기준)
npm i -D msw

# 서비스 워커 파일 생성 (public/에 msw.js 생성)
npx msw init public/ --save
```

> 공식 문서: [https://mswjs.io/](https://mswjs.io/)

<br/>

## 2) 버전/임포트 규칙

- **v1**: `import { setupWorker } from 'msw'`
- **v2**: `import { setupWorker } from 'msw/browser'`
- Node(테스트) 환경: `import { setupServer } from 'msw/node'`

> `msw/browser`는 브라우저 전용이므로 **서버 코드(RSC)** 에서 임포트 금지 !!

<br/>

## 3) Next.js(App Router) 통합 가이드 (v2)

**파일 구조 예시**

```
src/
  mocks/
    browser.ts
    handlers.ts
    http.ts
app/
  layout.tsx
  _component/
    MSWComponent.tsx
```

### 3-1) 핸들러 정의

```ts
// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const handlers = [
  ...,
  http.post(`${baseUrl}/api/users`, async ({ request }) => {
    console.log("회원가입");
    return HttpResponse.text(JSON.stringify("ok"), {
      headers: {
        "Set-Cookie": "connect.sid=msw-cookie;HttpOnly;Path=/",
      },
    });
  }),
];
```

### 3-2) 브라우저 전용 워커

```ts
// src/mocks/browser.ts
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

export default worker;
```

### 3-3) MSWProvider 컴포넌트 생성

```tsx
// app/_component/MSWComponent.tsx
"use client";

import { Suspense, use } from "react";
import { handlers } from "@/mocks/handlers";

const mockingEnabledPromise =
  typeof window !== "undefined"
    ? import("@/mocks/browser").then(async ({ default: worker }) => {
        await worker.start({
          onUnhandledRequest(request, print) {
            if (request.url.includes("_next")) {
              return;
            }
            print.warning();
          },
        });
        worker.use(...handlers);
      })
    : Promise.resolve();

export function MSWProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  );
}

function MSWProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  use(mockingEnabledPromise);
  return children;
}
```

### 3-4) 레이아웃에 안전하게 삽입(SSR 제외)

```tsx
// app/layout.tsx
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MSWProvider>{children}</MSWProvider>
      </body>
    </html>
  );
}
```

### 3-5) 환경변수(.env.local)

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
```

<br/>

## 4) 커맨드 모음

```bash
# 설치
npm i -D msw

# 서비스 워커 파일 생성/업데이트
npx msw init public/ --save
```
