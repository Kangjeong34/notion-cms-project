# 책 리뷰 블로그 고도화 로드맵 (v2)

MVP 완료 이후 사용자 경험과 운영 효율을 끌어올리기 위한 고도화 단계 로드맵

## 개요

책 리뷰 블로그(v1, MVP)는 Notion CMS 연동, 글 목록/상세/카테고리/검색, 페이지네이션, SEO, 접근성(WCAG 2.1 AA), Vercel 배포까지 모두 완료되었습니다 (자세한 내용은 `docs/roadmaps/ROADMAP_v1.md` 참조). 이번 v2 로드맵은 다음 세 가지 고도화 기능에 집중합니다.

- **다크 모드**: 시스템 설정 자동 감지 + 수동 전환 토글로 야간 가독성과 사용자 선호 반영
- **관리자 레이아웃 및 블로그 목록**: `/dashboard` 경로의 사이드바 레이아웃에서 초안 포함 모든 글을 한눈에 관리
- **SNS 공유 링크 복사**: 관리자 글 목록에서 블로그 링크, Twitter/Facebook 공유 링크를 클립보드로 빠르게 복사

## 개발 워크플로우

1. **작업 계획**

   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - 새로운 작업을 포함하도록 `ROADMAP.md` 업데이트
   - 우선순위 작업은 마지막 완료된 작업 다음에 삽입

2. **작업 생성**

   - 기존 코드베이스를 학습하고 현재 상태를 파악
   - `/tasks` 디렉토리에 새 작업 파일 생성
   - 명명 형식: `XXX-description.md` (예: `013-dark-mode-foundation.md`)
   - 고수준 명세서, 관련 파일, 수락 기준, 구현 단계 포함
   - **API/비즈니스 로직 작업 시 "## 테스트 체크리스트" 섹션 필수 포함 (Playwright MCP 테스트 시나리오 작성)**
   - 예시를 위해 `/tasks` 디렉토리의 마지막 완료된 작업 참조 (현재 v1 마지막은 `012`)
   - 완료된 작업의 문서에는 체크된 박스와 변경 사항 요약이 포함됨. 새 작업의 경우 빈 박스로 시작. 초기 상태의 샘플은 `000-sample.md` 참조

3. **작업 구현**

   - 작업 파일의 명세서를 따름
   - 기능과 기능성 구현
   - **API 연동 및 비즈니스 로직 구현 시 Playwright MCP로 테스트 수행 필수**
   - 각 단계 후 작업 파일 내 단계 진행 상황 업데이트
   - 구현 완료 후 Playwright MCP를 사용한 E2E 테스트 실행
   - 테스트 통과 확인 후 다음 단계로 진행
   - 각 단계 완료 후 중단하고 추가 지시를 기다림

4. **로드맵 업데이트**

   - 로드맵에서 완료된 작업을 ✅로 표시

## 사전 컨텍스트 (MVP 완료 항목 요약)

MVP 단계에서 다음 항목들이 이미 구축되어 있으므로, 고도화 단계에서는 이를 적극 재활용합니다.

- 루트 레이아웃에 `ThemeProvider`, `Toaster`(shadcn/ui sonner), `Navbar`, `Footer` 구성 완료
- Notion API 레이어 (`lib/notion.ts`)에 `getPosts`, `getPostBySlug`, `getPostBlocks`, `getCategories` 구현 및 React `cache()` 적용
- 타입 정의 (`types/notion.ts`)에 `Post`, `Category` 등 정의
- 사이트 설정 중앙화 (`lib/config.ts`)
- shadcn/ui 기반 공통 컴포넌트 (`components/ui/`) 구비
- Tailwind CSS v4 + OKLCH 색상 변수 (`globals.css`)
- 접근성(WCAG 2.1 AA) 통과, Vercel 배포 검증 완료

## 개발 단계

### ✅ Phase 1: 다크 모드 구현 (완료)

