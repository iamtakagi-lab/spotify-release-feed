# spotify-release-feed

Spotify new releases feed on discord

毎朝4時にSpotifyの新曲リリースを通知してくれます (デフォルト設定)

![スクリーンショット 2021-08-02 18 01 44](https://user-images.githubusercontent.com/46530214/127835441-a62b02d2-2e45-4081-bcef-112ff6957679.png)

## Installation

```
nano docker-compose.example.yml
docker-compose up -d --build
```

## Authentication

http://YOUR_HOST:YOUR_PORT/auth/login

| URL                               | Summary                  |
| --------------------------------- | ------------------------ |
| http://localhost:3000/auth/login  | ログインします           |
| http://localhost:3000/auth/me     | ログイン状態を返答します |
| http://localhost:3000/auth/logout | ログアウトします         |

[data/credential.json](data/credential.json) にトークンデータが保存されます

## LICENSE

iamtakagi/spotify-release-feed is provided under the MIT license.
