# Next.js 주소창에 영향을 주지 않는 폴더 정리

>Next.js에서는 폴더명이 라우트 경로(URL)에 반영되는 것이 기본 동작이지만, 특정 목적을 가진 **특수 폴더명**은 주소창에 영향을 주지 않는다. 이 폴더들은 UI 구조나 파일 정리를 위한 도구일 뿐이며, 실제 라우트 경로에는 포함되지 않는다.

---

## 📂 주소창에 영향 가지 않는 폴더 목록

### 1. `()` : layout을 묶어주는 폴더

* UI 구조를 명확히 하기 위해 사용됨
* 여러 라우트를 공통 layout으로 감쌀 때 grouping 용도로 사용
* 예: `/(dashboard)/feed`, `/(auth)/login`
* **주소창에는 `(dashboard)`가 포함되지 않음** → `/feed` 또는 `/login` 형태로 라우팅됨

### 2. `@` : 패러렐 라우트(Parallel Routes) 폴더

* `@slotName` 형태로 사용되며, layout에서 병렬적으로 다른 컴포넌트를 렌더링할 때 활용
* 예: `@modal`, `@feed`
* **라우트 경로에 영향을 주지 않음**, 단지 layout의 slot을 채워주는 용도

### 3. `_` : 언더스코어가 붙은 폴더

* 예: `_components`, `_lib`, `_partials`
* UI, 유틸리티, 공통 모듈 등을 정리하는 데 사용됨
* **라우팅에 전혀 영향을 주지 않음**, 완전히 private한 정리용 폴더로 간주됨
* 일반적으로 `app/` 폴더 하위에서 라우팅과 관계없는 코드를 정리할 때 활용

---

## ✅ 요약

| 폴더명 형식   | 용도                | URL에 반영 여부 |
| -------- | ----------------- | ---------- |
| `(name)` | layout 그룹핑 용      | ❌ 반영 안 됨   |
| `@name`  | 병렬 슬롯을 위한 패러렐 라우트 | ❌ 반영 안 됨   |
| `_name`  | 폴더 정리용 private 폴더 | ❌ 반영 안 됨   |

이러한 특수 폴더를 잘 활용하면 라우트 구조를 깔끔하게 정리하면서도 URL을 유지보수하기 쉽게 구성할 수 있다.

---

## 📚 참고 문서

* [Next.js 공식 문서](https://nextjs.org/docs/app/building-your-application/routing#special-folders)
* [App Router 레이아웃 구조 가이드](https://nextjs.org/docs/app/building-your-application/routing/defining-routes#grouping-routes)
