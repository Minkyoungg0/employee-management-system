# Employee Portal

비트컴퓨터 개발자 과제용 사내 직원 관리 시스템입니다. `document-studio`의 모노레포 구조와 Docker 배포 방식을 참고하되, 6시간 과제에 필요한 구성만 남겼습니다.

## 구조

```text
employee-portal/
├── apps/web/                 # React + TypeScript + Vite, nginx
├── apps/api/                 # Spring Boot + Security + JPA + Flyway
├── scripts/measurements/     # Background Check API 실측 스크립트 위치
├── compose.yaml              # web/api/MySQL 통합 실행
├── MEASUREMENTS.md
├── DECISIONS.md
└── AI_LOG.md
```

브라우저는 nginx가 제공하는 React 화면에 접속합니다. `/api/*` 요청은 nginx가 Spring Boot로 전달하며 MySQL과 Spring Boot 포트는 외부에 공개하지 않습니다.

## 실행

```bash
cp .env.example .env
# .env의 비밀번호와 candidate key 수정
docker compose up --build -d
```

접속 주소: <http://localhost>

```bash
docker compose ps
docker compose logs -f api
docker compose down
```

`docker compose down`은 DB 볼륨을 유지합니다. `docker compose down -v`는 데이터를 삭제하므로 배포 환경에서 사용하지 않습니다.

## 현재 포함된 범위

- React 라우팅과 로그인·내 정보·관리자 화면의 최소 골격
- Java 21, Spring Boot 3.4와 Spring Security의 개발용 접근 설정
- `/api/health` 연결 확인 API
- MySQL 스키마와 요구사항에 명시된 직원 10명 시드 데이터
- 기능별 백엔드 패키지 경계
- EC2에서 그대로 실행할 수 있는 Docker Compose
- 제출 문서 템플릿

## 다음 구현 순서

1. 세션 기반 로그인과 관리자/직원 권한 검사
2. 내 정보 조회·수정 API 및 화면
3. 관리자 직원 생성·목록·상세·퇴사 처리
4. Background Check API 실측 스크립트 작성 및 실행
5. 실측 결과에 근거한 외부 API 연동과 폴링 UI
6. 권한 우회·퇴사자 세션·민감정보 노출 검증
7. EC2 배포 및 평가 계정 준비

## 환경변수

| 이름 | 용도 |
|---|---|
| `MYSQL_DATABASE` | MySQL 데이터베이스 이름 |
| `MYSQL_USER` | 애플리케이션용 MySQL 사용자 |
| `MYSQL_PASSWORD` | 애플리케이션용 MySQL 비밀번호 |
| `MYSQL_ROOT_PASSWORD` | MySQL 초기화와 상태 확인용 root 비밀번호 |
| `BACKGROUND_CHECK_BASE_URL` | 제공된 외부 API 주소 |
| `BACKGROUND_CHECK_CANDIDATE_KEY` | 과제 메일로 받은 후보자 키 |

실제 `.env`는 Git에 커밋하지 않습니다.
