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

## 강의 정리

📄 **App Router 문서 보기** → [app router 상세 정리](./docs/about-app-router.md)  
📄 **Parallel Routes 문서 보기** → [parallel routes 상세 정리](./docs/about-parallel-routes.md)  
📄 **클라이언트 컴포넌트로 전환하는 방법과 그 이유 관련 문서 보기** → [클라이언트 컴포넌트로 전환하는 것 관련 정리](./docs/about-client-components.md)  
📄 **Intercepting Routes 문서 보기** → [app router 상세 정리](./docs/about-intercepting-routes.md)  
📄 **Next.js 주소창에 영향을 주지 않는 폴더 정리** → [app router 상세 정리](./docs/about_non_routing_folders.md)  


---

## 📌 참고 링크

- [📘 ZeroCho - next-app-router-z](https://github.com/ZeroCho/next-app-router-z)
- [📘 Next.js 공식문서](https://nextjs.org/docs)
