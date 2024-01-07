import axios from 'axios'

export interface UserData {
  name: string
  icon: string
  id: any
  discriminator: string
  global_name: string
  username: string
}

const getDiscordAPIUserData = async () => {
  const accountStore = useAccountStore()

  if (!accountStore.accessToken) throw new Error('Access token does not exist')

  const res = await axios.get('https://discord.com/api/v10/users/@me', {
    headers: {
      Authorization: 'Bearer ' + accountStore.accessToken,
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
