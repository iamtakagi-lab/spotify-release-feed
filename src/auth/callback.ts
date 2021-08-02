import SpotifyWebApi from 'spotify-web-api-node'
import { cron, store } from '..'
import env from '../env'

export default async (ctx) => {
  let code = ctx.query.code
  if (code) {
    code = code.toString()
    const spotify = new SpotifyWebApi({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_CLIENT_SECRET,
      redirectUri: env.SPOTIFY_REDIRECT_URI,
    })
    spotify
      .authorizationCodeGrant(code)
      .then(async (res) => {
        return res.body
      })
      .then(async (data) => {
        const accessToken = data.access_token
        const refreshToken = data.refresh_token
        store.setCredential({ accessToken, refreshToken })
        if (!cron.isRunning()) {
          cron.start()
        }
      })
      .catch((e: any) => {
        console.error('Error: ', e, e.stack)
      })
    ctx.redirect('/auth/me')
  }
}
