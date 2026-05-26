# 책 리뷰 블로그 개발 로드맵

Notion을 CMS로 활용하여 별도 백엔드 없이 책 리뷰를 작성하고 발행하는 블로그 시스템

## 개요

책 리뷰 블로그는 Notion 데이터베이스를 CMS로 연결해, Notion에서 리뷰를 작성하면 블로그에 자동으로 반영되는 워크플로를 제공합니다.

- **Notion CMS 연동**: Notion API를 통해 데이터베이스에서 발행된 글을 자동으로 가져와 블로그에 표시
- **카테고리 및 검색**: 카테고리별 필터링과 제목/태그 기반 클라이언트 사이드 검색
- **Notion 블록 렌더링**: paragraph, heading, list, quote, code, image, divider 등 Notion 블록을 React 컴포넌트로 변환
- **정적 생성 + ISR**: Next.js App Router 기반 정적 사이트 생성과 Incremental Static Regeneration으로 성능 최적화

## 개발 워크플로우

1. **작업 계획**

   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**

   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `001-setup.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조. 예를 들어, 현재 작업이 `012`라면 `011`과 `010`을 예시로 참조.
   - 이러한 예시들은 완료된 작업이므로 내용이 완료된 작업의 최종 상태를 반영함 (체크된 박스와 변경 사항 요약). 새 작업의 경우, 문서에는 빈 박스와 변경 사항 요약이 없어야 함. 초기 상태의 샘플로 `000-sample.md` 참조.

3. **작업 구현**

   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
   - 테스트 통과 확인 후 다음 단계로 진행
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**

   - 로드맵에서 완료된 작업을 ✅로 표시

## 개발 단계

### Phase 1: 애플리케이션 골격 구축 ✅

- **Task 001: 프로젝트 초기 설정 및 기본 구조 구성** ✅ - 완료
  - See: `/tasks/001-project-setup.md`
  - ✅ Next.js 16 App Router + TypeScript + Tailwind CSS v4 프로젝트 초기화
  - ✅ shadcn/ui (radix-ui 단일 패키지) 기반 UI 컴포넌트 설치 및 구성
  - ✅ `@notionhq/client` 패키지 설치
  - ✅ 프로젝트 디렉토리 구조 생성 (`app/`, `components/`, `lib/`, `types/`)

- **Task 002: 라우트 구조 및 레이아웃 설정** ✅ - 완료
  - See: `/tasks/002-route-layout.md`
  - ✅ 전체 라우트 구조 생성: `/`, `/posts/[slug]`, `/categories`, `/categories/[name]`
  - ✅ 루트 레이아웃 (`app/layout.tsx`): ThemeProvider, Navbar, Footer, Toaster 구성
  - ✅ 사이트 설정 중앙 관리 (`lib/config.ts`): 네비게이션, 사이트명, 소셜 URL
  - ✅ 에러 페이지 (`error.tsx`), 404 페이지 (`not-found.tsx`), 로딩 페이지 (`loading.tsx`) 구현

- **Task 003: 타입 정의 및 Notion API 레이어 설계** ✅ - 완료
  - See: `/tasks/003-notion-api-layer.md`
  - ✅ 데이터 타입 정의 (`types/notion.ts`): `Post`, `Category`, `RichText`, `RichTextAnnotations`, `NotionBlock` 유니온 타입
  - ✅ Notion API 호출 레이어 (`lib/notion.ts`): `getPosts`, `getPostBySlug`, `getPostBlocks`, `getCategories` 함수 구현
  - ✅ 환경 변수 미설정 시 샘플 데이터 폴백 로직 구현 (`USE_SAMPLE_DATA` 분기)
  - ✅ Notion 데이터베이스 쿼리: `Status === "발행됨"` 필터, `Published` 내림차순 정렬
  - ✅ 블록 목록 조회 시 페이지네이션 커서 처리 및 지원 블록 타입 필터링

### Phase 2: UI/UX 완성 (샘플 데이터 활용) ✅

- **Task 004: 샘플 데이터 및 블로그 핵심 컴포넌트 구현** ✅ - 완료
  - See: `/tasks/004-blog-components.md`
  - ✅ 샘플 데이터 생성 (`lib/sample-data.ts`): 6개 글, 4개 카테고리, 상세 본문 블록
  - ✅ `PostCard` 컴포넌트: 제목, 카테고리 뱃지, 발행일, 태그 표시
  - ✅ `PostList` 컴포넌트: 검색 입력, 카테고리 필터 버튼, 글 그리드 표시
  - ✅ `NotionRenderer` 컴포넌트: 연속 리스트 블록 그룹화, 10종 블록 타입 렌더링
  - ✅ `RichTextRenderer` 컴포넌트: bold, italic, strikethrough, underline, code, link 어노테이션 처리

- **Task 005: 전체 페이지 UI 완성** ✅ - 완료
  - See: `/tasks/005-full-page-ui.md`
  - ✅ 홈페이지 (`/`): ISR 적용, 글 목록 + 검색 + 카테고리 필터 통합
  - ✅ 글 상세 페이지 (`/posts/[slug]`): 메타데이터 생성, 본문 렌더링, 이전/다음 글 내비게이션
  - ✅ 카테고리 목록 페이지 (`/categories`): 카드 그리드로 카테고리별 글 수 표시
  - ✅ 카테고리별 글 목록 (`/categories/[name]`): URL 인코딩 처리, 해당 카테고리 글만 필터링
  - ✅ 반응형 디자인: 모바일 1열, 태블릿 2열, 데스크톱 3열 그리드
  - ✅ 네비게이션: 데스크톱 헤더 링크 + 모바일 Sheet 메뉴

### Phase 3: 핵심 기능 보강 및 Notion 연동 검증

- **Task 006: 페이지네이션 구현** - 우선순위
  - 홈페이지 글 목록에 페이지네이션 적용 (페이지당 9개 또는 12개)
  - `PostList` 컴포넌트에 페이지네이션 UI 추가 (shadcn/ui Pagination 컴포넌트 활용)
  - 카테고리 필터 및 검색 상태와 페이지네이션 상태 연동
  - 카테고리별 글 목록 페이지에도 동일한 페이지네이션 적용

- **Task 007: URL 쿼리 파라미터 기반 상태 관리**
  - 카테고리 필터 선택 시 URL 쿼리 파라미터 동기화 (`?category=소설`)
  - 검색어 입력 시 URL 쿼리 파라미터 반영 (`?q=개츠비`)
  - 브라우저 뒤로가기/앞으로가기 시 필터 상태 복원
  - `useSearchParams` 활용한 쿼리 파라미터 읽기/쓰기 구현

- **Task 008: SEO 및 메타데이터 최적화**
  - 각 글 상세 페이지에 Open Graph 태그 추가 (`og:title`, `og:description`, `og:type`)
  - 홈페이지 및 카테고리 페이지 메타데이터 강화
  - `sitemap.xml` 동적 생성 (`app/sitemap.ts`)
  - `robots.txt` 설정 (`app/robots.ts`)
  - 구조화된 데이터 (JSON-LD) 추가: `Book`, `Review` 스키마

- **Task 009: Notion API 실제 연동 검증 및 환경 설정**
  - Notion 데이터베이스 생성 가이드 문서 작성 (Book Reviews 스키마)
  - 환경 변수 설정 가이드: `NOTION_API_KEY`, `NOTION_DATABASE_ID`
  - `.env.example` 파일 생성 및 `.env.local` 설정 안내
  - Playwright MCP를 활용한 Notion API 연동 E2E 테스트
    - 샘플 데이터 모드와 실제 API 모드 전환 테스트
    - 글 목록 조회, 글 상세 조회, 카테고리 조회 플로우 검증
    - API 에러 발생 시 에러 페이지 표시 확인

- **Task 009-1: Notion 연동 통합 테스트**
  - Playwright MCP를 사용한 전체 사용자 플로우 E2E 테스트
    - 홈 -> 글 목록 확인 -> 글 클릭 -> 상세 페이지 -> 이전/다음 내비게이션
    - 카테고리 필터 -> 필터된 결과 확인 -> 카테고리 페이지 이동
    - 검색어 입력 -> 실시간 필터링 -> 결과 없음 상태 확인
  - 에러 핸들링 및 엣지 케이스 테스트
    - 존재하지 않는 slug 접근 시 404 페이지 확인
    - 존재하지 않는 카테고리 접근 시 404 처리 확인
    - API 타임아웃 또는 오류 시 error.tsx 표시 확인
  - 반응형 디자인 테스트
    - 모바일 (375px), 태블릿 (768px), 데스크톱 (1280px) 뷰포트에서 레이아웃 검증
    - 모바일 메뉴 Sheet 열기/닫기 동작 확인

### Phase 4: 성능 최적화 및 배포

- **Task 010: 성능 최적화**
  - Next.js ISR 캐싱 전략 점검 및 `revalidate` 값 최적화
  - 이미지 최적화: `next/image` 활용, 적절한 `sizes` 속성 설정
  - 코드 스플리팅 확인: 클라이언트 컴포넌트 (`PostList`) 번들 크기 점검
  - Lighthouse 성능 측정: LCP 2.5초 이내 목표 달성 확인
  - 불필요한 리렌더링 방지: `useMemo`, `useCallback` 적용 검토

- **Task 011: 접근성 (WCAG 2.1 AA) 준수**
  - 시맨틱 HTML 검증: 적절한 heading 계층, landmark 역할
  - 키보드 내비게이션 테스트: 모든 인터랙티브 요소 탭 접근 가능
  - 색상 대비 검사: WCAG AA 기준 4.5:1 이상 대비율 확보
  - 스크린 리더 호환성: `aria-label`, `alt` 텍스트 검증
  - 포커스 관리: 페이지 전환 시 포커스 이동 처리

- **Task 012: Vercel 배포 및 최종 점검**
  - Vercel 프로젝트 연결 및 환경 변수 설정
  - 프로덕션 빌드 검증: `npm run build` 오류 0건, ESLint 오류 0건
  - 배포 후 전체 기능 동작 확인 (Playwright MCP E2E 테스트 재실행)
  - Edge Network CDN 캐싱 동작 확인
  - README.md 업데이트: 프로젝트 소개, 설치 방법, 환경 변수 설정, 배포 방법 안내
