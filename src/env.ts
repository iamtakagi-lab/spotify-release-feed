export default {
  NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  TZ: process.env.TZ ? process.env.TZ : 'Asia/Tokyo',
  HOST: process.env.HOST ? process.env.HOST : '0.0.0.0',
  PORT: process.env.PORT ? process.env.PORT : '3000',
  SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI
    ? process.env.SPOTIFY_REDIRECT_URI
    : '',
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID
    ? process.env.SPOTIFY_CLIENT_ID
    : '',
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET
    ? process.env.SPOTIFY_CLIENT_SECRET
    : '',
  DISCORD_WEBOOK_URLS: process.env.DISCORD_WEBOOK_URLS
    ? process.env.DISCORD_WEBOOK_URLS
    : '',
  SCRAPBOX_LINK: process.env.SCRAPBOX_LINK
    ? Boolean(process.env.SCRAPBOX_LINK)
    : true,
  EMBED_IMAGE: process.env.EMBED_IMAGE
    ? Boolean(process.env.EMBED_IMAGE)
    : true,
  COUNTRIES: process.env.COUNTRIES
    ? process.env.COUNTRIES
    : 'jp',
  CRON: process.env.CRON
    ? process.env.CRON
    : '0 4 * * *'
}
