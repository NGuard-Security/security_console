import axios from 'axios'

export interface UserData {
  name: string
  icon: string
  id: any
  discriminator: string
  global_name: string
  username: string
}

const discordCDNUrl = 'https://cdn.discordapp.com'

const getUserIcon = (userData: any) => {
  return userData.avatar
    ? `${discordCDNUrl}/avatars/${userData.id}/${userData.avatar}.png`
    : `${discordCDNUrl}/embed/avatars/${userData.discriminator % 5}.png`
}

const getUsernameWithDiscriminator = (userData: any) => {
  return userData.username + '#' + userData.discriminator
}

const getDiscordAPIUserData = async () => {
  if (!getAccessToken()) throw new Error('Access token does not exist')

  const res = await axios.get('https://discord.com/api/v10/users/@me', {
    headers: {
      Authorization: 'Bearer ' + getAccessToken(),
    },
  })

  const userData = {
    ...res.data,
    name: getUsernameWithDiscriminator(res.data),
    icon: getUserIcon(res.data),
  } as UserData

  return userData
}

export { getDiscordAPIUserData }
