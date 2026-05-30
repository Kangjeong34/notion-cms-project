# Task 021-1: 공유 기능 E2E 테스트

## 개요

Playwright MCP를 사용하여 공유 메뉴의 전체 E2E 흐름을 검증한다. 클립보드 복사, 한글 URL 인코딩, 초안 비활성화, Toast 알림, HTTPS가 아닌 로컬 환경에서의 fallback 경로를 검증한다.

## 관련 파일

- `app/dashboard/posts/page.tsx`: 공유 메뉴가 통합된 페이지
- `components/dashboard/share-link-menu.tsx`: 공유 메뉴 컴포넌트
- `lib/share.ts`: 공유 링크 생성 유틸리티

## 수락 기준

- [ ] 공유 메뉴 열기 → 항목 클릭 → 클립보드 내용 검증
- [ ] 한글 제목 글의 Twitter URL 인코딩 정상 확인
- [ ] 초안 글 공유 메뉴 비활성화 동작 확인
- [ ] Toast 알림 표시 및 사라짐 확인
- [ ] 로컬(HTTP) 환경에서 fallback 복사 경로 동작 확인

## 구현 단계

### 단계 1: 개발 서버 기동

- [ ] `npm run dev` (port 3000) 실행 확인

### 단계 2: 기본 공유 흐름 테스트

- [ ] `/dashboard/posts` 접근
- [ ] 발행됨 글의 공유 버튼 클릭 → 드롭다운 열림 확인
- [ ] "블로그 링크 복사" 클릭
- [ ] `browser_evaluate`로 클립보드 내용 검증:
  ```js
  await navigator.clipboard.readText()
  // → "http://localhost:3000/posts/[slug]" 형태 확인
  ```
- [ ] Toast 알림 "복사됨" 메시지 표시 확인
- [ ] 일정 시간 후 Toast 사라짐 확인

### 단계 3: Twitter 공유 링크 테스트

- [ ] "Twitter 공유 링크 복사" 클릭
- [ ] 클립보드 내용: `https://twitter.com/intent/tweet?text=...&url=...` 형태 확인
- [ ] 한글 제목이 있는 글에서 `%ED%...` 형태 인코딩 포함 확인

### 단계 4: Facebook 공유 링크 테스트

- [ ] "Facebook 공유 링크 복사" 클릭
- [ ] 클립보드 내용: `https://www.facebook.com/sharer/sharer.php?u=...` 형태 확인

### 단계 5: 초안 비활성화 테스트

- [ ] 초안 글 행에서 공유 버튼 확인
- [ ] `disabled` 속성 또는 숨김 처리 확인
- [ ] 클릭해도 드롭다운 미열림 확인

### 단계 6: Fallback 경로 테스트

- [ ] 로컬 HTTP 환경에서 `navigator.clipboard`가 제한될 수 있음
- [ ] Playwright `browser_evaluate`로 클립보드 권한 허용 후 테스트
- [ ] 또는 fallback `execCommand` 경로 통해 복사 확인

## 테스트 체크리스트

- [ ] 블로그 링크 복사 → `/posts/[slug]` URL 클립보드 저장
- [ ] Twitter 링크 복사 → `twitter.com/intent/tweet` URL 저장
- [ ] Facebook 링크 복사 → `facebook.com/sharer` URL 저장
- [ ] 한글 제목 URL 인코딩 (`encodeURIComponent`) 정상 적용
- [ ] 초안 글 공유 버튼 비활성화 확인
- [ ] Toast 알림 표시 및 자동 사라짐 확인
- [ ] 로컬 환경 fallback 복사 동작 확인
