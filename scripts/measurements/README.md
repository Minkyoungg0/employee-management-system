# Background Check API 측정 스크립트

API 키를 코드에 적지 않고 환경변수 `BACKGROUND_CHECK_CANDIDATE_KEY`로 전달합니다.

구현할 실험:

1. POST로 검사 생성 후 `checkId` 기록
2. GET 반복 호출의 지연 시간과 상태코드 원본 로그 저장
3. 동일 `employeeId` POST 반복
4. pending에서 최종 상태까지 폴링
5. 동시성 단계별 실험
6. 원본 로그에서 p50/p95/p99/최댓값 계산

측정 대상 API에 불필요한 부하를 주지 않도록 낮은 동시성부터 단계적으로 실행합니다.
