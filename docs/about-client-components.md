# 📘 Next.js에서 클라이언트 컴포넌트로 전환하기

## 방법

Next.js 13 이상에서는 기본적으로 **Server Components**를 사용한다.
컴포넌트를 클라이언트 컴포넌트로 전환하려면, 파일 상단에 다음 코드를 추가해야한다.

```tsx
'use client';
```

예시:

```tsx
'use client';

import { useState } from 'react';

export default function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
```

> 🔸 **주의:** `use client` 지시문은 **파일 단위**로 적용되며, 해당 파일 내의 모든 컴포넌트가 클라이언트 컴포넌트로 처리된다.

<br/>

---

<br/>

## 왜 클라이언트 컴포넌트로 전환해야 하는가?

~~~
Server Components는 아래와 같은 제약이 있다
~~~

* **React Hooks 사용 불가**

  * `useState`, `useEffect`, `useContext` 등을 사용할 수 없다.
* **브라우저 전용 API 사용 불가**

  * `window`, `document` 등을 사용할 수 없다.
* **이벤트 핸들러 사용 불가**

  * `onClick`, `onChange` 등의 브라우저 이벤트를 처리할 수 없다.

<br/>

아래 상황에서는 반드시 클라이언트 컴포넌트로 전환해야 한다.

✅ **상태 관리 필요 시**

* `useState`로 상태를 저장해야 하는 경우
* 예: 버튼 클릭 시 카운트 증가

✅ **이벤트 리스너 필요 시**

* 유저 인터랙션 처리
* 예: 폼 입력, 드롭다운 토글

✅ **브라우저 API 사용 시**

* `localStorage`, `sessionStorage`, `navigator` 등

✅ **클라이언트 전용 라이브러리 사용 시**

* 예: Chart.js, Swiper.js 등 DOM 의존 라이브러리

<br/>

---

<br/>

## 요약

**Server Components**

* 기본 렌더링 방식이다.
* 빠른 로딩과 작은 번들 사이즈를 가진다.
* **브라우저 기능 제한이 있다.**

**Client Components**

* `use client` 선언이 필요하다.
* Hooks, 이벤트 처리, 브라우저 API 사용이 가능하다.
