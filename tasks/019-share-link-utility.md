# Task 019: 공유 링크 생성 유틸리티 구현

## 개요

`lib/share.ts`를 신규 작성하여 글의 slug와 사이트 base URL로 블로그 직접 링크, Twitter(X) 공유 링크, Facebook 공유 링크를 생성하는 순수 함수를 구현한다. 한글 제목/slug의 URL 인코딩을 보장하고, 환경 변수에서 안전하게 base URL을 가져온다.

## 관련 파일

- `lib/share.ts`: 신규 생성 — 공유 링크 생성 유틸리티
- `lib/config.ts`: `siteConfig.url` 확인 및 활용
- `types/notion.ts`: `Post` 타입 참조

## 수락 기준

- [ ] `lib/share.ts` 신규 생성
- [ ] `getBlogUrl(slug)` — 블로그 직접 링크 생성
- [ ] `getTwitterShareUrl(slug, title)` — Twitter(X) 공유 링크 생성
- [ ] `getFacebookShareUrl(slug)` — Facebook 공유 링크 생성
- [ ] base URL: `NEXT_PUBLIC_SITE_URL` 환경 변수 → 없으면 `siteConfig.url` 폴백
- [ ] `encodeURIComponent` 적용 — 한글 제목/slug 안전 처리
- [ ] 순수 함수 (입력→출력 결정적, 사이드이펙트 없음)
- [ ] TypeScript 타입 안전성 보장

## 구현 단계

### 단계 1: 기존 설정 파악

- [ ] `lib/config.ts`의 `siteConfig.url` 값 확인
- [ ] `NEXT_PUBLIC_SITE_URL` 환경 변수 사용 여부 확인
- [ ] `.env.local` 및 `.env.example` 파일 확인

### 단계 2: lib/share.ts 구현

- [ ] base URL 결정 로직:
  ```ts
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url
  ```
- [ ] `getBlogUrl(slug: string): string` 구현
  - 반환: `${baseUrl}/posts/${encodeURIComponent(slug)}`
- [ ] `getTwitterShareUrl(slug: string, title: string): string` 구현
  - 반환: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(getBlogUrl(slug))}`
- [ ] `getFacebookShareUrl(slug: string): string` 구현
  - 반환: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getBlogUrl(slug))}`

### 단계 3: 환경 변수 설정

- [ ] `.env.example`에 `NEXT_PUBLIC_SITE_URL=https://your-domain.com` 추가
- [ ] 로컬 개발 시 `NEXT_PUBLIC_SITE_URL=http://localhost:3000` 설정 (`.env.local`)

### 단계 4: 동작 검증

- [ ] 한글 제목 (`"자기계발 도서 리뷰"`) 로 Twitter URL 생성 → 인코딩 확인
- [ ] 한글 slug 포함 URL → 인코딩 확인
- [ ] 영문 slug URL → 정상 생성 확인

## 테스트 체크리스트

- [ ] `getBlogUrl("my-slug")` → `${baseUrl}/posts/my-slug`
- [ ] `getTwitterShareUrl("slug", "한글 제목")` → `%ED%95%9C%EA%B8%80` 인코딩 포함
- [ ] `getFacebookShareUrl("slug")` → 올바른 Facebook sharer URL
- [ ] base URL 폴백: 환경 변수 없을 때 `siteConfig.url` 사용
- [ ] TypeScript 컴파일 오류 없음
