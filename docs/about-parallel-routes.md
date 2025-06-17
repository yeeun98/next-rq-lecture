# 🚥 Parallel Routes in Next.js (App Router)
~~~
Next.js의 Parallel Routes는 하나의 URL 경로 안에서 여러 개의 UI 슬롯을 병렬적으로 렌더링 할 수 있는 기능.  
모달, 사이드바, 탭 등 복잡한 UI 상태를 라우트와 함께 다루고 싶을 때 유용하게 사용할 수 있다.
~~~

---

## ✅ 개념 요약

- 기존 Nested Routing은 부모-자식 관계로 UI가 중첩되어 렌더링됨
- Parallel Routes는 **동일한 URL 내에 독립적인 UI 슬롯을 동시에 렌더링** 가능
- 슬롯별로 로딩 상태, 데이터 fetch 등을 **분리**할 수 있음

---

## 📁 디렉토리 구조 예시

```bash
/before_login
├── @i
│   └── flow
│       └── login
│           └── page.tsx       # 로그인 콘텐츠 (i 슬롯)
├── @modal
│   └── page.tsx               # 모달 콘텐츠 (modal 슬롯)
├── layout.tsx                 # i, modal 슬롯을 포함하는 공통 레이아웃
└── page.tsx                   # fallback 또는 루트용 기본 페이지
```

---

## 🧩 layout.tsx 예시 코드
```tsx
type Props = { children: ReactNode, modal: ReactNode };

export default function Layout({ children, modal }: Props) {
  return (
    <div className={styles.container}>
      {/* 메인 콘텐츠 영역 */}
      {children}
      {/* 모달 슬롯 (조건적으로 보여줄 수도 있음) */}
      {modal}
    </div>
  )
}
```

---

## 🧭 URL 동작 예시

- `/i/flow/login`
→ `@i` 슬롯에 `flow/login/page.tsx` 렌더링, `@modal/page.tsx`가 함께 렌더링되어 병렬 UI 구성