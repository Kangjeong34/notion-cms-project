---
description: '현재 디렉터리의 프로젝트 구조, 기술 스택, 코드 품질을 분석합니다'
allowed-tools:
  [
    'Bash(git log:*)',
    'Bash(git status:*)',
    'Bash(git diff:*)',
    'Bash(npm run lint:*)',
    'Bash(npm run build:*)',
    'Glob',
    'Grep',
    'Read',
  ]
---

# Claude 명령어: Analysis

현재 디렉터리의 프로젝트 구조, 기술 스택, 최근 변경사항, 코드 품질을 종합 분석합니다.

## 사용법

```
/analysis
```

## 프로세스

1. **프로젝트 구조 파악** — 디렉터리 트리, 주요 설정 파일(`package.json`, `tsconfig.json` 등) 확인
2. **기술 스택 분석** — 의존성(dependencies / devDependencies) 기반으로 사용 기술 목록화
3. **라우트 / 모듈 구조** — `app/`, `src/`, `pages/` 등 핵심 폴더의 파일 구성 파악
4. **최근 변경사항** — `git log --oneline -10` 으로 최근 커밋 흐름 확인
5. **코드 품질 검토** — `npm run lint` 실행 후 경고/오류 요약
6. **개선 제안** — 분석 결과를 토대로 우선순위 높은 개선 사항 제안

## 출력 포맷

```
## 📁 프로젝트 구조
...

## 🛠 기술 스택
...

## 🗺 라우트 / 모듈 구조
...

## 📝 최근 커밋
...

## ⚠️ 코드 품질
...

## 💡 개선 제안
...
```

## 참고사항

- 분석은 읽기 전용으로 수행 (파일 수정 없음)
- `npm run lint` 실패 시 오류 내용 그대로 요약
- 보안에 민감한 파일(`.env`, 시크릿 등)은 내용을 출력하지 않음
