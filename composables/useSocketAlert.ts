import io, { Socket } from 'socket.io-client'

export default () => {
  const config = useRuntimeConfig()

  const connection = useState<Socket | null>('connection', () => null)
  const alertsData = useState<APIAlert[]>('alertsData', () => [])

  onMounted(() => {
    return
    //config.public.API_BASE_URL as string
    connection.value = io('https://ws-api.nguard.xyz/').connect()

    connection.value?.on('push:load', pushs => {
      alertsData.value = pushs
    })

    connection.value?.on('push:check', pushs => {
      let alerts_new = pushs
      if (alerts_new.length > 0) {
        new Audio('https://cdn.nguard.dev/assets/dashboard/audio/console_alarm.mp3').play()
      }
      alertsData.value = [].concat(alertsData.value as any, pushs)
      // this.resizeAlerts()
    })

    connection.value?.on('push:error', e => {
      console.log(e)
      alert('통신 중 오류가 발생하였습니다. 채널톡으로 문의해 주세요.')
    })
  })

  onUnmounted(() => {
    if (!connection.value) return

    connection.value.disconnect()
    connection.value = null
  })

  const loadPush = (guildId: number) => {
    if (!connection.value) return

    connection.value.emit('push:load', {
      guild: String(guildId),
      access_token: localStorage.getItem('access_token'),
    })
  }

  const checkPush = (guildId: number) => {
    if (!connection.value) return

    connection.value.emit('push:check', {
      guild: String(guildId),
      access_token: localStorage.getItem('access_token'),
      already: alertsData.value.map(alert => alert.id),
    })
  }

  const onPushCheck = (callback: () => void) => {
    if (!connection.value) return

    connection.value.on('push:check', pushs => {
      let alerts_new = pushs
      if (alerts_new.length > 0) {
        new Audio('https://cdn.nguard.dev/assets/dashboard/audio/console_alarm.mp3').play()
      }
      alertsData.value = [].concat(alertsData.value as any, pushs)

      callback()
    })
  }

  return { alertsData, loadPush, checkPush, onPushCheck }
}
