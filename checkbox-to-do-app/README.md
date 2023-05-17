# 시작하기

`./frontend/`디렉토리에서 터미널에 `npm run start` 명령어를 치시고 "Checkbox ✓"가 출력되는 걸 확인해주세요.

## Troubleshooting

`npm run start` 실행 후, **오류가 나는 경우:**  

1. `DIR-TO-PROJ/checkbox-to-do-app/frontend/` 디렉토리로 이동
    - `cd DIR-TO-PROJ/checkbox-to-do-app/frontend`
    - 깃헙 프로젝트가 저장된 로컬 디렉토리로 이동해주세요
2. 최신 `npm` globally 설치
    - `npm install -g npm@latest`
3. `node_modules/` 디렉토리 삭제
    - `rm -rf node_modules`
    - 디렉토리 삭제 옵션 (f flag로 재확인 절차 무시)
4. 현재 디렉토리에 다시 `npm` 설치
    - `npm install`

## Required Additional Libraries
- [react-router-dom](#https://reactrouter.com/en/main) (Router)
    - `npm i react-router-dom`
- ~~[axios](#https://github.com/axios/axios)~~
    - ~~`npm i axios`~~
