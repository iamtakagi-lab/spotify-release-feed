import SpotifyWebApi from 'spotify-web-api-node'
import env from '../env'
import { store } from '..'
import sendDiscord from '../discord'

export default async () => {
  if (
    store.credential.accessToken == null ||
    store.credential.refreshToken == null ||
    store.credential.accessToken.length <= 0 ||
    store.credential.refreshToken.length <= 0
  )
    return

  const spotify = new SpotifyWebApi({
    clientId: env.SPOTIFY_CLIENT_ID,
    clientSecret: env.SPOTIFY_CLIENT_SECRET,
    redirectUri: env.SPOTIFY_REDIRECT_URI,
    accessToken: store.credential.accessToken,
    refreshToken: store.credential.refreshToken,
  })

  spotify
    .getMe()
    .then((data) => {
      return data.body
    })
    .catch(async (e) => {
      const ref = (await spotify.refreshAccessToken()).body
      const accessToken = ref.access_token
      const refreshToken = ref.refresh_token
      if (accessToken) {
        store.setAccessToken(accessToken)
        spotify.setAccessToken(accessToken)
      }
      if (refreshToken) {
        store.setRefreshToken(refreshToken)
        spotify.setRefreshToken(refreshToken)
      }
    })
    .then(async () => {
      env.DISCORD_WEBOOK_URLS.split(',').map(async (url) => {
        env.COUNTRIES.split(',').map(async (country) => {
          spotify.getNewReleases({
            country,
            limit: 50,
          }).then((res) => {
            res.body.albums.items.map(async (album) => {
              await sendDiscord(url.split('/'), album)
            })
          })
        })
      })
    })
}
