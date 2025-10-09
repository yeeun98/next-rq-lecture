# `<Form>` component : [Next 15]

> 공식 문서 : [https://nextjs.org/docs/app/api-reference/components/form](https://nextjs.org/docs/app/api-reference/components/form)

## 한 줄 요약

`<Form>`는 HTML `<form>`을 확장해서 **클라이언트 내비게이션**, **로딩 UI 프리패치**, **서치 파라미터 업데이트**를 쉽게 해준다. `action`이 **문자열이면** URL로, **함수(Server Action)면** 그 함수를 실행한다.

<br/>

## 기본 사용

```tsx
import Form from "next/form";

export default function Search() {
  return (
    <Form action="/search">
      <input name="q" />
      <button type="submit">Search</button>
    </Form>
  );
}
```

- 제출 시 `/search?q=...`로 **클라이언트 내비게이션** (전체 새로고침 X)
- 폼이 화면에 보이면 대상 경로의 **공유 UI(layout/loading)** 를 **prefetch**

<br/>

## prefetch란?

**prefetch**는 사용자가 이동할 가능성이 높은 페이지의 데이터를 **미리 불러와 캐시에 저장**하는 기능이다.

### ✔️ 이점

- **빠른 전환 속도:** 실제 클릭 시 이미 필요한 데이터를 갖고 있어 즉시 이동 가능.
- **로딩 상태 최소화:** 다음 페이지의 `layout`, `loading`, `route segment`가 미리 준비됨.
- **UX 향상:** 특히 `<Form>`처럼 검색 폼, 이동 폼 등 자주 전환되는 UI에서 효과적.

### ✔️ 동작 방식

- `<Form action="/search" prefetch>`처럼 작성 시, 화면에 나타나는 순간 Next가 `/search` 경로의 리소스를 백그라운드로 받아둠.
- `prefetch={false}`로 끄면 미리 불러오지 않음.

> 즉, 사용자가 폼을 제출하기 전에 이미 다음 페이지의 렌더링 리소스를 준비해 두는 최적화 기술.

<br/>

## `action` 타입별 동작 차이

### 1) `action`이 **string** (URL/경로)

- 브라우저 기본 동작과 유사하게 **GET**으로 **검색 파라미터**에 인코딩해 이동
- **클라이언트 내비게이션** 수행 → 공유 UI/상태 유지
- **prefetch**로 로딩 UI를 미리 불러옴
- 지원 props

  - `replace` : 히스토리 대체
  - `scroll` : 이동 시 스크롤 제어
  - `prefetch` : 가시화 시 프리패치 on/off

- 빈 문자열 `action=""` → **현재 경로**로 이동하며 **searchParams만 갱신**
- 제한

  - `method` / `encType` / `target` **미지원** (이 값이 필요하면 HTML `<form>`을 사용)
  - `<input type="file">` 사용 시 **파일명만** 전송(브라우저 기본과 동일)
  - `key` prop 사용 불가(리렌더 트리거 필요하면 함수 `action` 사용)

### 2) `action`이 **function** (Server Action)

- 제출 시 **Server Action** 실행 (예: 생성/수정 같은 mutation)
- 흔한 패턴: 액션 내부에서 `redirect('/path')`
- **주의**

  - `replace` / `scroll` **무시됨** (문자열 액션에서만 의미 있음)
  - 대상 경로를 알 수 없으므로 **prefetch 불가**

- 예시

  ```tsx
  import Form from "next/form";
  import { createPost } from "@/actions";

  export default function Page() {
    return (
      <Form action={createPost}>
        <input name="title" />
        <button type="submit">Create</button>
      </Form>
    );
  }
  ```

  ```ts
  // actions.ts
  "use server";
  import { redirect } from "next/navigation";

  export async function createPost(formData: FormData) {
    // ...서버에서 생성 작업
    redirect(`/posts/123`);
  }
  ```

<br/>

## 버튼 단위로 액션 오버라이드

- `<button>` / `<input type="submit">`에 `formAction`을 주면 **폼의 `action`을 버튼별로 덮어씀**
- 단, 이 방식은 **prefetch 미지원**

```tsx
<Form action="/search">
  <input name="q" />
  <button type="submit">Search</button>
  <button type="submit" formAction="/search/advanced">
    Advanced
  </button>
</Form>
```

<br/>

## 로딩 상태(UX) 다루기

- `useFormStatus()`로 **pending** 상태를 받아 즉각적인 피드백 제공 가능

```tsx
"use client";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting…" : "Submit"}
    </button>
  );
}
```

<br/>

## 언제 `<Form>` vs HTML `<form>`?

- `<Form>`가 유리한 경우

  - 검색폼 등 **URL 파라미터 갱신 + 빠른 페이지 전환**이 중요한 경우
  - **공유 UI 프리패치**로 체감 속도를 올리고 싶은 경우
  - Server Action과 연결해 **페이지 전체 새로고침 없이** mutation 처리

- HTML `<form>`이 맞는 경우

  - 커스텀 `method` / `encType` / `target`이 반드시 필요한 제출 흐름
  - 파일 업로드에서 **실제 파일 객체 전송**이 필요한 문자열 액션(use fetch/formData 또는 Server Action 활용 권장)

<br/>

## 팁

- `basePath`를 쓰면 `formAction`에도 **basePath를 포함**해야 함 (예: `/base-path/search`)
- 문자열 `action`일 때만 `replace` / `scroll`이 의미가 있음
- Server Action으로 **검증 실패 메시지 반환** + `useActionState`로 상태 관리 패턴 추천
