## 📁 Next.js App Router 구조 정리

> Next.js의 App Router는 폴더 구조 기반의 라우팅 시스템이다.   
> `app/` 디렉토리 내의 폴더와 파일 구조에 따라 자동으로 URL 경로가 매핑된다.

### 1. 라우팅 기본 구조

* `app/page.tsx`: `/` 경로에 대응
* `app/about/page.tsx`: `/about` 경로에 대응
* 각 폴더는 하나의 "route segment"를 의미 !

### 2. `layout.tsx`의 역할

* `layout.tsx`는 해당 폴더와 하위 경로에 공통적으로 적용되는 레이아웃을 정의한다.
* 페이지 간 이동 시 layout은 **유지**되며, 내부 콘텐츠(`children`)만 바뀌게 된다.
* 예: `app/dashboard/layout.tsx`는 `/dashboard` 및 그 하위 경로에 모두 적용됨

### 3. 대괄호(`[]`) 폴더의 역할 — **동적 라우팅 (Dynamic Segments)**

* `[id]/page.tsx` → `/123`, `/abc` 등 동적인 경로에 대응됨
* 내부에서는 `params.id`와 같은 형태로 접근 가능

```tsx
export default function Page({ params }: { params: { id: string } }) {
  return <div>Post ID: {params.id}</div>;
}
```

### 4. 소괄호(`()`) 폴더의 역할 — **그룹핑용 Segment (Group Segments)**

* `(`과 `)`로 만든 폴더는 URL에 **노출되지 않음**.
* 파일 구조를 정리하거나, 중첩 layout을 위해 **구조만 구분**할 때 사용된다.

예시:

```
app/
  (admin)/
    dashboard/
      page.tsx   → /dashboard
```

### 5. 중첩 라우트 예시

```
app/
  layout.tsx               // 공통 레이아웃
  page.tsx                 // /
  about/
    page.tsx               // /about
  blog/
    [slug]/
      page.tsx             // /blog/some-title
  (marketing)/
    contact/
      page.tsx             // /contact
```

---

> 참고: [https://nextjs.org/docs/app/building-your-application/routing](https://nextjs.org/docs/app/building-your-application/routing)
