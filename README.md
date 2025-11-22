# Todo List Application

React, Spring Boot, MySQL을 사용한 Todo List 애플리케이션입니다.

## 기능

- 로그인/회원가입
- Todo CRUD (생성, 조회, 수정, 삭제)
- Todo 완료 상태 토글
- 수정이력 상세보기
- 마이페이지 (닉네임 변경, 계정 삭제)
- 코발트블루 색상 테마

## 기술 스택

### Backend
- Spring Boot 3.2.0
- Spring Security
- JWT 인증
- MySQL
- JPA/Hibernate

### Frontend
- React 18.2.0
- React Router
- Axios
- CSS (코발트블루 테마)

## 설치 및 실행

### 1. 데이터베이스 설정

MySQL에서 데이터베이스를 생성합니다:

```sql
CREATE DATABASE tododb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Backend 설정

`backend/src/main/resources/application.properties` 파일에서 데이터베이스 연결 정보를 수정합니다:

```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

Backend 실행:

```bash
cd backend
mvn spring-boot:run
```

Backend는 `http://localhost:8080`에서 실행됩니다.

### 3. Frontend 설정

```bash
cd frontend
npm install
npm start
```

Frontend는 `http://localhost:3000`에서 실행됩니다.

## API 엔드포인트

### 인증
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인

### Todo
- `GET /api/todos` - Todo 목록 조회
- `POST /api/todos` - Todo 생성
- `PUT /api/todos/{id}` - Todo 수정
- `DELETE /api/todos/{id}` - Todo 삭제
- `GET /api/todos/{id}/history` - Todo 수정이력 조회

### 사용자
- `GET /api/user/me` - 현재 사용자 정보
- `PUT /api/user/nickname` - 닉네임 변경
- `DELETE /api/user/delete` - 계정 삭제

## 주요 기능 설명

### 수정이력
- Todo의 생성, 수정, 삭제 이력이 자동으로 기록됩니다
- 각 변경사항의 이전 값과 새 값을 비교하여 표시합니다

### 보안
- JWT 토큰 기반 인증
- 비밀번호는 BCrypt로 암호화
- 사용자별 Todo 접근 권한 검증


