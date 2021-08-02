import env from './env'
import { MessageEmbed, WebhookClient } from 'discord.js'

const makeData = async (album: SpotifyApi.AlbumObjectSimplified) => {
  const { id, name, album_type, images, release_date, artists } = album
  const album_url = `https://open.spotify.com/album/${id}`
  const image_url = `https://spotify2image.vercel.app/image/album/${id}#.png`
  return {
    album_url: album_url,
    album_name: name,
    album_artists: artists,
    album_type: album_type.charAt(0).toUpperCase() + album_type.slice(1),
    album_image_url: images[0].url,
    album_release_date: release_date,
    scrapbox_link: `[${image_url} ${album_url}]`,
  }
}

const makeEmbed = ({
  album_url,
  album_name,
  album_artists,
  album_type,
  album_image_url,
  album_release_date,
  scrapbox_link
}) => {
  const embed = new MessageEmbed()
  embed.setColor('#F08080')
  embed.setTitle(`${album_name} has been released`)
  embed.setURL(album_url)
  embed.addField(album_type, album_name, false)
  embed.addField(
    'Artist' + (album_artists.length > 1 ? 's' : ''),
    album_artists.map((artist) => artist.name).join(', '),
    false
  )
  embed.addField('Release Date', album_release_date, false)
  if (env.SCRAPBOX_LINK) {
    embed.addField('Scrapbox Link', scrapbox_link, false)
  }
  if (env.EMBED_IMAGE) {
    embed.setImage(album_image_url)
  }
  return Promise.resolve(embed)
}

export default async (splitUrl, album) => {
  makeData(album).then((data) => {
    makeEmbed(data).then(async (embed) => {
      await new WebhookClient(splitUrl[5], splitUrl[6]).send(embed)
    })
  })
}
