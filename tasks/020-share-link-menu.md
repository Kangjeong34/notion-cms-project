# Task 020: 공유 메뉴 컴포넌트 (ShareLinkMenu) 구현

## 개요

`components/dashboard/share-link-menu.tsx`를 신규 구현한다. shadcn/ui DropdownMenu를 트리거로, 클릭 시 `navigator.clipboard.writeText()`로 링크를 복사하고 sonner Toast 알림을 표시한다. 초안 글에는 메뉴를 비활성화/숨김 처리한다.

## 관련 파일

- `components/dashboard/share-link-menu.tsx`: 신규 생성
- `lib/share.ts`: 공유 링크 생성 함수 (Task 019에서 구현)
- `components/ui/dropdown-menu.tsx`: shadcn/ui DropdownMenu
- `components/ui/button.tsx`: 트리거 버튼
- `app/layout.tsx`: Toaster(sonner) 이미 마운트됨

## 수락 기준

- [ ] `ShareLinkMenu` 컴포넌트 구현 (`"use client"`)
- [ ] Props: `slug: string`, `title: string`, `status: "초안" | "발행됨"`
- [ ] 트리거: Lucide `Share2` 아이콘 버튼 (ghost variant)
- [ ] 드롭다운 메뉴 항목:
  - "블로그 링크 복사" (Link 아이콘)
  - "Twitter 공유 링크 복사" (Twitter 아이콘 또는 텍스트)
  - "Facebook 공유 링크 복사" (Facebook 아이콘 또는 텍스트)
- [ ] 클릭 시 `navigator.clipboard.writeText()` + sonner `toast.success()` 호출
- [ ] 클립보드 API 실패 시 fallback: `document.execCommand('copy')`
- [ ] `status === "초안"` 인 경우 트리거 버튼 비활성화 (`disabled`) 또는 숨김
- [ ] 접근성: `aria-label`, 키보드 내비게이션 지원

## 구현 단계

### 단계 1: 기존 컴포넌트 확인

- [ ] `components/ui/dropdown-menu.tsx` API 확인
- [ ] sonner toast 사용 방식 확인 (`import { toast } from "sonner"`)
- [ ] Lucide React 아이콘 (`Share2`, `Link`, `Copy`) 존재 확인

### 단계 2: ShareLinkMenu 컴포넌트 구현

- [ ] `components/dashboard/share-link-menu.tsx` 신규 생성
- [ ] `"use client"` 선언
- [ ] Props 타입 정의: `{ slug: string; title: string; status: "초안" | "발행됨" }`
- [ ] DropdownMenu 구조:
  ```
  DropdownMenu
    DropdownMenuTrigger → Button (Share2 아이콘)
    DropdownMenuContent
      DropdownMenuItem → "블로그 링크 복사"
      DropdownMenuSeparator
      DropdownMenuItem → "Twitter 공유 링크 복사"
      DropdownMenuItem → "Facebook 공유 링크 복사"
  ```
- [ ] 각 항목 클릭 핸들러: `copyToClipboard(url)` 호출
- [ ] `copyToClipboard` 함수:
  ```ts
  async function copyToClipboard(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    toast.success(`${label} 복사됨`)
  }
  ```

### 단계 3: 초안 비활성화 처리

- [ ] `status === "초안"` 조건 처리:
  - 옵션 A: 트리거 버튼에 `disabled` prop 적용 + tooltip으로 이유 설명
  - 옵션 B: `status === "발행됨"` 일 때만 컴포넌트 렌더링

### 단계 4: 접근성 처리

- [ ] 트리거 버튼에 `aria-label="공유 링크 복사"` 추가
- [ ] DropdownMenu 키보드 내비게이션 (shadcn/ui 기본 지원) 확인

### 단계 5: 개발 서버 시각 검증

- [ ] ShareLinkMenu 독립 렌더링 테스트 (임시로 페이지에 삽입)
- [ ] 발행됨 글: 드롭다운 열기 → 항목 클릭 → 토스트 표시 확인
- [ ] 초안 글: 버튼 비활성화 확인
- [ ] 다크 모드에서 드롭다운 가독성 확인

## 테스트 체크리스트

- [ ] 트리거 버튼 클릭 → 드롭다운 메뉴 열기
- [ ] "블로그 링크 복사" 클릭 → 클립보드에 `/posts/[slug]` URL 저장
- [ ] "Twitter 공유 링크 복사" 클릭 → Twitter intent URL 저장
- [ ] "Facebook 공유 링크 복사" 클릭 → Facebook sharer URL 저장
- [ ] 복사 후 sonner 토스트 알림 표시
- [ ] 초안 글 → 트리거 버튼 비활성화
- [ ] 키보드로 드롭다운 항목 내비게이션 가능
- [ ] 다크 모드 드롭다운 가독성 정상
