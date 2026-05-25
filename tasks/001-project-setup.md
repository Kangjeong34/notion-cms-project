# Task 001: 프로젝트 초기 설정 및 기본 구조 구성

## 개요

Next.js 16 App Router 기반 프로젝트를 초기화하고, TypeScript·Tailwind CSS v4·shadcn/ui·`@notionhq/client` 등 핵심 의존성을 설치한다.
블로그 구현에 필요한 디렉토리 구조를 확립한다.

## 관련 파일

- `package.json`: 의존성 목록
- `tsconfig.json`: TypeScript 설정
- `app/globals.css`: Tailwind CSS v4 기반 전역 스타일 및 OKLCH 색상 변수
- `components/ui/`: shadcn/ui 컴포넌트 디렉토리
- `lib/utils.ts`: `cn()` 유틸리티

## 수락 기준

- [x] Next.js 16 App Router + TypeScript + Tailwind CSS v4 프로젝트가 정상 실행된다
- [x] shadcn/ui (radix-ui 단일 패키지) 컴포넌트가 설치되어 있다
- [x] `@notionhq/client` 패키지가 설치되어 있다
- [x] `app/`, `components/`, `lib/`, `types/` 디렉토리 구조가 존재한다

## 구현 단계

### 단계 1: Next.js 프로젝트 초기화

- [x] `create-next-app`으로 App Router + TypeScript 프로젝트 생성
- [x] 불필요한 보일러플레이트 제거

### 단계 2: UI 라이브러리 설치

- [x] shadcn/ui 초기화 (`npx shadcn@latest init`)
- [x] 기본 컴포넌트 설치 (Button, Card, Badge, Input, Sheet, Tooltip, Sonner 등)

### 단계 3: Notion 클라이언트 설치

- [x] `npm install @notionhq/client` 실행

### 단계 4: 디렉토리 구조 생성

- [x] `app/` — Next.js App Router 라우트
- [x] `components/ui/` — shadcn/ui 컴포넌트
- [x] `components/blog/` — 블로그 전용 컴포넌트
- [x] `components/layout/` — Navbar, Footer 등 레이아웃 컴포넌트
- [x] `components/theme/` — ThemeProvider, ThemeToggle
- [x] `lib/` — 유틸리티 및 API 레이어
- [x] `types/` — TypeScript 타입 정의
- [x] `hooks/` — 커스텀 훅

## 변경 사항 요약

- `package.json`: next, react, typescript, tailwindcss, radix-ui, @notionhq/client 등 의존성 추가
- `tsconfig.json`: strict 모드, `@/*` 경로 별칭 설정
- `app/globals.css`: Tailwind CSS v4 + OKLCH 색상 변수 정의
- `lib/utils.ts`: `cn()` 함수 (clsx + tailwind-merge)
- `components/ui/`: shadcn/ui 기본 컴포넌트 설치
