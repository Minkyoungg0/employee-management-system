CREATE TABLE employee (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    employee_number VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL COMMENT '원본 한글 성명. 동명이인은 사번으로 구분한다.',
    date_of_birth DATE,
    background_check_first_name VARCHAR(100) COMMENT '외부 API 전달용 이름. 확인 전에는 NULL일 수 있다.',
    background_check_last_name VARCHAR(100) COMMENT '외부 API 전달용 성. 복성을 임의 분리하지 않는다.',
    employment_status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
    INDEX idx_employee_employment_status (employment_status),
    CONSTRAINT employee_status_check CHECK (employment_status IN ('ACTIVE', 'TERMINATED'))
) ENGINE=InnoDB
  DEFAULT CHARACTER SET=utf8mb4
  COLLATE=utf8mb4_0900_ai_ci
  COMMENT='사내 직원 인적사항';
