# Task 024: 문서화 및 배포 마무리

## 개요

`README.md`에 다크 모드, 관리자 페이지, 공유 기능 사용법을 추가하고, 환경 변수 가이드를 업데이트한다. 관리자 페이지 보안 고려사항을 문서화하고, Vercel 환경 변수를 재점검하여 프로덕션 배포를 검증한다. `docs/ROADMAP.md`에서 모든 완료 Task에 ✅ 표시를 하고 회고 노트를 추가한다.

## 관련 파일

- `README.md`: 사용법 문서 업데이트
- `.env.example`: 신규 환경 변수 추가
- `docs/ROADMAP.md`: 완료 Task ✅ 표시 및 회고 노트

## 수락 기준

- [ ] `README.md`에 다크 모드 사용법 추가
- [ ] `README.md`에 관리자 페이지(`/dashboard/posts`) 접근 방법 추가
- [ ] `README.md`에 공유 기능 설명 추가
- [ ] `.env.example`에 `NEXT_PUBLIC_SITE_URL` 추가
- [ ] 관리자 페이지 보안 고려사항 문서화 (인증 미적용 안내)
- [ ] Vercel 환경 변수 재점검 (`NEXT_PUBLIC_SITE_URL` 추가)
- [ ] 프로덕션 배포 후 주요 페이지 동작 확인
- [ ] `docs/ROADMAP.md` Phase 2~4 모든 완료 Task ✅ 표시

## 구현 단계

### 단계 1: README.md 업데이트

- [ ] 기존 README.md 내용 확인
- [ ] **다크 모드** 섹션 추가:
  - 시스템 설정 자동 감지, Navbar 토글로 수동 전환 설명
- [ ] **관리자 페이지** 섹션 추가:
  - `/dashboard/posts` 경로 안내
  - 초안 포함 전체 글 목록 확인 가능
  - 보안 주의: 현재 인증 없음, 프로덕션 배포 시 접근 제어 권고
- [ ] **공유 기능** 섹션 추가:
  - 발행됨 글의 공유 버튼 → 블로그/Twitter/Facebook 링크 복사

### 단계 2: .env.example 업데이트

- [ ] `NEXT_PUBLIC_SITE_URL=https://your-domain.com` 추가
- [ ] 기존 변수(`NOTION_API_KEY`, `NOTION_DATABASE_ID`) 유지
- [ ] 각 변수에 한 줄 주석으로 용도 설명

### 단계 3: 보안 고려사항 문서화

- [ ] README.md 또는 `docs/SECURITY.md`에 관리자 페이지 보안 안내:
  - 현재 MVP 범위에서는 `/dashboard` 경로에 인증 미적용
  - Vercel 환경에서 접근 제어 방법 안내 (IP 제한, 패스워드 미들웨어 등)
  - 향후 NextAuth 도입 계획 언급

### 단계 4: Vercel 환경 변수 재점검

- [ ] Vercel 대시보드에서 `NEXT_PUBLIC_SITE_URL` 추가 (실제 배포 도메인)
- [ ] `NOTION_API_KEY`, `NOTION_DATABASE_ID` 설정 유지 확인

### 단계 5: 프로덕션 배포 검증

- [ ] Vercel에 최신 코드 배포 (`git push` → 자동 배포)
- [ ] 배포 후 주요 페이지 동작 확인:
  - 홈(`/`): 글 목록 렌더링
  - 글 상세(`/posts/[slug]`): 내용 렌더링
  - 카테고리(`/categories`): 카테고리 목록
  - 관리자(`/dashboard/posts`): 글 목록 테이블
  - 다크 모드 전환: 새로고침 후 유지
  - 공유 링크 복사: Toast 알림 및 올바른 URL

### 단계 6: ROADMAP.md 완료 표시

- [ ] `docs/ROADMAP.md` 열기
- [ ] Phase 2 Task 016~018-1 모두 ✅ 표시
- [ ] Phase 3 Task 019~021-1 모두 ✅ 표시
- [ ] Phase 4 Task 022~024 모두 ✅ 표시
- [ ] 각 Phase 하단에 간단한 회고 노트 추가

## 테스트 체크리스트

- [ ] README.md에 다크 모드/관리자/공유 기능 설명 포함
- [ ] `.env.example`에 `NEXT_PUBLIC_SITE_URL` 추가
- [ ] Vercel 환경 변수에 `NEXT_PUBLIC_SITE_URL` 설정
- [ ] 프로덕션 홈 페이지 정상 렌더링
- [ ] 프로덕션 관리자 페이지 정상 접근
- [ ] 프로덕션 공유 링크 올바른 도메인 포함 확인
- [ ] `docs/ROADMAP.md` 모든 Phase 2~4 ✅ 표시 완료
