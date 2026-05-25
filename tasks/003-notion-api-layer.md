# Task 003: 타입 정의 및 Notion API 레이어 설계

## 개요

블로그 데이터 타입을 정의하고 Notion API 호출 레이어를 구현한다.
환경 변수가 설정되지 않은 개발 환경에서는 샘플 데이터 폴백으로 동작하도록 `USE_SAMPLE_DATA` 분기를 구현한다.

## 관련 파일

- `types/notion.ts`: Post, Category, RichText, NotionBlock 타입 정의
- `lib/notion.ts`: Notion API 호출 함수 (getPosts, getPostBySlug, getPostBlocks, getCategories)
- `.env.local`: NOTION_API_KEY, NOTION_DATABASE_ID 환경 변수

## 수락 기준

- [x] `Post`, `Category`, `RichText`, `RichTextAnnotations`, `NotionBlock` 유니온 타입이 정의되어 있다
- [x] `getPosts()`, `getPostBySlug()`, `getPostBlocks()`, `getCategories()` 함수가 구현되어 있다
- [x] `NOTION_API_KEY` 미설정 시 샘플 데이터를 반환한다
- [x] Notion 쿼리에 `Status === "발행됨"` 필터와 `Published` 내림차순 정렬이 적용된다
- [x] 블록 조회 시 페이지네이션 커서(cursor) 처리가 구현되어 있다

## 구현 단계

### 단계 1: 타입 정의 (`types/notion.ts`)

- [x] `Post` 타입: id, slug, title, category, tags, publishedAt, status
- [x] `Category` 타입: name, count
- [x] `RichTextAnnotations` 타입: bold, italic, strikethrough, underline, code, color
- [x] `RichText` 타입: type, text(content/link), annotations, plain_text
- [x] `NotionBlock` 유니온 타입: paragraph, heading_1~3, bulleted_list_item, numbered_list_item, quote, code, image, divider

### 단계 2: Notion API 레이어 (`lib/notion.ts`)

- [x] `USE_SAMPLE_DATA` 플래그 정의 (NOTION_API_KEY 미설정 시 true)
- [x] `toSlug()` 함수: 제목을 URL 슬러그로 변환
- [x] `fetchPostsFromNotion()`: databases.query로 발행된 글 목록 조회
  - Status === "발행됨" 필터
  - Published 내림차순 정렬
  - Notion 속성 파싱 (title, select, multi_select, date)
- [x] `fetchBlocksFromNotion()`: blocks.children.list로 블록 조회
  - 커서(cursor) 기반 페이지네이션 처리
  - 지원 블록 타입 필터링 (10종)
- [x] `getPosts()`: USE_SAMPLE_DATA 분기 → samplePosts 또는 fetchPostsFromNotion()
- [x] `getPostBySlug()`: getPosts() 결과에서 slug 매칭
- [x] `getPostBlocks()`: USE_SAMPLE_DATA 분기 → sampleBlocks 또는 fetchBlocksFromNotion()
- [x] `getCategories()`: USE_SAMPLE_DATA 분기 → sampleCategories 또는 getPosts() 집계

## 변경 사항 요약

- `types/notion.ts`: Post, Category, RichText, RichTextAnnotations, NotionBlock 유니온 타입 정의
- `lib/notion.ts`: USE_SAMPLE_DATA 분기, toSlug(), fetchPostsFromNotion(), fetchBlocksFromNotion(), getPosts(), getPostBySlug(), getPostBlocks(), getCategories() 구현