다크 모드는 ThemeProvider가 이미 루트 레이아웃에 마운트되어 있어 빠르게 완료 가능한 단계입니다. 후속 Phase의 관리자 UI에도 일관되게 적용되어야 하므로 가장 먼저 진행합니다.

- ✅ **Task 013: 다크 모드 CSS 변수 및 테마 토큰 정의** - 우선순위
  - `app/globals.css`의 `:root` 변수와 대응되는 `.dark` 변수 정의 (OKLCH 기반)
  - 배경/전경/카드/보더/뮤티드 등 핵심 토큰의 다크 모드 색상 결정 (WCAG AA 대비 유지)
  - shadcn/ui 컴포넌트(Button, Card, Badge, Input, Sheet, Toast 등)의 다크 모드 시인성 검증
  - 라이트/다크 전환 시 페이지 깜빡임(FOUC) 방지: `suppressHydrationWarning`, 초기 클래스 주입 점검
  - 카테고리 뱃지/태그 등 컬러 토큰이 다크 배경에서 충분한 대비를 가지도록 조정

- ✅ **Task 014: 다크 모드 토글 컴포넌트 및 Navbar 통합**
  - `components/theme/theme-toggle.tsx` 신규 구현 (`useTheme` from `next-themes`)
  - Lucide React `Sun`/`Moon`/`Monitor` 아이콘으로 라이트/다크/시스템 3단계 토글 또는 DropdownMenu 제공
  - 데스크톱 Navbar 우측 + 모바일 Sheet 메뉴 내부 양쪽에 토글 배치
  - 시스템 설정 자동 감지 (`enableSystem`) 및 localStorage 기반 사용자 선택 유지
  - 접근성: `aria-label`, 키보드 포커스 링, 스크린 리더 호환 텍스트(`sr-only`) 보장

- ✅ **Task 015: 다크 모드 전체 페이지 검증**
  - 홈(`/`), 글 상세(`/posts/[slug]`), 카테고리 목록(`/categories`), 카테고리별 목록(`/categories/[name]`), 404/error/loading 페이지의 다크 모드 시각 검증
  - `NotionRenderer` 블록(코드, 인용, 이미지, 구분선, heading 등) 다크 배경에서 가독성 점검
  - Playwright MCP로 라이트/다크 전환 E2E 시나리오 작성 (토글 클릭 → 클래스 변경 → 새로고침 시 유지)
  - 색상 대비 자동 검사 (axe-core 또는 수동 contrast 측정) 4.5:1 이상 유지 확인

### ✅ Phase 2: 관리자 레이아웃 및 블로그 목록 페이지 구현 (완료)

다크 모드가 적용된 디자인 시스템 위에 관리자 영역을 구축합니다. 골격(레이아웃·라우트) → UI(테이블) → 데이터 연동 순으로 구조 우선 접근합니다.

- ✅ **Task 016: 관리자 라우트 골격 및 사이드바 레이아웃 구축** - 우선순위
  - `app/dashboard/layout.tsx` 신규 생성: `SidebarProvider` + `DashboardSidebar` + `SidebarInset` 구성
  - `components/layout/dashboard-sidebar.tsx` 구현 (shadcn/ui Sidebar 기반)
  - 메뉴 항목: 대시보드 홈, 글 목록(`/dashboard/posts`), (확장 대비) 카테고리, 설정
  - `app/dashboard/page.tsx` (대시보드 홈 빈 껍데기), `app/dashboard/posts/page.tsx` 빈 페이지 생성
  - 모바일 반응형 사이드바(Sheet 기반 토글) 동작 확인
  - 루트 레이아웃과의 중첩 동작(Navbar/Footer는 표시 유지 또는 숨김 정책 결정) 확정

