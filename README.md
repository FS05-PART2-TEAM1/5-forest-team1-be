# Forest Team 1 Backend

## 프로젝트 소개

Forest 팀 프로젝트의 백엔드 서버입니다. 스터디 관리, 습관 체크, 리액션, 포인트 시스템 등의 기능을 제공합니다.

## 주요 기능

### 1. 스터디 관리 (Studies)

- 스터디 목록 조회 (검색, 정렬, 페이지네이션 지원)
- 스터디 생성, 수정, 삭제
- 스터디 상세 정보 조회
- 최근 조회한 스터디 목록
- 비밀번호 기반 스터디 접근 제어

### 2. 습관 관리 (Habits)

- 스터디별 습관 목록 관리
- 일일 습관 체크 기능
- 습관 생성, 수정, 삭제

### 3. 리액션 시스템 (Reactions)

- 스터디에 대한 이모지 리액션
- 리액션 카운트 관리
- 상위 리액션 표시

### 4. 포인트 시스템 (Points)

- 사용자 활동 기반 포인트 적립
- 포인트 내역 조회
- 총 포인트 관리

## 기술 스택

- Node.js
- Express.js
- Prisma (ORM)
- PostgreSQL
- bcrypt (비밀번호 암호화)

## API 엔드포인트

### Studies

- GET /studies - 스터디 목록 조회
- POST /studies - 스터디 생성
- GET /studies/:id - 스터디 상세 조회
- PUT /studies/:id - 스터디 수정
- DELETE /studies/:id - 스터디 삭제

### Habits

- GET /habits - 습관 목록 조회
- POST /habits - 습관 생성
- PUT /habits/:id - 습관 수정
- DELETE /habits/:id - 습관 삭제
- POST /habits/:id/check - 습관 체크

### Reactions

- GET /reactions - 리액션 조회
- POST /reactions - 리액션 추가
- PUT /reactions/:id - 리액션 수정
- DELETE /reactions/:id - 리액션 삭제

### Points

- GET /points - 포인트 내역 조회
- POST /points - 포인트 적립

## 설치 및 실행 방법

1. 저장소 클론

```bash
git clone [repository-url]
```

2. 의존성 설치

```bash
npm install
```

3. 환경 변수 설정

```bash
cp .env.example .env
# .env 파일에 필요한 환경 변수 설정
```

4. 데이터베이스 마이그레이션

```bash
npx prisma migrate dev
```

5. 서버 실행

```bash
npm run dev
```

## 환경 변수 설정

- `DATABASE_URL`: PostgreSQL 데이터베이스 연결 URL
- `PORT`: 서버 포트 (기본값: 3000)
- 기타 필요한 환경 변수

## 라이센스

MIT License
