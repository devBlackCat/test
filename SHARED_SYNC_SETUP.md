# v15 Google Sheets 공유 저장 연결 안내

현재 main은 **Google Apps Script 웹 앱 + Google Sheets**를 사용합니다. Cloudflare Worker나 GitHub Contents API는 사용하지 않습니다. `worker/`와 `data/schedule.json`은 이전 구현 유산이며 현재 사이트의 저장 대상이 아닙니다.

## 연결

- GitHub Pages: https://devblackcat.github.io/test/
- 브라우저 엔드포인트: `assets/config.js`의 `window.TRIP_API_URL`
- Google Sheets: 연결된 시트 `schedule`; A1=version, B1=json, C1=updatedAt, D1=requestId(선택)
- Apps Script: `doGet`(JSON 및 callback= JSONP) + `doPost`(form-urlencoded payload)

## 실제 작동 조건

1. Apps Script를 웹 앱으로 배포하고 실행 사용자는 **나**, 접근 권한은 **모든 사용자**로 설정합니다.
2. `Code.gs`가 `doGet` JSONP와 `doPost`의 `payload` 요청 처리를 지원해야 합니다. 새 버전 배포 필요.
3. 접속 시 최신 일정을 읽습니다. 수동 공유 저장 후 서버에 같은 requestId가 기록됐는지 재조회합니다.
4. 읽기/쓰기 응답은 브라우저에서 확인해야 합니다. `fetch(mode:'no-cors')`는 저장 성공 여부를 알려주지 않으므로 재조회 검증을 사용합니다.
5. 두 명이 같은 버전에서 저장하면 Apps Script에서 버전 검사하고 충돌을 막습니다. 클라이언트는 미저장 변경을 보존합니다.

## 테스트

1. 사이트에서 Ctrl+F5 새로고침 후 공유 일정 준비됨 확인
2. 장소 추가 → 공유 저장 → Google Sheets A2 버전 증가, B2 JSON 데이터 확인
3. 다른 브라우저에서 접속 후 동일 일정 확인
4. 서로 다른 두 브라우저에서 같은 버전을 수정하고 순서대로 저장해 충돌 경고 확인
5. 시트에 개인정보나 비밀을 입력하지 않았는지 확인

**보안 경고:** 편집 인증이 없으므로 공개 웹 앱 URL을 아는 누구든 데이터를 수정할 수 있습니다. 웹 앱 URL과 시트 데이터는 비밀이 아니라고 가정해야 합니다. 고의적인 변조를 차단하려면 인증 구성이 추가로 필요합니다.
