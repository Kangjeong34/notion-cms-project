# Task 017: 관리자용 Notion API 함수 확장

## 개요

`lib/notion.ts`에 `getAllPosts()` 함수를 추가한다. 기존 `getPosts()`는 `Status === "발행됨"` 필터를 적용하지만, `getAllPosts()`는 초안 포함 모든 글을 반환한다. 오프라인/환경변수 미설정 환경을 위한 샘플 데이터에도 초안 항목을 추가한다.

## 관련 파일

- `lib/notion.ts`: `getAllPosts()` 함수 신규 추가
- `lib/sample-data.ts`: 초안 항목 1~2개 추가 (존재하지 않으면 신규 생성)
- `types/notion.ts`: `Post.status` 유니온 타입 확인

## 수락 기준

- [ ] `getAllPosts(options?)` 함수 추가 — Status 필터 없이 전체 조회
- [ ] 정렬: Published 내림차순, 없으면 Created time 폴백
- [ ] 샘플 데이터에 `status: "초안"` 항목 최소 1개 포함
- [ ] `Post.status` 타입이 `"초안" | "발행됨"` 유니온으로 정의됨
- [ ] React `cache()` 적용
- [ ] 관리자 페이지용 `revalidate` 값 결정 (60초)
- [ ] 실제 Notion API 미설정 시 샘플 데이터로 폴백 동작 확인

## 구현 단계

### 단계 1: 기존 코드 파악

- [ ] `lib/notion.ts`의 `getPosts()` 구현 방식 확인
- [ ] `types/notion.ts`의 `Post` 타입 확인 (`status` 필드 포함 여부)
- [ ] 샘플 데이터 파일 존재 여부 및 구조 확인
- [ ] 환경변수 폴백 패턴 확인

### 단계 2: types/notion.ts 검토 및 수정

- [ ] `Post.status` 필드가 `"초안" | "발행됨"` 유니온으로 정의되어 있는지 확인
- [ ] 필요 시 타입 수정

### 단계 3: getAllPosts() 함수 구현

- [ ] `lib/notion.ts`에 `getAllPosts()` 추가
- [ ] Status 필터 제거 (전체 글 조회)
- [ ] 정렬: `Published` DESC, 없으면 `last_edited_time` DESC 폴백
- [ ] React `cache()` 래핑
- [ ] 함수 시그니처: `getAllPosts(options?: { pageSize?: number }): Promise<Post[]>`

### 단계 4: 샘플 데이터 보강

- [ ] 샘플 데이터 파일에 `status: "초안"` 항목 1~2개 추가
- [ ] 초안 항목: `publishedAt` 없거나 미래 날짜로 설정

### 단계 5: 동작 검증

- [ ] 개발 서버에서 `getAllPosts()` 호출 결과 확인
- [ ] 초안 + 발행됨 항목 모두 반환되는지 확인
- [ ] 환경변수 미설정 시 샘플 데이터 폴백 동작 확인

## 테스트 체크리스트

- [ ] `getAllPosts()` 반환값에 `status: "초안"` 항목 포함
- [ ] `getAllPosts()` 반환값에 `status: "발행됨"` 항목 포함
- [ ] 정렬 순서: 최신 글이 먼저 반환
- [ ] 샘플 데이터 모드에서 초안 항목 정상 반환
- [ ] TypeScript 오류 없음 (`Post.status` 타입 정합성)
