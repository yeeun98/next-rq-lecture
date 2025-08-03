# `searchParams` vs `useSearchParams()`

> Next.js에서 URL 쿼리스트링을 다루는 두 가지 방식은 사용하는 컴포넌트의 종류에 따라 달라진다.

---

## ✅ `searchParams` (props로 전달되는 방식)

```tsx
type Props = {
  searchParams: Promise<{ q: string; f?: string; pf?: string }>;
};

export default async function Search({ searchParams }: Props) { ... }
```

- **App Router 기반의 Server Component**에서 자동으로 전달되는 props이다.
- URL 쿼리 파라미터가 서버 렌더링 시점에 `searchParams`로 전달된다.
- 비동기 함수 내에서 `await searchParams`로 구조분해하거나, 바로 사용 가능
- 쿼리스트링은 자동으로 파싱된 객체 형태로 제공된다.

  예:

  - URL: `/search?q=hello&f=news`
  - `searchParams`: `{ q: "hello", f: "news" }`

### ⚠️ Next.js 15 기준 변경사항

- `searchParams`, `params`는 `Promise`로 제공되므로 **반드시 `await`을 사용해서 내부 속성에 접근**해야 한다.
  - 예전: `searchParams.q`
  - 지금: `(await searchParams).q`
- 해당 페이지가 **Client Component**라면 React 훅처럼 `use(searchParams)`, `use(params)`로 처리할 수 있다.  
  -> (예: `use(await searchParams)` → `const { q } = use(searchParams)`)

---

## ✅ `useSearchParams()` (클라이언트 컴포넌트 전용 훅)

```tsx
"use client";
import { useSearchParams } from "next/navigation";

const searchParams = useSearchParams();
const q = searchParams.get("q");
```

- **Client Component**에서만 사용 가능한 훅
- 브라우저에서 현재 URL의 쿼리 파라미터를 `URLSearchParams` 객체 형태로 반환한다.
- 리액트 상태나 유저 인터랙션에 따라 동적으로 값을 읽거나 반응할 수 있다.

---

## 🔍 비교 정리

| 항목      | `searchParams` (props)           | `useSearchParams()`                 |
| --------- | -------------------------------- | ----------------------------------- |
| 사용 위치 | Server Component                 | Client Component                    |
| 전달 방식 | 함수 인자(props)                 | 훅 호출                             |
| 실행 시점 | 서버 렌더링 시                   | 브라우저 렌더링 시                  |
| 반환 형태 | `{ [key: string]: string }` 객체 | `URLSearchParams` 객체              |
| 주 용도   | 초기 데이터 fetch, SSR           | 동적 렌더링, 클라이언트 사이드 반응 |

---

## 👉 언제 어떤 걸 써야 할까?

| 상황                                      | 사용 추천                 |
| ----------------------------------------- | ------------------------- |
| 검색 결과를 서버에서 바로 렌더링해야 함   | ✅ `searchParams` (props) |
| 쿼리스트링에 따라 UI가 동적으로 변해야 함 | ✅ `useSearchParams()`    |

---

[공식문서 - useSearchParams](https://nextjs.org/docs/app/api-reference/functions/use-search-params)
