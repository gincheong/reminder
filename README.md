# Reminder
<img src="https://user-images.githubusercontent.com/24225401/107607749-7683e800-6c7d-11eb-8f35-96df7d47c8b7.png" width="400px">

- 프론트엔드
  - React, React-Redux
- 백엔드
  - Django, Django REST framework
- 실행 환경
  - Ubuntu 20.04.1 LTS 

# 실행법
- 클라이언트 실행
  - `app` 폴더로 이동하여 패키지 설치
  ```
  yarn
  ```

  - 패키지 설치 후 실행
  ```
  yarn start
  ```
 
- 서버 실행 
  - `api` 폴더로 이동하여 패키지 설치 (파이썬 가상환경을 만들어 설치했습니다)
  ```
  pip install -r requirements.txt
  ```
  
  - `api/api` 폴더 밑에 `secret_key.json` 파일 생성하기  
  ```json
  // api/api/secret_key.json
  {
    "SECRET_KEY": "{DJANGO SECRET KEY CODE}"
  }
  ```
  필요한 시크릿 키는 [이곳](https://miniwebtool.com/django-secret-key-generator/)에서 만들 수 있습니다. `{DJANGO SECRET KEY CODE}`에 해당하는 부분을 대체하시면 됩니다.
  
두 서버를 실행한 후, [http://localhost:3000](http://localhost:3000)으로 접속합니다.

# (Optional) Telegram Bot API와 Cron을 이용한 알림 기능
(Windows에는 Cron이 존재하지 않아 해당 기능이 작동하지 않습니다.)

- Telegram Bot 생성
  - [링크](https://core.telegram.org/)를 참고하여 봇 계정을 생성하고, `TOKEN`을 발급받습니다.

- 내 Telegram 계정의 Chat Id 얻기
  - [get id](https://t.me/get_id_bot) 봇을 통하면 내 계정의 `Chat Id`를 얻을 수 있습니다.

- `api/api/secret_key.json`에 TOKEN과 Chat Id 추가
```js
// api/api/secrey_key.json
{
  ...
  "BOT_TOKEN": "0000000000:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
  "CHAT_ID": "000000000",
}
```

- Cron에 작업 등록
  - `api` 폴더 내에서 
  ```
  python manage.py crontab add
  ```
  명령어 입력으로 작업을 추가합니다. 삭제를 원하시면 `python manage.py crontab remove` 를 입력하면 됩니다.  
  Cron 작업은 `api/api/settings.py` 파일 하단에 정의되어 있으며, `api/api/cron.log` 파일에 로그가 작성됩니다.
