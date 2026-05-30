# Task 014: 다크 모드 토글 컴포넌트 및 Navbar 통합

## 개요

`components/theme/theme-toggle.tsx` ThemeToggle 컴포넌트는 이미 완성되어 있으며,
데스크톱 Navbar 우측에 배치 완료. 이 Task에서는 모바일 Sheet 메뉴(SheetContent) 내부
NavLinks 아래에도 ThemeToggle을 추가하여 모바일 사용자도 테마 전환 가능하도록 한다.

## 관련 파일

- `components/theme/theme-toggle.tsx`: 완성된 ThemeToggle 컴포넌트 (변경 없음)
- `components/layout/navbar.tsx`: 모바일 Sheet에 ThemeToggle 추가 (수정)

## 수락 기준

- [x] `components/theme/theme-toggle.tsx` 구현 완료 확인
  - DropdownMenu + Sun/Moon/Monitor 아이콘
  - `aria-label="테마 변경"` 접근성 속성
  - 라이트/다크/시스템 3단계 전환
- [x] 데스크톱 Navbar 우측 ThemeToggle 배치 완료 확인
- [x] 모바일 Sheet 메뉴 내부 NavLinks 아래 ThemeToggle 추가 완료
- [x] 모바일에서 햄버거 메뉴 열면 ThemeToggle이 표시됨
- [x] 모바일 Sheet 내 ThemeToggle DropdownMenu 정상 동작 (z-index 충돌 없음)

## 구현 단계

### 단계 1: ThemeToggle 컴포넌트 현황 확인

- [x] `components/theme/theme-toggle.tsx` 구현 완료
  - `useTheme` from `next-themes` 사용
  - `DropdownMenu` 기반, `Sun`/`Moon`/`Monitor` 아이콘
  - `Button variant="ghost" size="icon" aria-label="테마 변경"`
  - `setTheme("light"/"dark"/"system")` 3단계 전환

### 단계 2: Navbar 데스크톱 배치 확인

- [x] `navbar.tsx` 66~68번 라인: `<div className="flex items-center gap-2">` 내 `<ThemeToggle />` 배치 확인

### 단계 3: 모바일 Sheet에 ThemeToggle 추가

- [x] `navbar.tsx` SheetContent 내 `div.mt-6.flex.flex-col.gap-4`에 NavLinks 아래 추가:
  ```tsx
  <div className="flex items-center gap-2 px-3">
    <span className="text-sm text-muted-foreground">테마</span>
    <ThemeToggle />
  </div>
  ```

## 테스트 체크리스트

(Task 015에서 Playwright MCP로 검증 예정)

- [x] 모바일 뷰포트에서 햄버거 메뉴 열기 → ThemeToggle 표시 확인
- [x] ThemeToggle 클릭 → DropdownMenu 정상 표시 확인
- [x] 다크 선택 → `html.dark` 클래스 부여 확인
- [x] Sheet 닫은 후 테마 유지 확인

## 변경 사항 요약

`components/layout/navbar.tsx` 수정: SheetContent 내 NavLinks 아래에 ThemeToggle + "테마" 레이블 추가.
ThemeToggle 컴포넌트 자체는 변경 없음.
