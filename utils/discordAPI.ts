import axios from 'axios'

export interface UserData {
  name: string
  icon: string
}

const getDiscordAPIUserData = async (): Promise<UserData> => {
  if (!localStorage.getItem('access_token')) {
    // return
    //NOTE - throw?
  }

  const res = await axios
    .get('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      },
    })
    .then(res => res.data)

  return { name: getUsernameWithDiscriminator(res), icon: getUserIcon(res) }
}

export { getDiscordAPIMe, getDiscordAPIUserData }
