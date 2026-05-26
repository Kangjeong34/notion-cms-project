# Task 010: 성능 최적화

## 개요

Next.js ISR 캐싱 전략 점검, next/image 최적화, 클라이언트 컴포넌트 번들 점검, Lighthouse LCP 측정, useMemo/useCallback 적용 완성도 검토.
현재 코드에서 `revalidate=3600`, `next/image`, `useMemo`, `React.cache()`는 이미 적용되어 있으므로 점검 및 미세 개선이 주 작업이다.

## 관련 파일

- `app/page.tsx`: ISR revalidate 값 검토
- `app/posts/[slug]/page.tsx`: ISR revalidate 값 검토
- `app/categories/page.tsx`: ISR revalidate 값 검토
- `app/categories/[name]/page.tsx`: ISR revalidate 값 검토
- `components/blog/post-list.tsx`: updateURL useCallback 적용
- `components/blog/notion-renderer.tsx`: next/image sizes 적용 현황 확인
- `lib/notion.ts`: React.cache() 적용 현황 확인

## 수락 기준

- [x] `npm run build`가 오류 없이 완료되고 번들 크기가 출력된다
- [x] PostList의 `updateURL` 함수가 `useCallback`으로 감싸져 있다
- [x] 모든 페이지의 `revalidate` 값이 일관되게 설정되어 있다
- [x] Playwright로 홈페이지 접속 시 LCP가 2.5초 이내로 측정된다 (444ms)
- [x] next/image에 적절한 `sizes` 속성이 설정되어 있다

## 구현 단계

### 단계 1: ISR revalidate 값 검토 및 조정

- [x] 현재 네 페이지 모두 `revalidate = 3600` 확인
- [x] 책 리뷰 블로그 특성상 콘텐츠 변경 빈도가 낮으므로 `86400`(24시간)으로 상향 조정
- [x] 모든 페이지(`app/page.tsx`, `app/posts/[slug]/page.tsx`, `app/categories/page.tsx`, `app/categories/[name]/page.tsx`) 동일 값으로 통일

### 단계 2: useCallback 적용

- [x] `components/blog/post-list.tsx`의 `updateURL` 함수를 `useCallback`으로 래핑
- [x] 의존성 배열: `[searchParams, pathname, router]`

### 단계 3: next/image 및 번들 점검

- [x] `components/blog/notion-renderer.tsx`의 `next/image` sizes 속성 적절성 확인 (`(max-width: 768px) 100vw, 768px`)
- [x] `npm run build` 실행 → 빌드 성공 및 번들 크기 출력 확인 (TypeScript/ESLint 오류 0건)
- [x] PostList 클라이언트 컴포넌트 번들 크기 확인

### 단계 4: React.cache 및 generateStaticParams 확인

- [x] `lib/notion.ts`의 `getPosts()`에 `cache()` 래핑 확인
- [x] `app/posts/[slug]/page.tsx`와 `app/categories/[name]/page.tsx` 모두 `generateStaticParams` 구현 확인

### 단계 5: Lighthouse 성능 측정

- [x] 개발 서버(`npm run dev`) 실행 후 Playwright로 홈페이지 접속
- [x] PerformanceObserver API로 LCP 측정: **444ms** (목표 2.5초 대비 우수)
- [x] LCP 2.5초 이내 달성 확인

## 테스트 체크리스트

- [x] `npm run build`가 오류 0건으로 완료된다
- [x] 홈페이지 초기 로딩 시 LCP가 2.5초 이내로 측정된다 (Playwright 측정: **444ms**)
- [x] 글 상세 페이지(`/posts/[slug]`) 로딩이 정상적으로 빠르게 완료된다
- [x] 이미지가 있는 글 상세 페이지에서 이미지가 최적화된 형태로 로드된다
- [x] PostList에서 검색/필터 변경 시 불필요한 리렌더링이 최소화된다 (useCallback 적용)
