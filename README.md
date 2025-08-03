# 🚀 Next.js + React Query 기반 SNS 프로젝트

> 인프런 강의 [Next + React Query로 SNS 서비스 만들기](https://www.inflearn.com/course/next-react-query-sns%EC%84%9C%EB%B9%84%EC%8A%A4/dashboard) 관련 레포입니다.

---

## 📚 목차

- [기술 스택](#기술-스택)
- [실행 방법](#실행-방법)
- [강의 정리](#강의-정리)

---

## 기술 스택

| 기술              | 설명                              |
| ----------------- | --------------------------------- |
| Next.js           | 13+ App Router 기반               |
| React Query       | 클라이언트 상태 및 서버 상태 관리 |
| TypeScript        | 정적 타입 지원                    |
| CSS Modules       | 모듈화된 컴포넌트 스타일링        |
| ESLint + Prettier | 코드 정적 분석 및 포맷팅          |

#### CSS Module의 사용 이유?

- `tailwind`: 호불호가 갈리고 가독성에 좋지 않다고 판단
- `Styled Component`: Server Component SSR과 문제가 있음
- `vanilla extract`: turbo pack과 문제 있음

---

## 실행 방법

```bash
npm install
npm run dev # Node.js 18.18.0, ^19.8.0, 또는 20.0.0 이상에서 동작
```

---

## 📚 강의 정리

**📦 라우팅 관련**

| 항목                            | 내용                                              | 링크                                                                 |
| ------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------- |
| App Router                      | App Router 구조와 동작 방식 정리                  | [상세 보기](./docs/lecture/about-app-router.md)                      |
| Parallel Routes                 | 병렬 라우팅 개념과 사용 예시                      | [상세 보기](./docs/lecture/about-parallel-routes.md)                 |
| 클라이언트 컴포넌트 전환        | 전환 방법 및 이유 정리                            | [상세 보기](./docs/lecture/about-client-components.md)               |
| Intercepting Routes             | 주소를 유지한 채 라우트를 가로채는 방법           | [상세 보기](./docs/lecture/about-intercepting-routes.md)             |
| Non-Routing 폴더                | URL에 영향을 주지 않는 폴더 구조                  | [상세 보기](./docs/lecture/about_non_routing_folders.md)             |
| useSelectedLayoutSegment        | activeLink 구현을 위한 훅 사용법                  | [상세 보기](./docs/lecture/about_useSelectedLayoutSegment.md)        |
| usePathname                     | 현재 경로(pathname)를 가져오는 훅                 | [상세 보기](./docs/lecture/about_usePathname.md)                     |
| searchParams vs useSearchParams | 서버/클라이언트에서 쿼리스트링을 다루는 방법 비교 | [상세 보기](./docs/lecture/about_searchParams_vs_useSearchParams.md) |

<br/>

**🧠 상태 관리**

| 항목        | 내용                     | 링크                                             |
| ----------- | ------------------------ | ------------------------------------------------ |
| Context API | Provider, 전역 상태 구성 | [상세 보기](./docs/lecture/about-context-api.md) |

---

## 📌 참고 링크

- [📘 ZeroCho - next-app-router-z](https://github.com/ZeroCho/next-app-router-z)
- [📘 Next.js 공식문서](https://nextjs.org/docs)
