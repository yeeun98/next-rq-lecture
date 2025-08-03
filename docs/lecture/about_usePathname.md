# usePathname()

> usePathname은 현재 URL의 경로명을 읽을 수 있게 해주는 클라이언트 컴포넌트 훅이다.

- 서버 컴포넌트에서는 현재 URL을 읽는 것이 지원되지 않기에 반드시 `클라이언트 컴포넌트`에서 사용해야함.

---

## ✅ Returns

> `usePathname`은 현재 URL의 경로명을 나타내는 문자열을 반환한다.  
> ❗ **URL의 쿼리 스트링(query string)은 포함되지 않음**

| URL                 | 반환 값               |
| ------------------- | --------------------- |
| `/`                 | `'/'`                 |
| `/dashboard`        | `'/dashboard'`        |
| `/dashboard?v=2`    | `'/dashboard'`        |
| `/blog/hello-world` | `'/blog/hello-world'` |

---

## ✅ 활용 예시

### UI 조건부 렌더링

- `usePathname`을 사용하여 현재 위치한 경로를 판단하고, 특정 경로에서는 컴포넌트를 렌더링하지 않도록 설정할 수 있다.
- 예를 들어 `/explore`에서는 검색 필터 UI를 숨기고, `/search`에서는 필터 UI를 노출하는 방식으로 사용할 수 있다.

**예시 코드**

```tsx
"use client";

import { usePathname } from "next/navigation";
...

export default function RightSearchZone() {
  const pathname = usePathname();
  ...

  if (pathname === "/explore") return null;
  if (pathname === "/search") {
    return (
      <div>
        <h5 className={style.filterTitle}>검색 필터</h5>
        <div className={style.filterSection}>
          ...
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: 60, width: "inherit" }}>
      <SearchForm />
    </div>
  );
}

```

---

[usePathname 공식문서](https://nextjs.org/docs/app/api-reference/functions/use-pathname)
