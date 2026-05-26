# 책 리뷰 블로그

Notion을 CMS로 활용한 책 리뷰 블로그. Notion에서 리뷰를 작성하면 블로그에 자동으로 반영됩니다.

## 주요 기능

- **Notion CMS 연동**: Notion API로 발행된 리뷰를 자동으로 가져와 표시
- **카테고리 필터링**: 카테고리별 글 목록 및 URL 파라미터 상태 동기화
- **실시간 검색**: 제목·태그 기반 클라이언트 사이드 검색
- **페이지네이션**: 페이지당 9개 글 표시
- **SEO 최적화**: Open Graph, Twitter Card, JSON-LD, sitemap.xml
- **다크 모드**: 시스템 설정 연동 테마 전환
- **접근성**: WCAG 2.1 AA 준수 (skip link, aria 속성, 키보드 내비게이션)
- **ISR**: Next.js Incremental Static Regeneration (24시간 재검증)

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| CMS | Notion API (`@notionhq/client`) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (radix-ui) |
| Deployment | Vercel |

## 전제 조건

- Node.js 18 이상
- Notion 계정 및 Integration 생성
- Notion 데이터베이스 설정 (아래 스키마 참조)

## 로컬 설치 및 실행

```bash
# 저장소 클론
git clone <repository-url>
cd notion-cms-project

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local을 열어 NOTION_API_KEY와 NOTION_DATABASE_ID 입력

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속.

> **참고**: 환경 변수를 설정하지 않으면 샘플 데이터로 동작합니다.

## 환경 변수

`.env.example`을 복사하여 `.env.local`로 만들고 값을 입력합니다.

```env
# Notion Integration 토큰 (https://www.notion.so/my-integrations)
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Notion 데이터베이스 ID (데이터베이스 URL의 32자리 hex 문자열)
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Notion 데이터베이스 설정

데이터베이스명: **Book Reviews**

| 필드명 | 타입 | 설명 |
|--------|------|------|
| `Title` | title | 책 제목 + 리뷰 제목 |
| `Category` | select | 카테고리 (예: 소설, 자기계발, 기술) |
| `Tags` | multi_select | 세부 태그 (예: 추천, 고전) |
| `Published` | date | 발행일 |
| `Status` | select | `초안` 또는 `발행됨` |

`Status = 발행됨`인 항목만 블로그에 표시됩니다.

**Integration 연결 방법:**

1. [Notion Integrations](https://www.notion.so/my-integrations)에서 새 Integration 생성
2. API 키 복사 → `.env.local`의 `NOTION_API_KEY`에 입력
3. 데이터베이스 페이지 우상단 `...` → `Connect to` → 생성한 Integration 선택
4. 데이터베이스 URL에서 32자리 ID 복사 → `NOTION_DATABASE_ID`에 입력

## 배포 (Vercel)

### GitHub 연동 배포 (권장)

1. GitHub에 저장소 push
2. [Vercel](https://vercel.com)에서 `New Project` → GitHub 저장소 선택
3. `Environment Variables`에 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 입력
4. `Deploy` 클릭

### CLI 배포

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인 및 배포
vercel login
vercel

# 환경 변수 설정
vercel env add NOTION_API_KEY
vercel env add NOTION_DATABASE_ID

# 프로덕션 배포
vercel --prod
```

## 개발 명령어

```bash
npm run dev      # 개발 서버 (포트 3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint 실행
```

## 라이선스

MIT
