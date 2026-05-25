# Task 005: 전체 페이지 UI 완성

## 개요

샘플 데이터를 활용해 블로그의 모든 페이지(홈, 글 상세, 카테고리 목록, 카테고리별 글 목록)를 완성한다.
ISR 설정, 메타데이터 생성, 반응형 디자인, 모바일 네비게이션을 포함한다.

## 관련 파일

- `app/page.tsx`: 홈페이지 - ISR, PostList 통합
- `app/posts/[slug]/page.tsx`: 글 상세 페이지
- `app/categories/page.tsx`: 카테고리 목록 페이지
- `app/categories/[name]/page.tsx`: 카테고리별 글 목록 페이지
- `components/layout/navbar.tsx`: 데스크톱/모바일 네비게이션
- `components/layout/footer.tsx`: 푸터

## 수락 기준

- [x] 홈페이지에서 전체 글 목록과 검색/필터가 동작한다
- [x] 글 상세 페이지에서 Notion 블록이 올바르게 렌더링된다
- [x] 카테고리 목록 페이지에서 카드 그리드가 표시된다
- [x] 카테고리별 글 목록이 올바르게 필터링된다
- [x] 모바일, 태블릿, 데스크톱 반응형 레이아웃이 동작한다
- [x] 모바일 Sheet 메뉴가 열리고 닫힌다

## 구현 단계

### 단계 1: 홈페이지 구현

- [x] `app/page.tsx`에 ISR (`revalidate = 60`) 설정
- [x] `getPosts()`, `getCategories()` 호출 후 `PostList`에 전달
- [x] 히어로 섹션 (사이트 제목, 설명) 추가

### 단계 2: 글 상세 페이지 구현

- [x] `generateStaticParams()`로 정적 경로 사전 생성
- [x] `generateMetadata()`로 title/description 메타데이터 생성
- [x] `getPostBlocks()`로 Notion 블록 가져와 `NotionRenderer`로 렌더링
- [x] 이전/다음 글 내비게이션 구현

### 단계 3: 카테고리 페이지 구현

- [x] `/categories`: 카테고리 카드 그리드 (이름 + 글 수)
- [x] `/categories/[name]`: URL 디코딩, 해당 카테고리 글만 필터링
- [x] 존재하지 않는 카테고리 접근 시 404 처리

### 단계 4: 레이아웃 및 반응형

- [x] `Navbar`: 데스크톱 링크 메뉴 + 모바일 Sheet 메뉴 (shadcn/ui Sheet)
- [x] `Footer`: 사이트명, 저작권 표시
- [x] 카드 그리드: `sm:grid-cols-2 lg:grid-cols-3` 반응형 설정

## 변경 사항 요약

- `app/page.tsx`: ISR 60초, getPosts/getCategories 통합, 히어로 + PostList 렌더링
- `app/posts/[slug]/page.tsx`: generateStaticParams/generateMetadata, NotionRenderer, 이전/다음 내비게이션
- `app/categories/page.tsx`: getCategories로 카드 그리드 표시
- `app/categories/[name]/page.tsx`: URL 인코딩 처리, 카테고리 필터링
- `components/layout/navbar.tsx`: 데스크톱 nav + 모바일 Sheet 메뉴
- `components/layout/footer.tsx`: 기본 푸터 구현
