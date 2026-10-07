# Nintendo × Pokémon Kansai Trip Dashboard v12

2027년 5월 간사이 여행 일정 편집기입니다. `index.html`을 Chrome/Edge에서 열면 됩니다.

## v12 핵심 변경 — localStorage 제거, JSON 파일 저장

v12부터 일정/예약 체크 상태를 브라우저 `localStorage`에 저장하지 않습니다.

- **JSON 저장**: 현재 A/B 일정안, 시간, 동선 묶음, 예약 체크 상태를 하나의 JSON 파일로 저장합니다.
- **JSON 열기**: 이전에 저장한 JSON 파일을 선택해 그대로 복원합니다.
- Chrome/Edge에서 File System Access API를 사용할 수 있으면 **JSON 열기**로 연 파일 또는 처음 **JSON 저장**으로 지정한 파일에 계속 덮어쓸 수 있습니다.
- 해당 기능을 사용할 수 없는 실행 환경에서는 `nintendo-kansai-trip-2027.json` 파일을 다운로드하는 방식으로 저장합니다.
- `Ctrl+S` / `Cmd+S`도 JSON 저장으로 연결됩니다.
- 수정 후 JSON 저장을 하지 않은 상태에서 페이지를 닫으려 하면 브라우저가 이탈 경고를 표시합니다.
- 새로고침/브라우저 재실행 후에는 **JSON 열기**로 일정 파일을 다시 불러오면 됩니다.

> v12 코드에는 일정 저장 용도의 `localStorage` 사용이 없습니다.

## 기존 기능

- A · 12일 밤 출발 / B · 13일 출발 독립 일정안
- 장소 / 권역·동선 보기
- 교토·우지·우메다·신사이바시/난바·닛폰바시/오타로드·USJ·신오사카·KIX 등 생활권 중심 분류
- 개별 장소 및 동선 묶음 드래그 추가
- 같은 날짜 내 순서 변경 / 다른 날짜로 이동
- 날짜별 `＋ 일정` 커스텀 일정
- 장소별 예약·티켓 조건 인라인 표시와 완료 체크
- 일정 카드 사이 권역 이동 힌트 및 시간 충돌 경고
- 추천 일정: 12일 밤 KIX 도착 + First Cabin KIX / Hotel Nikko KIX 선택

## 실행

압축을 푼 뒤 다음 파일을 실행하세요.

`nintendo_trip_dashboard_v12/index.html`

정적 HTML/CSS/JS로만 구성되어 있어 Netlify, GitHub Pages 같은 정적 호스팅에도 그대로 올릴 수 있습니다.
