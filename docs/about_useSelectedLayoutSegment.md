# useSelectedLayoutSegment

> Next.js의 useSelectedLayoutSegment()는 현재 선택된 레이아웃 segment를 가져오는 훅이다.
> `app/` 디렉토리 구조를 기반으로, 중첩된 라우팅 구조에서 어떤 segment가 현재 활성화되어 있는지를 알 수 있다.

---

## 📍 사용법

```tsx
'use client';

import { useSelectedLayoutSegment } from 'next/navigation';

export default function SegmentViewer() {
  const segment = useSelectedLayoutSegment();
  return <p>Current segment: {segment}</p>;
}
```

<br/>

## 📍 파라미터

`useSelectedLayoutSegment()`는 다음과 같은 형태로도 사용할 수 있다:

```ts
useSelectedLayoutSegment(segmentLevel?: number): string | null
```

* `segmentLevel` *(선택값)*: 숫자를 넘기면, 특정 깊이의 segment를 가져올 수 있다.

  * 예: `0`이면 첫 번째 segment, `1`이면 두 번째 segment를 가져온다.
  * 기본값은 현재 layout에서 가장 가까운 segment를 반환한다.

> 즉, layout이 중첩된 상황에서 상위 segment를 알고 싶을 때 유용하다.

<br/>

## 📍 반환값 (Returns)

* 반환값은 `string` 또는 `null`이다.
* 현재 활성화된 segment의 **폴더 이름**을 문자열로 반환하며, 해당 segment가 없으면 `null`을 반환한다.

### 예시 폴더 구조와 반환값

```bash
app/
├── layout.tsx         # Root layout
├── page.tsx           # URL: /
├── dashboard/
│   ├── layout.tsx     # layout segment: 'dashboard'
│   ├── page.tsx       # URL: /dashboard
│   └── analytics/
│       ├── page.tsx   # URL: /dashboard/analytics
│       └── users/
│           └── page.tsx # URL: /dashboard/analytics/users
```

### 페이지별 반환값 예시

1. **/dashboard**

   * `useSelectedLayoutSegment()` → `'dashboard'`
   * `useSelectedLayoutSegment(0)` → `'dashboard'`

2. **/dashboard/analytics**

   * `useSelectedLayoutSegment()` → `'analytics'`
   * `useSelectedLayoutSegment(0)` → `'dashboard'`
   * `useSelectedLayoutSegment(1)` → `'analytics'`

3. **/dashboard/analytics/users**

   * `useSelectedLayoutSegment()` → `'analytics'`
   * `useSelectedLayoutSegment(0)` → `'dashboard'`
   * `useSelectedLayoutSegment(1)` → `'analytics'`
   * `useSelectedLayoutSegment(2)` → `'users'`

---

## useSelectedLayoutSegment를 사용해 activeLink 만들기

> `useSelectedLayoutSegment()`를 활용하면 현재 URL segment를 기준으로 메뉴 링크에 active 스타일을 적용할 수 있다.
이는 레이아웃 기반 구조에서 라우팅 상태에 따라 동적으로 메뉴 스타일을 바꾸고 싶을 때 유용하다.

### 예시 코드
```tsx
'use client'
 
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
 
export default function NavMenu() {
  const segment = useSelectedLayoutSegment();
  const isActive = 'home' === segment;
 
  return (
    <Link
      href="home"
      // 링크가 활성화되었는지에 따라 스타일을 변경합니다.
      style={{ fontWeight: isActive ? 'bold' : 'normal' }}
    >
      홈
    </Link>
  )
}
```

### 코드 설명

| 코드 | 설명 |
|------|------|
| `useSelectedLayoutSegment()` | 현재 URL 경로에서 활성화된 segment를 반환함. 예: `/home`이면 `'home'` |
| `const isActive = 'home' === segment` | 현재 segment가 `'home'`인지 비교해서 활성화 여부를 판단함 |
| `style={{ fontWeight: isActive ? 'bold' : 'normal' }}` | `isActive`가 `true`일 경우 해당 링크를 굵게 표시함 |


---

[useSelectedLayoutSegment 공식문서](https://nextjs-ko.org/docs/app/api-reference/functions/use-selected-layout-segment)