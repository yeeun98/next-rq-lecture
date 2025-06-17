## 📁 Next.js App Router 구조 정리

```
Next.js 13부터 도입된 App Router에 대한 정리이다.
폴더 기반의 라우팅, 레이아웃 시스템, 동적 세그먼트 등 해석 가능한 태깅을 포함한다.
```

- Next.js의 App Router는 폴더 구조 기반의 라우팅 시스템이다.
- `app/` 디렉토리 내의 폴더와 파일 구조에 따라 자동으로 URL 경로가 매핑된다.

---

### 1. 라우팅 기본 구조

- `app/page.tsx`: `/` 경로에 대응
- `app/about/page.tsx`: `/about` 경로에 대응
- 각 폴더는 하나의 "route segment"를 의미

---

### 2. `layout.tsx`의 역할

- 해당 폴더와 하위 경로에 공통적으로 적용되는 레이아웃을 정의함
- 페이지 간 이동 시 `layout`은 **유지**되며, 내부 콘텐츠(`children`)만 바뀜
- 예: `app/dashboard/layout.tsx`는 `/dashboard` 및 그 하위 경로에 모두 적용됨

---

### 3. `template.tsx`의 역할

- `layout.tsx`처럼 공통 UI를 제공하지만, **페이지 방문 시마다 새로 렌더링됨**
- 즉, `layout.tsx`는 **상태를 유지**하고, `template.tsx`는 **페이지 진입마다 마운트**됨
- 사용 예:
  - 페이지 전환마다 애니메이션 초기화가 필요한 경우
  - 특정 구역에서만 상태 초기화가 필요한 경우

```tsx
// app/posts/template.tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="fade-in">{children}</div>;
}
```

---

### 4. 대괄호([]) 폴더의 역할 — **동적 라우팅 (Dynamic Segments)**

- 예: `app/post/[id]/page.tsx` → `/post/123`, `/post/abc` 등 동적인 경로에 대응
- 내부에서는 `params.id` 형태로 접근 가능

```tsx
export default function Page({ params }: { params: { id: string } }) {
  return <div>Post ID: {params.id}</div>;
}
```

---

### 5. 소괄호(()) 폴더의 역할 — **그룹핑용 Segment (Group Segments)**

- `()`로 감싼 폴더는 URL에 **노출되지 않음**
- 코드 구조 정리나 layout 분리를 위해 사용됨

예시:

```
app/
  (admin)/
    dashboard/
      page.tsx   → /dashboard
```

---

### 6. 중첩 라우트 예시

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
  posts/
    template.tsx           // posts 하위 경로는 방문 시마다 리렌더링됨
```

---

📚 공식 문서:  
https://nextjs.org/docs/app/building-your-application/routing
