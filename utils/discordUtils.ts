const discordCDNUrl = 'https://cdn.discordapp.com'

const getUserIcon = (userData: any) => {
  return userData.avatar
    ? `${discordCDNUrl}/avatars/${userData.id}/${userData.avatar}.png`
    : `${discordCDNUrl}/embed/avatars/${userData.discriminator % 5}.png`
}

const getUsernameWithDiscriminator = (userData: any) => {
  return userData.username + '#' + userData.discriminator
}

export { discordCDNUrl, getUserIcon, getUsernameWithDiscriminator }
