# Task 016: 관리자 라우트 골격 및 사이드바 레이아웃 구축

## 개요

`app/dashboard/` 경로에 관리자 레이아웃을 구성한다. `SidebarProvider` + `DashboardSidebar` + `SidebarInset` 구조로 사이드바 레이아웃을 구축하고, 대시보드 홈과 글 목록 페이지의 빈 껍데기를 생성한다. 모바일 반응형 사이드바(Sheet 기반 토글) 동작을 확인한다.

## 관련 파일

- `app/dashboard/layout.tsx`: 신규 생성 — SidebarProvider + DashboardSidebar + SidebarInset
- `app/dashboard/page.tsx`: 신규 생성 — 대시보드 홈 빈 껍데기
- `app/dashboard/posts/page.tsx`: 신규 생성 — 글 목록 빈 페이지
- `components/layout/dashboard-sidebar.tsx`: 신규 생성 — shadcn/ui Sidebar 기반
- `app/layout.tsx`: 루트 레이아웃 — Navbar/Footer 표시 정책 확인
- `components/ui/sidebar.tsx`: shadcn/ui Sidebar 컴포넌트 (이미 존재)

## 수락 기준

- [ ] `app/dashboard/layout.tsx` 생성 및 SidebarProvider/SidebarInset 구조 완성
- [ ] `components/layout/dashboard-sidebar.tsx` 구현 (메뉴: 대시보드 홈, 글 목록)
- [ ] `/dashboard` 접근 시 사이드바 레이아웃 정상 렌더링
- [ ] `/dashboard/posts` 접근 시 빈 페이지 정상 렌더링
- [ ] 데스크톱: 사이드바 고정 표시
- [ ] 모바일(375px): 햄버거 아이콘 클릭 → Sheet 형태 사이드바 열기/닫기
- [ ] 다크 모드에서 사이드바 정상 표시
- [ ] Navbar/Footer 표시 정책 확정 (루트 레이아웃 중첩 — 표시 유지)

## 구현 단계

### 단계 1: 기존 사이드바 컴포넌트 확인

- [ ] `components/ui/sidebar.tsx` 존재 여부 및 API 확인
- [ ] `app/layout.tsx`에서 Navbar/Footer 구조 파악
- [ ] 기존 dashboard 관련 파일 유무 확인

### 단계 2: DashboardSidebar 컴포넌트 구현

- [ ] `components/layout/dashboard-sidebar.tsx` 신규 생성
- [ ] shadcn/ui `Sidebar`, `SidebarContent`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton` 사용
- [ ] 메뉴 항목 구성:
  - 대시보드 (`/dashboard`) — LayoutDashboard 아이콘
  - 글 목록 (`/dashboard/posts`) — FileText 아이콘
- [ ] 현재 활성 경로 하이라이트 (`usePathname` 사용)
- [ ] 사이트명/로고 영역 (`SidebarHeader`) 추가

### 단계 3: 대시보드 레이아웃 구현

- [ ] `app/dashboard/layout.tsx` 신규 생성
- [ ] `SidebarProvider` 로 전체 래핑
- [ ] `DashboardSidebar` 배치
- [ ] `SidebarInset` 으로 메인 콘텐츠 영역 구성
- [ ] `SidebarTrigger` (모바일 햄버거 버튼) 추가

### 단계 4: 페이지 골격 생성

- [ ] `app/dashboard/page.tsx` 생성 — "관리자 대시보드" 제목만 있는 빈 페이지
- [ ] `app/dashboard/posts/page.tsx` 생성 — "글 목록" 제목만 있는 빈 페이지

### 단계 5: Playwright MCP 동작 검증

- [ ] 개발 서버 기동 확인
- [ ] `/dashboard` 접근 → 사이드바 + 콘텐츠 영역 렌더링 확인
- [ ] `/dashboard/posts` 링크 클릭 → 페이지 이동 확인
- [ ] 모바일 뷰포트(375px) 에서 SidebarTrigger 클릭 → Sheet 사이드바 동작 확인
- [ ] 다크 모드 전환 후 사이드바 시각 확인

## 테스트 체크리스트

- [ ] `/dashboard` 라우트 접근 → 200 응답 및 사이드바 표시
- [ ] `/dashboard/posts` 라우트 접근 → 200 응답
- [ ] 사이드바 메뉴 클릭 → 해당 페이지로 이동
- [ ] 모바일(375px) Sheet 사이드바 열기/닫기 동작
- [ ] 다크 모드에서 사이드바 색상 정상 표시
- [ ] 활성 메뉴 항목 하이라이트 표시
