import axios, { HttpStatusCode } from 'axios'
import { ALERT } from '~/utils/enums'
import { LOADING_STATE } from '#imports'

export interface APIServer {
  id: any
  icon: string
  name: string
  now: boolean
}

export interface APISummary {
  user: number
  bot: number
  new_user: number
  black_user: number
  summary: number[]
}

export interface APIAlert {
  kind: ALERT
  title: string
  content: string
  id: number
  button: {
    href: string
    text: string
  }
}

export default () => {
  const config = useRuntimeConfig()
  const router = useRouter()
  const { pathWithLocale } = usePathUtils()

  const loadingState = useState<LOADING_STATE>('loadingState', () => LOADING_STATE.Connecting)

  const createAppAPI = () => {
    const headers = getAccessToken()
      ? {
          Authorization: 'Bearer ' + getAccessToken(),
        }
      : undefined

    const appAPIBase = axios.create({
      baseURL: config.public.API_BASE_URL as string,
      headers,
    })

    appAPIBase.interceptors.response.use(
      res => res,
      err => {
        if (err.response) {
          switch (err.response.status) {
            case HttpStatusCode.Unauthorized:
              window.localStorage.removeItem('access_token')
              router.push(pathWithLocale('/auth/login'))
              break

            case HttpStatusCode.NotFound:
              router.push(pathWithLocale('/servers'))
              break

            case HttpStatusCode.TooManyRequests:
              setTimeout(() => {
                window.location.reload()
              }, err.response?.data.data.retry_after * 1000)
              break
          }
        }

        catchNetworkErr(err)
        return err
      },
    )

    return appAPIBase
  }

  const createDashboardAPI = () => {
    const headers = getAccessToken()
      ? {
          Authorization: 'Bearer ' + getAccessToken(),
        }
      : undefined

    const appDashboardAPI = axios.create({
      baseURL: config.public.API_BASE_URL as string,
      headers,
    })

    appDashboardAPI.interceptors.response.use(
      res => res,
      err => {
        if (err.response) {
          switch (err.response.status) {
            case HttpStatusCode.Unauthorized:
              window.localStorage.removeItem('access_token')
              router.push(pathWithLocale('/auth/login'))
              break

            case HttpStatusCode.NotFound:
              router.push(pathWithLocale('/servers'))
              break

            case HttpStatusCode.TooManyRequests:
              setTimeout(() => {
                window.location.reload()
              }, err.response?.data.data.retry_after * 1000)
              break
          }
        }

        loadingState.value = LOADING_STATE.Failed
        catchNetworkErr(err, true)
        return err
      },
    )

    return appDashboardAPI
  }

  const getAPIServers = async (nowGuildId: number) => {
    const res = await createAppAPI().get<APIServer[]>(`/dashboard/servers?now=${nowGuildId}`)
    return res.data
  }

  const getAPISummary = async (ServerId: number) => {
    const res = await createDashboardAPI().get<APISummary>(`/dashboard/summary?id=${ServerId}`)
    return res.data
  }

  const getAPIInvite = () => {}

  const getAPIMembers = () => {}

  const getAPIVerify = () => {}

  return { getAPIServers, getAPISummary }
}
