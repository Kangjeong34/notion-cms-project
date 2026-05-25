# Task 006: 페이지네이션 구현

## 개요

홈페이지 글 목록과 카테고리별 글 목록에 페이지네이션을 추가한다.
shadcn/ui Pagination 컴포넌트를 활용하고, 검색/카테고리 필터 상태와 페이지 상태를 연동한다.

## 관련 파일

- `components/blog/post-list.tsx`: 페이지네이션 UI 및 로직 추가
- `app/categories/[name]/page.tsx`: 카테고리별 글 목록 페이지네이션 적용
- `components/ui/pagination.tsx`: shadcn/ui Pagination 컴포넌트 (설치 필요)

## 수락 기준

- [ ] 홈페이지 글 목록에서 페이지당 9개 글이 표시된다
- [ ] 페이지 번호 클릭 시 해당 페이지의 글로 이동한다
- [ ] 카테고리 필터 또는 검색어 변경 시 페이지가 1로 리셋된다
- [ ] 카테고리별 글 목록 페이지에도 동일한 페이지네이션이 적용된다
- [ ] 전체 글 수가 9개 이하일 때 페이지네이션이 표시되지 않는다
- [ ] 현재 페이지, 이전/다음 버튼이 올바르게 동작한다

## 구현 단계

### 단계 1: shadcn/ui Pagination 컴포넌트 설치

- [ ] `npx shadcn@latest add pagination` 실행
- [ ] `components/ui/pagination.tsx` 생성 확인

### 단계 2: PostList 페이지네이션 로직 추가

- [ ] `POSTS_PER_PAGE = 9` 상수 정의
- [ ] `currentPage` 상태 추가 (`useState(1)`)
- [ ] 카테고리/검색어 변경 시 `currentPage`를 1로 리셋하는 `useEffect` 추가
- [ ] `filteredPosts`를 페이지에 맞게 슬라이싱하는 `paginatedPosts` 계산
- [ ] 전체 페이지 수 계산: `Math.ceil(filteredPosts.length / POSTS_PER_PAGE)`

### 단계 3: Pagination UI 렌더링

- [ ] `PostList` 컴포넌트 하단에 Pagination 컴포넌트 추가
- [ ] `PaginationPrevious`, `PaginationNext`, `PaginationLink` 활용
- [ ] 페이지 수가 1 이하이면 Pagination 미표시
- [ ] 현재 페이지 번호 강조 (`isActive` prop 활용)
- [ ] 페이지 수가 많을 때 `PaginationEllipsis` 표시 (5페이지 이상 시)

### 단계 4: 카테고리별 글 목록 페이지네이션

- [ ] `app/categories/[name]/page.tsx`에서 `PostList`가 이미 사용 중이므로 자동 적용 확인
- [ ] 카테고리 페이지에서 페이지네이션 동작 검증

## 테스트 체크리스트

- [ ] 홈페이지 접속 시 최대 9개의 글 카드만 표시된다
- [ ] 2페이지 클릭 시 다음 9개 글이 표시된다
- [ ] 카테고리 필터 클릭 시 페이지가 1로 리셋된다
- [ ] 검색어 입력 시 페이지가 1로 리셋된다
- [ ] 글이 9개 이하일 때 페이지네이션 UI가 표시되지 않는다
- [ ] 카테고리별 글 목록(`/categories/[name]`)에서도 페이지네이션이 동작한다
