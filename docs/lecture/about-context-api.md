# 🧠 Context API

> 컴포넌트 트리 전체에 **전역 데이터를 전달**할 수 있는 React 내장 API
> `props drilling` 없이 하위 컴포넌트에서 직접 데이터에 접근 가능

---

## 사용 배경 (강의 예시)

- 홈 페이지에서 탭 상황(`추천`/`팔로우`)에 따라 **다른 API를 호출해야 하는 상황**이 발생
- 탭 변경 시, **게시글 목록(Post 컴포넌트들)** 이 해당 탭에 맞는 데이터를 보내야 함
- 이 상황을 여러 하위 컴포넌트에서 공통으로 사용해야 하므로 → **Context API로 전역 상태 관리** 사용

---

## 예제 코드

**TabProvider.tsx**

```tsx
"use client";

import { createContext, ReactNode, useState } from "react";

// 1. Context 생성
export const TabContext = createContext({
  tab: "rec",
  setTab: (value: "rec" | "fol") => {},
});

type Props = { children: ReactNode };

// 2. Provider 정의
export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState<"rec" | "fol">("rec");

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}
```

- `tab`: 현재 선택된 탭 상황 (`"rec"` 또는 `"fol"`)
- `setTab`: 탭 상황을 변경하는 함수
- `TabContext.Provider`: 하위 컴포넌트에 상황을 전달

---

### 📂 page.tsx (홈 페이지에서 Provider 적용)

```tsx
/** home/page.tsx **/

import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";

export default function Home() {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm />
        <Post />
        ...
      </TabProvider>
    </main>
  );
}
```

- `TabProvider`의 children에 위치한 **Tab, PostForm, Post 컴포넌트는 전역 탭 상태에 접근 가능**
- 예: `Tab`에서 `setTab("fol")`로 탭을 변경하면,
  → `Post` 컴포넌트들이 `"fol"` 탭 기준의 API로 데이터를 다시 보내게 됨
