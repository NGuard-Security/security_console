import io, { Socket } from 'socket.io-client'

export default () => {
  const connection = useState<Socket>('connection', () => io('https://ws-api.nguard.xyz/'))
  const interval = useState('interval')

  const socket = io('https://ws-api.nguard.xyz/').connect()

  socket.on('push:load', pushs => {
    // this.alerts.contents = pushs
  })

  socket.on('push:check', pushs => {
    // let alerts_new = pushs
    // if (alerts_new.length > 0) {
    //   new Audio('https://cdn.nguard.dev/assets/dashboard/audio/console_alarm.mp3').play()
    // }
    // this.alerts.contents = [].concat(this.alerts.contents, pushs)
    // this.resizeAlerts()
  })

  socket.on('push:error', e => {
    // console.log(e)
    // alert('통신 중 오류가 발생하였습니다. 채널톡으로 문의해 주세요.')
  })

  socket.emit('push:load', {
    // guild: this.$route.query.id,
    // access_token: localStorage.getItem('access_token'),
  })

  interval.value = setInterval(() => {
    socket.emit('push:check', {
      // guild: this.$route.query.id,
      // access_token: localStorage.getItem('access_token'),
      // already: this.alerts.contents.map(alert => alert.id),
    })
  }, 5000)

  return { connection }
}
