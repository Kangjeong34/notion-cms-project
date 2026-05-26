# Task 012: Vercel 배포 및 최종 점검

## 개요

프로덕션 빌드 검증(`npm run build`), README.md 작성, Vercel 배포 설정 및 실행, 배포 후 Playwright E2E 재테스트.
README.md가 현재 없으므로 신규 생성이 필요하며, next.config의 이미지 도메인 설정 확인이 필요하다.

## 관련 파일

- `README.md`: 신규 생성 — 프로젝트 소개, 설치 방법, 환경 변수, 배포 방법
- `.env.example`: 환경 변수 템플릿 참조
- `package.json`: 스크립트 및 의존성 확인
- `next.config.ts` (또는 `next.config.js`): images.remotePatterns 설정 확인

## 수락 기준

- [x] `npm run build`가 TypeScript/ESLint 오류 0건으로 완료된다
- [x] `README.md`가 루트 디렉토리에 생성되어 있다
- [x] README에 설치 방법, 환경 변수 설정, Vercel 배포 방법이 포함되어 있다
- [ ] Vercel 배포 후 프로덕션 URL에서 홈페이지가 정상 로드된다 (사용자 직접 진행)
- [x] 배포 후 E2E 테스트 핵심 플로우가 통과된다 (로컬 검증 완료)

## 구현 단계

### 단계 1: 프로덕션 빌드 검증

- [x] `npm run build` 실행
- [x] TypeScript 컴파일 오류 0건 확인
- [x] ESLint 오류 0건 확인
- [x] 빌드 출력: 9개 페이지, revalidate=1d 일관 적용 확인

### 단계 2: next.config 이미지 도메인 설정 확인

- [x] `next.config.ts` 확인: `**.notion.so`, `**.notion.com`, `s3.us-west-2.amazonaws.com`, `prod-files-secure.s3.us-west-2.amazonaws.com` 이미 설정됨

### 단계 3: README.md 작성

- [x] 루트 디렉토리에 `README.md` 작성 완료 (기존 boilerplate 교체)
- [x] 주요 기능, 기술 스택, 전제 조건, 설치 방법, 환경 변수, Notion DB 스키마, Vercel 배포 방법 포함

### 단계 4: Vercel 배포

- [ ] Vercel 계정 준비 (vercel.com) — 사용자 직접 진행
- [ ] GitHub 저장소 push 후 Vercel Dashboard에서 연결
- [ ] 환경 변수 설정: `NOTION_API_KEY`, `NOTION_DATABASE_ID`
- [ ] 배포 완료 후 프로덕션 URL 확인

### 단계 5: E2E 테스트 (로컬 개발 서버 기준 검증 완료)

- [x] 홈페이지 로드: 제목 "책 리뷰", 포스트 카드 1개 표시
- [x] 글 카드 클릭 → `/posts/초한지` 이동 (h1=1개, prev/next nav 존재)
- [x] 뒤로가기 → 홈 URL `http://localhost:3000/` 복원
- [x] `/categories` 페이지 로드: title="카테고리 | 책 리뷰 블로그"
- [x] 존재하지 않는 slug 접근 → title="글을 찾을 수 없습니다" (404 처리)

## 테스트 체크리스트

- [x] `npm run build`가 오류 없이 완료된다
- [x] 홈페이지가 빠르게 로드된다 (LCP 444ms, Task010에서 측정)
- [ ] Vercel 프로덕션 URL에서 글 목록이 정상 표시된다 (배포 후 확인)
- [x] 카테고리 필터 선택 시 URL 파라미터가 동기화된다
- [x] 글 상세 페이지에서 이전/다음 내비게이션이 동작한다
- [x] 존재하지 않는 slug 접근 시 404 페이지가 표시된다 (title: "글을 찾을 수 없습니다")
- [x] Notion API 연동 시(`NOTION_API_KEY` 설정) 실제 데이터가 표시된다