- ✅ **Task 017: 관리자용 Notion API 함수 확장**
  - `lib/notion.ts`에 `getAllPosts(options?)` 신규 추가: `Status` 필터 없이 `초안` + `발행됨` 모두 조회
  - 정렬: `Published` 내림차순, 없으면 `Created time` 폴백
  - 샘플 데이터(`lib/sample-data.ts`)에 `Status: "초안"` 항목 1~2개 추가 (오프라인/환경변수 미설정 시 동작 보장)
  - 타입 정의 검토: `Post.status` 유니온 타입(`"초안" | "발행됨"`) 노출 일관성 확인
  - React `cache()` 적용 및 ISR `revalidate` 정책 결정 (관리자 페이지는 짧게, 예: 60초)
  - Playwright MCP로 샘플 데이터 모드와 실제 Notion 모드 양쪽에서 응답 형태 검증

- ✅ **Task 018: 관리자 글 목록 테이블 UI 구현**
  - `app/dashboard/posts/page.tsx`에서 `getAllPosts()` 결과를 테이블로 렌더링
  - shadcn/ui Table 컴포넌트 사용: 컬럼은 제목, 카테고리, 발행일, 상태(뱃지), 액션
  - 상태 뱃지: `발행됨` = 기본 색상, `초안` = secondary/outline 변형
  - 빈 상태(글이 없을 때) UI 및 로딩(`loading.tsx`) 처리
  - 발행됨 글의 제목에 실제 블로그 글 상세 페이지로 연결되는 링크 제공
  - 클라이언트 사이드 정렬/필터 UI(상태별 필터 탭) 추가 — 선택 사항이지만 우선순위 높음
  - 반응형: 모바일에서는 카드 형태로 폴백 표시

- ✅ **Task 018-1: 관리자 목록 통합 테스트**
  - Playwright MCP로 `/dashboard/posts` 접근 → 글 목록 렌더링 확인
  - 초안/발행됨 상태 필터 동작 검증
  - 발행됨 글 제목 클릭 → 블로그 상세 페이지 이동 검증
  - 사이드바 토글(모바일/데스크톱), 다크 모드 적용 상태에서 시각 검증
  - 빈 상태/에러 상태 핸들링 확인

### ✅ Phase 3: SNS 공유 링크 복사 기능 구현 (완료)

관리자 글 목록의 각 행에서 블로그 직접 링크와 SNS 공유 링크를 클립보드로 빠르게 복사할 수 있도록 구현합니다.

- ✅ **Task 019: 공유 링크 생성 유틸리티 구현**
  - `lib/share.ts` 신규 작성: 글의 slug와 사이트 base URL로 다음 링크 생성
    - 블로그 직접 링크: `${siteUrl}/posts/${slug}`
    - Twitter(X) 공유 링크: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
    - Facebook 공유 링크: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
  - base URL은 환경 변수(`NEXT_PUBLIC_SITE_URL`) 또는 `lib/config.ts`의 `siteConfig.url`에서 안전하게 가져옴
  - URL 인코딩(`encodeURIComponent`) 처리 — 한글 제목/slug 안전 보장
  - 단위 테스트성 순수 함수로 작성 (입력→출력 결정적)

- ✅ **Task 020: 공유 메뉴 컴포넌트 (`ShareLinkMenu`) 구현**
  - `components/dashboard/share-link-menu.tsx` 신규 구현
  - shadcn/ui DropdownMenu 또는 Popover 사용, 트리거는 Lucide `Share2` 또는 `Link` 아이콘 버튼
  - 메뉴 항목: "블로그 링크 복사", "Twitter 공유 링크 복사", "Facebook 공유 링크 복사"
  - 각 항목 클릭 시 `navigator.clipboard.writeText()` 호출 및 Toast(sonner) 알림 표시
  - 클립보드 API 실패/미지원 환경 대비 fallback: `document.execCommand('copy')` 또는 입력창 노출
  - 초안 글에는 공유 메뉴 비활성화 또는 숨김 처리 (발행되지 않은 글 노출 방지)
  - 접근성: 버튼 `aria-label`, 메뉴 키보드 내비게이션 보장

