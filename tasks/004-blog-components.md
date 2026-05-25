# Task 004: 샘플 데이터 및 블로그 핵심 컴포넌트 구현

## 개요

Notion API 없이 UI를 개발하기 위한 샘플 데이터를 생성하고,
블로그의 핵심 컴포넌트(PostCard, PostList, NotionRenderer, RichTextRenderer)를 구현한다.

## 관련 파일

- `lib/sample-data.ts`: 샘플 글, 카테고리, 블록 데이터
- `components/blog/post-card.tsx`: 글 카드 컴포넌트
- `components/blog/post-list.tsx`: 검색 + 카테고리 필터 + 글 그리드
- `components/blog/notion-renderer.tsx`: Notion 블록 → React 컴포넌트 렌더러
- `components/blog/rich-text-renderer.tsx`: RichText 어노테이션 렌더러

## 수락 기준

- [x] 샘플 데이터로 6개 글, 4개 카테고리, 상세 본문 블록이 제공된다
- [x] `PostCard`가 제목, 카테고리 뱃지, 발행일, 태그를 표시한다
- [x] `PostList`가 검색과 카테고리 필터를 실시간으로 처리한다
- [x] `NotionRenderer`가 10종 블록 타입을 렌더링하고 연속 리스트를 그룹화한다
- [x] `RichTextRenderer`가 bold, italic, strikethrough, underline, code, link를 처리한다

## 구현 단계

### 단계 1: 샘플 데이터 생성 (`lib/sample-data.ts`)

- [x] `samplePosts`: 6개 글 (소설, 자기계발, 기술, 에세이 카테고리 혼합)
- [x] `sampleCategories`: 4개 카테고리 (name, count)
- [x] `sampleBlocks`: 글 상세용 Notion 블록 배열 (paragraph, heading, list, quote, code, divider 포함)

### 단계 2: PostCard 컴포넌트

- [x] shadcn/ui `Card`, `Badge` 활용
- [x] 카테고리 Badge (secondary variant)
- [x] 발행일 포맷: `ko-KR` locale로 "2024년 1월 1일" 형식
- [x] 태그 목록: `#태그명` 형식
- [x] 전체 카드를 `<Link>`로 래핑, hover 시 shadow 효과

### 단계 3: PostList 컴포넌트 (Client Component)

- [x] `useState`로 `query`, `selectedCategory` 상태 관리
- [x] `useMemo`로 필터링된 글 목록(`filteredPosts`) 계산
- [x] 검색창: shadcn/ui Input + Search 아이콘
- [x] 카테고리 필터 버튼: 전체 + 카테고리별, 선택 시 primary 색상
- [x] 글 그리드: `sm:grid-cols-2 lg:grid-cols-3`
- [x] 결과 없음 상태 메시지 표시

### 단계 4: NotionRenderer 컴포넌트

- [x] `groupBlocks()`: 연속 bulleted_list_item / numbered_list_item을 ListGroup으로 그룹화
- [x] 블록 렌더링 (switch):
  - `paragraph` → `<p>`
  - `heading_1~3` → `<h1~3>` (크기·마진 차등 적용)
  - `bulleted_list` → `<ul>` + `<li>`
  - `numbered_list` → `<ol>` + `<li>`
  - `quote` → `<blockquote>` (왼쪽 보더)
  - `code` → `<pre><code>` (언어 data 속성 포함)
  - `image` → next/image (external/file URL 분기)
  - `divider` → `<hr>`

### 단계 5: RichTextRenderer 컴포넌트

- [x] `RichText[]`를 받아 어노테이션에 따라 인라인 스타일 적용
- [x] bold → `<strong>`, italic → `<em>`, strikethrough → `<s>`, underline → `<u>`, code → `<code>`
- [x] link → `<a href>` (target="_blank", rel="noopener noreferrer")

## 변경 사항 요약

- `lib/sample-data.ts`: samplePosts(6개), sampleCategories(4개), sampleBlocks 생성
- `components/blog/post-card.tsx`: Card + Link 기반 글 카드, 카테고리·날짜·태그 표시
- `components/blog/post-list.tsx`: Client Component, 검색·카테고리 필터·그리드 렌더링
- `components/blog/notion-renderer.tsx`: groupBlocks() + 10종 블록 타입 switch 렌더링
- `components/blog/rich-text-renderer.tsx`: 6종 어노테이션 + 링크 인라인 렌더링
