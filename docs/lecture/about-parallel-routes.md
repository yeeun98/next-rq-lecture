# 🚥 Parallel Routes in Next.js (App Router)

Next.js의 Parallel Routes는 **하나의 URL에서 여러 개의 UI 슬롯을 병렬로 렌더링**할 수 있도록 도와주는 기능이다.  
복잡한 UI를 라우팅 기반으로 깨끗하게 관리할 수 있게 해주며, 모달/사이드바/탭 UI 등에 매우 유용하다.

---

## ✅ 핵심 개념

* 기존 Nested Routing은 **부모-자식 구조**로 렌더링됨
* Parallel Routes는 **서로 독립적인 여러 UI 슬롯을 같은 경로에서 동시에 렌더링**
* **로딩 상태, fetch 전략 등도 슬롯마다 개별 관리** 가능
* 각 슬롯은 layout.tsx에서 `@슬롯명`으로 정의됨

---

## 📁 예시 디렉토리 구조

```bash
/before_login
├── i
│   └── flow
│       └── login
│           └── page.tsx       # 로그인 콘텐츠 (children 슬롯용 메인 콘텐츠)
├── @modal
│   └── (.)i
│       └── flow
│           └── login
│               └── page.tsx   # 모달 콘텐츠 (modal 슬롯 - (.)로 URL 공유)
├── layout.tsx                 # i, modal 슬롯을 포함하는 공통 레이아웃
└── page.tsx                   # 기본 메인화면 콘텐츠 (children 슬롯의 fallback)
```

> 🔍 `@modal/(.)i/flow/login/page.tsx`처럼 `(.)`를 사용하면 `@modal` 슬롯이 `/i/flow/login` 경로를 공유해서 렌더링됨  
> 🔍 이 구조에서 `/i/flow/login`으로 진입하면 두 가지 경우에 따라 서로 다른 결과가 나타남

---

## 🧩 layout.tsx 예시

```tsx
type Props = {
  children: ReactNode;  // 기본 슬롯 (예: i)
  modal: ReactNode;     // 모달 슬롯
};

export default function Layout({ children, modal }: Props) {
  return (
    <div>
      {children}   // 메인 콘텐츠
      {modal}      // 모달 콘텐츠
    </div>
  );
}
```

---

## 🚦 실제 URL 동작 예시

### `/i/flow/login` 접근 방식에 따른 동작 비교

| 접근 방식                          | children 슬롯               | modal 슬롯          | 결과 화면         |
| ------------------------------ | ------------------------- | ----------------- | ------------- |
| `/login > redirect("/i/flow/login")` | `app/page.tsx` (fallback) | `@modal/(.)i/...` | 메인 유지 + 모달 띄움 |
| 주소창 직접 `/i/flow/login` 입력      | `i/flow/login/page.tsx`   | 없음                | 로그인 단독 페이지    |

* 클라이언트 라우팅 시에는 기존 layout이 유지되어 모달만 뜨는 구조로 작동
* 브라우저 직접 접근 시에는 전체 페이지가 새로 그려지기 때문에, 해당 경로에 대응하는 page.tsx가 메인으로 뜸

---

## 🔑 요약 정리

* `(.)` = URL 공유를 의미함 (ex. `@modal/(.)i/...`)
* `@슬롯명` = 병렬로 렌더링될 UI 영역
* 여러 UI를 같은 URL에서 동시에 다루고 싶을 때 사용
* **push()로 이동 시에는 모달**, **직접 진입 시에는 메인 페이지**로 작동할 수 있음
* 모달 UI 구현에 매우 효과적임

---

## 🔗 참고 링크

* [Parallel Routes 공식 문서](https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes)
* [Intercepting Routes vs. Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)
