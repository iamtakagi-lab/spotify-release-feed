import env from '../env'
import fs from 'fs'
import { store } from '..'
import SpotifyWebApi from 'spotify-web-api-node'

export const getMe = () => {
  return new Promise<SpotifyApi.CurrentUsersProfileResponse>(
    (resolve, reject) => {
      const storedCredential = JSON.parse(
        fs.readFileSync('./data/credential.json', 'utf8')
      )

      const { accessToken, refreshToken } = storedCredential

      if (
        accessToken == null ||
        refreshToken == null ||
        accessToken.length <= 0 ||
        refreshToken.length <= 0
      )
        return

      if (accessToken != null && refreshToken != null) {
        store.setCredential({ accessToken, refreshToken })
      }

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
          const data = await spotify.getMe()
          return data.body
        })
        .then((me) => {
          resolve(me)
        })
    }
  )
}

export default async (ctx) => {
  const me = await getMe()
  ctx.status = 200
  ctx.body = `Logged-In as ${me.display_name || me.id}`
}
