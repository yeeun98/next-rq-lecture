# 📁 Next.js App Router 구조 정리

```
Next.js 13부터 도입된 App Router에 대한 정리이다.
폴더 기반의 라우팅, 레이아웃 시스템, 동적 세그먼트 등 해석 가능한 태깅을 포함한다.
```

* Next.js의 App Router는 폴더 구조 기반의 라우팅 시스템이다.
* `app/` 디렉토리 내의 폴더와 파일 구조에 따라 자동으로 URL 경로가 매핑된다.

---

## 1. 라우팅 기본 구조

* `app/page.tsx`: `/` 경로에 대응
* `app/about/page.tsx`: `/about` 경로에 대응
* 각 폴더는 하나의 "route segment"를 의미

---

## 2. `page.tsx`의 역할 — **실제 콘텐츠를 렌더링하는 페이지**

* 라우트에서 보여줄 **실질적인 콘텐츠를 정의하는 컴포넌트 파일**
* URL 경로와 직접적으로 대응되며, 유저가 접속하는 모든 페이지는 `page.tsx`로 구성됨
* 동적 세그먼트가 있을 경우 `params`를 통해 해당 값을 가져올 수 있음
* 페이지별 메타데이터(head 정보 등)를 정의할 수도 있음

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return <div>About us</div>;
}

// app/blog/[slug]/page.tsx
export default function BlogPost({ params }: { params: { slug: string } }) {
  return <div>Post: {params.slug}</div>;
}
```

---

## 3. `layout.tsx`의 역할

* 해당 폴더와 하위 경로에 공통적으로 적용되는 레이아웃을 정의함
* 페이지 간 이동 시 `layout`은 **유지**되며, 내부 콘텐츠(`children`)만 바뀜
* 예: `app/dashboard/layout.tsx`는 `/dashboard` 및 그 하위 경로에 모두 적용됨

---

## 4. `template.tsx`의 역할

* `layout.tsx`처럼 공통 UI를 제공하지만, **페이지 방문 시마다 새로 렌더링됨**
* 즉, `layout.tsx`는 **상태를 유지**하고, `template.tsx`는 **페이지 진입마다 마운트**됨
* 사용 예:

  * 페이지 전환마다 애니메이션 초기화가 필요한 경우
  * 특정 구역에서만 상태 초기화가 필요한 경우

```tsx
// app/posts/template.tsx
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="fade-in">{children}</div>;
}
```

### 🔄 `page.tsx` vs `template.tsx` 차이

| 항목         | `page.tsx`           | `template.tsx`           |
| ---------- | -------------------- | ------------------------ |
| **역할**     | 실제 라우트에 대응되는 페이지 콘텐츠 | 매 진입 시 새로 마운트되는 UI 구조 제공 |
| **렌더링 시점** | URL로 접근할 때마다 렌더링     | 하위 페이지가 변경될 때마다 새로 렌더링   |
| **상태 유지**  | 각 페이지 독립 렌더링         | 상태가 항상 초기화됨              |
| **주요 용도**  | 페이지 내용 표시            | 레이아웃 구조 + 초기화 필요할 때      |

예:

```tsx
app/
  dashboard/
    layout.tsx
    template.tsx   // 매번 새로 마운트됨
    page.tsx       // /dashboard
```

---

## 5. `default.tsx`의 역할 — **에러 없는 초기 상태 처리**

* 동적 세그먼트(`[slug]`, `[id]` 등)를 사용하는 라우트에서 값이 없을 때 보여줄 **기본 UI를 정의**
* 예: `app/shop/[category]/default.tsx` → `/shop`처럼 카테고리 없이 접근 시 표시할 기본 콘텐츠
* `page.tsx`나 `not-found.tsx`처럼 Next.js가 인식하는 특수 파일 중 하나

```tsx
// app/shop/[category]/default.tsx
export default function Default() {
  return <div>카테고리를 선택해주세요.</div>;
}
```

> ⚠️ `default.tsx`는 동적 경로의 **루트 수준에 해당하는 기본 상태**를 처리하는 데 사용됨

---

## 6. 대괄호(\[]) 폴더의 역할 — **동적 라우팅 (Dynamic Segments)**

* 예: `app/post/[id]/page.tsx` → `/post/123`, `/post/abc` 등 동적인 경로에 대응
* 내부에서는 `params.id` 형태로 접근 가능

```tsx
export default function Page({ params }: { params: { id: string } }) {
  return <div>Post ID: {params.id}</div>;
}
```

---

## 7. 소괄호(()) 폴더의 역할 — **그룹핑용 Segment (Group Segments)**

* `()`로 감싼 폴더는 URL에 **노출되지 않음**
* 코드 구조 정리나 layout 분리를 위해 사용됨

예시:

```
app/
  (admin)/
    dashboard/
      page.tsx   → /dashboard
```

---

## 8. 중첩 라우트 예시

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
  shop/
    [category]/
      default.tsx          // /shop 접근 시 기본 UI
```

---

## 9. 점(`.`)으로 시작하는 폴더 — **숨김/비라우트용 폴더**

* `.폴더명`은 라우팅에 **포함되지 않으며**, 보통 내부 전용 코드나 유틸을 정리하는 데 사용됨
* 예:

  * `.utils/`, `.components/`, `.config/` 등
* Next.js의 App Router는 해당 폴더들을 라우트 경로로 인식하지 않음
* 구조 정리와 가독성 향상에 유용함

```tsx
// app/(admin)/.utils/fetcher.ts
// app/(admin)/.components/Form.tsx
```

> 💡 참고: `.` 폴더는 일부 IDE나 파일 탐색기에서는 기본적으로 숨김 처리됨

---

📚 공식 문서:
[https://nextjs.org/docs/app/building-your-application/routing](https://nextjs.org/docs/app/building-your-application/routing)
