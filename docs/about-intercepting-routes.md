# Intercepting Routes

## 📌 인터셉팅 라우트란?

> 인터셉팅 라우트는 기존의 라우트 구조를 변경하지 않고, 특정 UI를 다른 레이아웃에 "끼워 넣는" 방식으로 페이지를 렌더링할 수 있게 해주는 기능이다.

**📂 예시 디렉토리 구조**

```bash
/(before_login)
├── @modal
│   └── (.)i
│       └── flow
│           └── login
│               └── page.tsx   # 모달 콘텐츠 (modal 슬롯 - (.)로 URL 공유)
├── i
│   └── flow
│       └── login
│           └── page.tsx       # 로그인 콘텐츠 (children 슬롯용 메인 콘텐츠)
├── page.tsx                   # 기본 메인화면 콘텐츠 (children 슬롯의 fallback)
└── layout.tsx                 # i, modal 슬롯을 포함하는 공통 레이아웃
```

- 원래는 `/i/flow/login`를 클릭하면 전체 페이지가 해당 경로로 이동함
- 하지만 인터셉팅 라우트를 사용하면 `/i/flow/login` 페이지를 모달처럼 현재 위치 위에 렌더링할 수 있음

---

## 🧭 경로 패턴

> 인터셉팅 라우트를 정의할 때는 폴더 이름 앞에 특수 문자를 붙여 사용한다

| 구문           | 설명                                  |
| -------------- | ------------------------------------- |
| `(.)segment`   | 현재 경로 기준으로 인터셉트함         |
| `(..)segment`  | 한 단계 상위 경로 기준으로 인터셉트함 |
| `(...)segment` | 루트 경로 기준으로 인터셉트함         |

> ⚠️ 이 구문에서 `(.)`, `(..)`, `(...)`는 파일 시스템 상의 디렉토리 구조가 아닌 **라우트 세그먼트 구조**를 기준으로 동작한다.
> 즉, 실제 폴더 경로와는 다를 수 있으며, 라우트 레이어를 기준으로 인터셉트할 위치가 결정된다.

---

## ✅ 장점

- URL은 실제 상세 페이지로 바뀌지만, 전체 레이아웃은 유지됨
- 사용자 경험 향상 (모달 등으로 활용 가능)
- 코드 분리 및 경로 유지가 가능함

---

## ⚠️ 주의사항

- 인터셉팅 라우트는 `@` 네임드 슬롯과 함께 사용할 때 가장 유용함
- 파일 이름 충돌 방지를 위해 폴더 이름에 `(.)` 패턴을 명확히 사용할 것
- 렌더링 우선순위는 기본 경로가 먼저이며, 인터셉팅 라우트가 나중에 적용됨

---

## ⛔ 언제 동작하지 않는가?

```
인터셉팅 라우트는 클라이언트 측 라우팅일 때만 동작함.
다음과 같은 경우에는 작동하지 않는다.
```

| 상황                  | 인터셉팅 라우트 작동 여부 |
| --------------------- | ------------------------- |
| `<Link href="..." />` | ✅ 작동함                 |
| `router.push()`       | ✅ 작동함                 |
| F5 새로고침           | ❌ 전체 페이지 로드됨     |
| URL 직접 입력         | ❌ 전체 페이지 로드됨     |
| SSR/서버 요청         | ❌ 적용 안 됨             |

- 즉, **사용자가 Link나 router.push로 이동할 때만** 인터셉팅된 UI(예: 모달)를 현재 레이아웃 위에 겹쳐서 보여줄 수 있음.
- 새로고침하거나 주소창에 직접 입력하면 전체 페이지가 리렌더링되므로 인터셉팅이 적용되지 않고, 해당 경로에 맞는 전체 페이지가 렌더링됨.

---

## 📚 참고 링크

- [인터셉팅 라우트 공식 문서 (한글)](https://nextjs-ko.org/docs/app/building-your-application/routing/intercepting-routes)
