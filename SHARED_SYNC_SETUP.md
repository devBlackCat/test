# v15 공유 일정 편집기 설정

기존 GitHub Pages에서 같은 일정을 함께 볼 수 있도록 Cloudflare Worker와 GitHub Contents API를 사용합니다. **이 브랜치는 아직 배포되지 않았습니다.**

1. GitHub에서 이 브랜치를 검토한 뒤 main에 병합합니다. `data/schedule.json`이 공통 저장 파일입니다.
2. Cloudflare Workers에 `worker/`를 배포합니다. (예: `cd worker && npx wrangler deploy`)
3. Worker Secret `GITHUB_TOKEN` (해당 저장소 Contents 읽기/쓰기 권한의 최소 범위 fine-grained PAT)와 `EDIT_KEY` (친구 공유 편집 비밀번호)를 설정합니다. 예: `npx wrangler secret put GITHUB_TOKEN`, `npx wrangler secret put EDIT_KEY`.
4. `worker/wrangler.jsonc`의 `GITHUB_BRANCH`는 실제 Pages에서 사용하는 브랜치로 설정합니다. 기본값 main. `SITE_ORIGIN`은 Pages origin만 입력합니다.
5. Worker URL을 `assets/config.js`의 `window.TRIP_API_URL`에 설정해 배포합니다. 예: `https://kansai-trip-sync.<계정>.workers.dev`.
6. PC와 휴대폰에서 접속해 저장/재접속/충돌을 테스트합니다.

- 접속 시 GET으로 현재 GitHub JSON을 읽고, 수동 저장 시 PUT으로 갱신합니다. 열려 있는 화면은 변경되지 않은 상태에서만 30초마다 자동 갱신합니다.
- 다른 사람이 먼저 저장하면 409가 발생하며 내 미저장 데이터는 유지됩니다. JSON 백업한 뒤 최신 불러오기 및 수동 병합하세요.
- 기존 JSON 가져오기와 JSON 백업은 남겨 두었습니다.
- **보안**: GitHub PAT는 프론트 코드에 넣지 않습니다. Worker Secret에만 둡니다. 공용 편집 비밀번호는 저장시 입력 후 탭 sessionStorage에만 유지됩니다.
- 공개 저장소의 일정 JSON과 Git 커밋 기록은 모두 공개됩니다. 개인 정보나 비밀을 여기에 넣지 마세요.
- GitHub API 기반 저장은 실시간 공동 편집이 아니라 버전 기반 공유 저장입니다.