- ✅ **Task 021: 관리자 글 목록 테이블에 공유 메뉴 통합**
  - Task 018에서 만든 테이블의 "액션" 컬럼에 `ShareLinkMenu` 삽입
  - 각 행의 글 정보(slug, title, status)를 `ShareLinkMenu`에 props로 전달
  - 모바일 카드 폴백 뷰에도 동일한 공유 메뉴 배치
  - 다크 모드 + 라이트 모드 양쪽에서 드롭다운/토스트 가독성 점검

- ✅ **Task 021-1: 공유 기능 E2E 테스트**
  - Playwright MCP로 공유 메뉴 열기 → 항목 클릭 → 클립보드 내용 검증(`browser_evaluate`로 `navigator.clipboard.readText()` 호출)
  - 한글 제목 글에 대한 URL 인코딩 정상 동작 확인
  - 초안 글에서 공유 메뉴 비활성화/숨김 동작 검증
  - Toast 알림 표시 및 사라짐 검증
  - HTTPS가 아닌 로컬 환경에서 fallback 경로 검증

### ✅ Phase 4: 고도화 통합 검증 및 최적화 (완료)

세 가지 기능이 모두 적용된 상태에서 종합 품질을 점검하고 운영 준비를 마무리합니다.

- ✅ **Task 022: 통합 회귀 테스트 및 접근성 재검증**
  - Playwright MCP로 다크 모드 토글 → 관리자 진입 → 글 목록 조회 → 공유 링크 복사까지 전체 플로우 E2E
  - 모바일(375px) / 태블릿(768px) / 데스크톱(1280px) 3개 뷰포트에서 시각 회귀 점검
  - 사이드바/네비/테이블/공유 메뉴의 키보드 내비게이션 및 포커스 순서 확인
  - axe-core 또는 수동 검사로 WCAG 2.1 AA 색상 대비 재검증 (다크 모드 포함)
  - MVP에서 통과했던 핵심 시나리오(홈→상세→뒤로가기, 카테고리, 404)도 회귀 확인

- ✅ **Task 023: 성능 최적화 및 번들 점검**
  - 관리자 페이지의 클라이언트 컴포넌트 번들 사이즈 측정 및 코드 스플리팅 점검
  - 다크 모드 토글 / 공유 메뉴 / 사이드바 등 신규 클라이언트 컴포넌트의 `dynamic import` 가능성 검토
  - 관리자 페이지 `revalidate` 정책 최종 확정 (예: 60~300초, 또는 `revalidateTag` 도입 검토)
  - Lighthouse 측정: 라이트/다크 모드 각각에서 Performance, Accessibility, Best Practices, SEO 점수 확인
  - 불필요한 리렌더링 점검: `useCallback`, `useMemo` 적절 적용

- ✅ **Task 024: 문서화 및 배포 마무리**
  - `README.md`에 다크 모드, 관리자 페이지(`/dashboard/posts`), 공유 기능 사용법 추가
  - 환경 변수 가이드 업데이트: `NEXT_PUBLIC_SITE_URL` 등 신규 변수 명시 (`.env.example` 갱신)
  - 관리자 페이지 접근에 대한 보안 고려사항 문서화 (현재 MVP 범위에서는 인증 미적용 — 후속 작업 안내)
  - Vercel 환경 변수 재점검 및 프로덕션 배포 검증
  - `docs/ROADMAP.md`에서 완료된 모든 Task에 ✅ 표시 및 회고 노트 추가

---

## 향후 고려(아웃 오브 스코프)

- **관리자 인증/권한**: 현재 v2 범위에는 인증을 포함하지 않습니다. 향후 NextAuth 또는 단순 비밀번호 보호 미들웨어 도입을 고려합니다.
- **글 작성/수정 기능**: Notion이 1차 작성 도구이므로 v2에서는 읽기 전용 관리자만 제공합니다.
- **카카오톡/링크드인 등 추가 SNS**: Twitter/Facebook 외 채널은 후속 확장 시 검토합니다.
- **RSS 피드, 댓글, 북마크**: PRD v1의 MVP 제외 항목으로 별도 로드맵에서 다룹니다.
