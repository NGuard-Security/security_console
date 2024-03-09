import io, { Socket } from 'socket.io-client'

export default () => {
  const config = useRuntimeConfig()

  const connection = useState<Socket | null>('connection', () => null)
  const alertsData = useState<APIAlert[]>('alertsData', () => [])

  onMounted(() => {
    if (config.public.IS_TEST) return

    connection.value = io((config.public.API_BASE_URL as string) + '/dashboard/push').connect()

    connection.value.on('push:load', (pushs: APIAlert[]) => {
      alertsData.value = pushs
    })

    connection.value.on('push:check', (pushs: APIAlert[]) => {
      if (pushs.length > 0) {
        new Audio('https://cdn.nguard.dev/assets/dashboard/audio/console_alarm.mp3').play()
      }

      alertsData.value.push(...pushs)
    })

    connection.value.on('push:error', e => {
      console.log(e)
      alert('통신 중 오류가 발생하였습니다. 채널톡으로 문의해 주세요.')
    })
  })

  onUnmounted(() => {
    if (!connection.value) return

    connection.value.disconnect()
    connection.value = null
  })

  const loadPush = (guildId: string) => {
    if (!connection.value) return
    if (config.public.IS_TEST) return

    connection.value.emit('push:load', {
      accessToken: localStorage.getItem('access_token'),
      guildId,
    })
  }

  const checkPush = (guildId: string) => {
    if (!connection.value) return
    if (config.public.IS_TEST) return

    connection.value.emit('push:check', {
      accessToken: localStorage.getItem('access_token'),
      guildId,
      alreadyPushIdArray: alertsData.value.map(alert => alert.id),
    })
  }

  const onPushCheck = (callback: () => any) => {
    if (!connection.value) return
    if (config.public.IS_TEST) return

    connection.value.on('push:check', callback)
  }

  return { alertsData, loadPush, checkPush, onPushCheck }
}
