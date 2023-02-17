<template></template>

<script>
import { authEndpoint } from '@/config.json'

export default {
  mounted() {
    if (this.$route.query.id) {
      location.href = `https://discord.com/api/oauth2/authorize?client_id=937636597040570388&redirect_uri=${authEndpoint}/bot/callback&permissions=8&response_type=code&scope=bot applications.commands identify guilds&guild_id=${this.$route.query.id}&disable_guild_select=true&state=${this.$i18n.locale}`
      return
    } else {
      this.$router.push(`/${this.$i18n.locale}/auth/login`)
      return
    }
  },
}
</script>
