# Task 023: 성능 최적화 및 번들 점검

## 개요

Phase 1~3에서 추가된 클라이언트 컴포넌트(다크 모드 토글, 관리자 사이드바, 공유 메뉴)의 번들 사이즈를 측정하고, 코드 스플리팅과 `dynamic import` 가능성을 검토한다. Lighthouse로 라이트/다크 모드 각각의 성능 점수를 측정하고 불필요한 리렌더링을 점검한다.

## 관련 파일

- `components/theme/theme-toggle.tsx`: 다크 모드 토글 (클라이언트)
- `components/layout/dashboard-sidebar.tsx`: 사이드바 (클라이언트)
- `components/dashboard/share-link-menu.tsx`: 공유 메뉴 (클라이언트)
- `components/dashboard/posts-table.tsx`: 테이블 (클라이언트)
- `app/dashboard/posts/page.tsx`: 관리자 페이지

## 수락 기준

- [ ] `npm run build` 성공 및 번들 사이즈 측정
- [ ] 관리자 페이지 클라이언트 번들이 불필요하게 공개 페이지에 포함되지 않음
- [ ] `revalidate` 정책 최종 확정 (관리자 60초, 공개 페이지 3600초)
- [ ] Lighthouse 라이트/다크 모드 Performance ≥ 85, Accessibility ≥ 95
- [ ] 불필요한 리렌더링 없음 (`useCallback`/`useMemo` 적절 적용)

## 구현 단계

### 단계 1: 빌드 및 번들 분석

- [ ] `npm run build` 실행 → 빌드 성공 확인
- [ ] 빌드 출력의 First Load JS 크기 확인
- [ ] 관리자 페이지(`/dashboard/**`)와 공개 페이지의 번들 분리 상태 확인

### 단계 2: dynamic import 적용 검토

- [ ] `ShareLinkMenu`: 관리자 페이지에서만 사용 → `dynamic()` 래핑 여부 결정
- [ ] `DashboardSidebar`: 사이드바 전용 → 필요 시 `dynamic()` 적용
- [ ] 공개 페이지에 관리자 번들이 유출되지 않는지 확인

### 단계 3: revalidate 정책 최종 확정

- [ ] `app/dashboard/posts/page.tsx`: `export const revalidate = 60` 설정 확인
- [ ] `app/page.tsx` (홈): `revalidate = 3600` 유지 확인
- [ ] `app/posts/[slug]/page.tsx`: `revalidate = 3600` 유지 확인

### 단계 4: 리렌더링 점검

- [ ] `PostsTable`: `useState` 필터 변경 시 전체 재렌더링 여부 확인
- [ ] `ShareLinkMenu`: 드롭다운 상태 변경이 부모에 영향 없는지 확인
- [ ] 필요 시 `useCallback`으로 핸들러 메모이제이션

### 단계 5: Lighthouse 성능 측정

- [ ] 개발 서버 → 프로덕션 빌드(`npm run build && npm run start`)로 전환
- [ ] 홈(`/`) 라이트 모드 Lighthouse 측정
- [ ] 홈(`/`) 다크 모드 Lighthouse 측정
- [ ] 결과 기록: Performance, Accessibility, Best Practices, SEO 점수

### 단계 6: 최적화 적용 (필요 시)

- [ ] LCP 개선: 히어로 이미지/텍스트 최적화
- [ ] 불필요한 클라이언트 컴포넌트 → 서버 컴포넌트 전환 검토

## 테스트 체크리스트

- [ ] `npm run build` 오류 없이 성공
- [ ] 홈 페이지 Lighthouse Performance ≥ 85
- [ ] 홈 페이지 Lighthouse Accessibility ≥ 95
- [ ] 관리자 페이지 번들이 공개 페이지에 미포함 확인
- [ ] `revalidate` 값 코드에서 확인 (대시보드 60초, 공개 3600초)
- [ ] TypeScript strict 모드 오류 없음
- [ ] ESLint 오류 0건
