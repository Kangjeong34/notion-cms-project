---
name: recurring-issues
description: 이 프로젝트에서 발견된 반복적 코드 이슈 패턴 및 해결책
metadata:
  type: project
---

## Critical: form.tsx의 패키지 import 불일치

`components/ui/form.tsx` 4-5번째 줄에서 `@radix-ui/react-label`과 `@radix-ui/react-slot` 개별 패키지를 import하고 있음.
프로젝트 표준은 `radix-ui` 단일 패키지 사용 (`Slot.Root` 패턴).
다른 모든 UI 컴포넌트(`button.tsx`, `badge.tsx`, `sidebar.tsx`, `label.tsx`)는 `radix-ui`에서 import함.
현재 `@radix-ui/*` 패키지들이 `node_modules`에 실제로 존재하여(peer deps로 설치) 동작은 하나,
패키지 불일치로 버전 충돌 위험성 있음.

**수정:** `form.tsx`에서 `import * as LabelPrimitive from "@radix-ui/react-label"` → `import { Label as LabelPrimitive } from "radix-ui"`, `import { Slot } from "@radix-ui/react-slot"` → `import { Slot } from "radix-ui"` 후 `<Slot.Root>` 패턴 사용

## Major: Navbar 브레이크포인트 불일치

`navbar.tsx` 46번째 줄: `useMediaQuery("(max-width: 768px)")` 사용
`hooks/use-mobile.ts`: `useMediaQuery("(max-width: 767px)")` (768 - 1 = 767)
두 기준이 달라 768px 정확히 해당하는 뷰포트에서 데스크탑/모바일 레이아웃이 동시에 활성화될 수 있음.
**수정:** `navbar.tsx`에서 `useIsMobile()` 훅 사용으로 통일

## Minor: 배열 인덱스를 React key로 사용

- `app/dashboard/page.tsx` 118번째 줄: `key={i}` (활동 로그 map)
- `app/dashboard/docs/page.tsx` 193번째 줄: `key={i}` (FAQ AccordionItem)
- `app/loading.tsx` 12번째 줄: `key={i}` (Skeleton 반복)
정적 데이터라 큰 문제는 없으나, 데이터 변경 시 버그 가능성 있음.

## Minor: 미사용 파라미터

`app/settings/page.tsx` 123번째 줄: `NotificationForm.onSubmit(data)` — `data` 파라미터 미사용.
**수정:** `function onSubmit(_data: NotificationValues)` 또는 실제 활용

## Minor: href="#" 더미 링크

- `app/(auth)/sign-in/page.tsx` 81번째 줄: "비밀번호 찾기" 링크
- `app/(auth)/sign-up/page.tsx` 116, 120번째 줄: "이용약관", "개인정보 처리방침" 링크
스타터킷 특성상 의도적이나, 접근성 측면에서 `button` 타입이나 `aria-disabled` 처리 권장

## Minor: container max-width 불일치

- `app/page.tsx`, `app/loading.tsx`: `max-w-screen-xl` (1280px)
- `components/layout/navbar.tsx`, `components/layout/footer.tsx`: `max-w-screen-2xl` (1536px)
Navbar/Footer와 콘텐츠 영역의 최대 너비가 달라 넓은 화면에서 시각적 불일치 발생 가능
