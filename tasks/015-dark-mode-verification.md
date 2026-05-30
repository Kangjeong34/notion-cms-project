# Task 015: 다크 모드 전체 페이지 검증

## 개요

Playwright MCP로 라이트/다크 전환 E2E 시나리오를 실행하여 모든 페이지에서 다크 모드가
정상 적용됨을 확인한다. 토글 클릭 → `html.dark` 클래스 부여 → 새로고침 후 유지까지 검증.

## 관련 파일

- `app/page.tsx`: 홈 페이지
- `app/posts/[slug]/page.tsx`: 글 상세 페이지
- `app/categories/page.tsx`: 카테고리 목록 페이지
- `app/categories/[name]/page.tsx`: 카테고리별 글 목록 페이지
- `app/not-found.tsx`: 404 페이지
- `app/loading.tsx`: 로딩 페이지
- `components/layout/navbar.tsx`: ThemeToggle 포함 (데스크톱 + 모바일 Sheet)

## 수락 기준

- [x] 홈(`/`) 다크 모드 전환 및 유지 확인
- [x] 글 상세(`/posts/[slug]`) 다크 모드 시각 확인
- [x] 카테고리 목록(`/categories`) 다크 모드 확인
- [x] 카테고리별 목록(`/categories/[name]`) 다크 모드 확인
- [x] 404 페이지 다크 모드 확인
- [x] 새로고침 후 다크 모드 유지 (`localStorage` 기반)
- [x] 모바일 뷰포트(375px) Sheet ThemeToggle 동작 확인
- [x] ROADMAP.md Phase 1 Task 013~015 ✅ 표시

## 구현 단계

### 단계 1: 개발 서버 기동 확인

- [x] `npm run dev` (port 3000) 기동 확인

### 단계 2: 데스크톱 다크 모드 E2E 테스트

- [x] 홈(`/`) 접근 → 라이트 모드 snapshot
- [x] ThemeToggle 클릭 → 다크 선택
- [x] `document.documentElement.classList.contains("dark")` === true 확인
- [x] 홈 새로고침 → dark 클래스 유지 확인 (localStorage)
- [x] 글 상세 페이지 다크 모드 snapshot
- [x] 카테고리, 카테고리별 목록 다크 모드 snapshot
- [x] 404 페이지(존재하지 않는 경로) 다크 모드 확인

### 단계 3: 모바일 뷰포트 테스트

- [x] 뷰포트 375px 설정
- [x] 햄버거 메뉴 클릭 → Sheet 열기
- [x] Sheet 내 ThemeToggle 표시 확인
- [x] ThemeToggle 클릭 → 라이트 전환 확인

### 단계 4: ROADMAP.md 업데이트

- [x] Phase 1 Task 013~015 모두 ✅ 표시

## 테스트 체크리스트

- [x] 다크 모드 토글 후 `html.dark` 클래스 부여 확인
- [x] 새로고침 후에도 dark 클래스 유지
- [x] 홈/글 상세/카테고리/404 페이지 다크 모드 시각 이상 없음
- [x] 모바일 Sheet ThemeToggle 동작 확인
- [x] 라이트 모드 복귀 정상 동작

## 변경 사항 요약

신규 코드 없음. Playwright MCP E2E 테스트로 기존 구현 검증 완료.
ROADMAP.md에서 Phase 1 완료 표시.
