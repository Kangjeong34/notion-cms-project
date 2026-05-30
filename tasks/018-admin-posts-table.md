# Task 018: 관리자 글 목록 테이블 UI 구현

## 개요

`app/dashboard/posts/page.tsx`에서 `getAllPosts()` 결과를 shadcn/ui Table 컴포넌트로 렌더링한다. 컬럼은 제목, 카테고리, 발행일, 상태(뱃지), 액션으로 구성한다. 상태별 필터 탭과 빈 상태 UI, 로딩 처리를 포함한다.

## 관련 파일

- `app/dashboard/posts/page.tsx`: 테이블 페이지 구현
- `app/dashboard/posts/loading.tsx`: 신규 생성 — 스켈레톤 로딩 UI
- `components/dashboard/posts-table.tsx`: 신규 생성 — 테이블 컴포넌트 (클라이언트)
- `components/ui/table.tsx`: shadcn/ui Table (이미 존재)
- `components/ui/badge.tsx`: 상태 뱃지
- `components/ui/tabs.tsx`: 필터 탭 (이미 존재)
- `lib/notion.ts`: `getAllPosts()` (Task 017에서 구현)

## 수락 기준

- [ ] `getAllPosts()` 데이터를 테이블로 렌더링
- [ ] 컬럼: 제목(링크), 카테고리, 발행일, 상태 뱃지, 액션(빈 칸 — Task 021에서 채움)
- [ ] 상태 뱃지: `발행됨` = default, `초안` = secondary/outline variant
- [ ] 발행됨 글 제목 클릭 → `/posts/[slug]` 이동 (새 탭)
- [ ] 상태 필터 탭: 전체 / 발행됨 / 초안
- [ ] 빈 상태 UI: 글이 없을 때 안내 메시지 표시
- [ ] `loading.tsx` 스켈레톤 UI 구현
- [ ] 모바일(375px): 카드 형태 폴백 표시
- [ ] 다크 모드 시각 정상

## 구현 단계

### 단계 1: 기존 UI 컴포넌트 확인

- [ ] `components/ui/table.tsx` API 확인
- [ ] `components/ui/tabs.tsx` API 확인
- [ ] `components/ui/badge.tsx` variant 확인

### 단계 2: PostsTable 클라이언트 컴포넌트 구현

- [ ] `components/dashboard/posts-table.tsx` 신규 생성 (`"use client"`)
- [ ] Props: `posts: Post[]`
- [ ] 상태 필터 탭 구현 (useState로 activeFilter 관리)
- [ ] shadcn/ui Table로 글 목록 렌더링
  - TableHeader: 제목, 카테고리, 발행일, 상태, 액션
  - TableBody: 각 글 행 렌더링
- [ ] 발행됨 글 제목 → `<a href="/posts/{slug}" target="_blank">` 링크
- [ ] 상태 뱃지: `발행됨` → `default`, `초안` → `secondary`
- [ ] 발행일 포맷: `YYYY.MM.DD` 형식
- [ ] 빈 상태: 필터 결과 없을 때 "글이 없습니다" 메시지

### 단계 3: 모바일 카드 폴백 구현

- [ ] `md:hidden` / `hidden md:block` 으로 테이블/카드 분기
- [ ] 모바일 카드: 제목, 상태 뱃지, 발행일, 카테고리 표시

### 단계 4: 페이지 및 로딩 구현

- [ ] `app/dashboard/posts/page.tsx`: `getAllPosts()` 호출 후 `PostsTable`에 전달
- [ ] `app/dashboard/posts/loading.tsx`: Skeleton 컴포넌트로 로딩 UI

### 단계 5: 개발 서버 시각 검증

- [ ] `/dashboard/posts` 접근 → 테이블 렌더링 확인
- [ ] 필터 탭 클릭 → 필터링 동작 확인
- [ ] 발행됨 글 제목 클릭 → 블로그 상세 이동 확인
- [ ] 모바일(375px) 카드 형태 확인
- [ ] 다크 모드 전환 후 시각 확인

## 테스트 체크리스트

- [ ] `/dashboard/posts` 렌더링 → 글 목록 테이블 표시
- [ ] 상태 필터 "발행됨" 클릭 → 발행됨 글만 표시
- [ ] 상태 필터 "초안" 클릭 → 초안 글만 표시
- [ ] 발행됨 글 제목 클릭 → `/posts/[slug]` 이동
- [ ] 빈 상태 메시지 렌더링 확인
- [ ] 모바일 뷰포트(375px) 카드 폴백 표시
- [ ] 다크 모드 테이블/뱃지 가독성 확인
