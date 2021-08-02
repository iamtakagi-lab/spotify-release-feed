import { stringify } from 'querystring'
import SpotifyWebApi from 'spotify-web-api-node'
import env from '../env'

export default async (ctx) => {
  const scope = 'user-read-currently-playing'
  ctx.redirect(
    'https://accounts.spotify.com/authorize?' +
      stringify({
        response_type: 'code',
        client_id: env.SPOTIFY_CLIENT_ID,
        scope: scope,
        redirect_uri: env.SPOTIFY_REDIRECT_URI,
      })
  )
}
