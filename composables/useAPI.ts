import axios, { AxiosError, HttpStatusCode, type InternalAxiosRequestConfig } from 'axios'
import { ALERT, APIInviteType, APIPremiumType } from '~/utils/enums'

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

export interface APIServer {
  id: string
  icon: string
  name: string
  now: boolean
  isInvited: boolean
}

export interface APISummary {
  user: number
  bot: number
  newUser: number
  blackUser: number
  chartData: number[]
}

export interface APIInvite {
  koreanbots: {
    voted: boolean
    lastVote: number
  }
  premiumType: APIPremiumType
  domain: {
    guild: string
    domain: string
    ssl: boolean
  }
  settings?: {
    status: 1
    link: string
    settings: APIInviteType
    guild: string
  }
}

export interface APIInviteBody {
  status: boolean // 사용 여부
  settings: APIInviteType
  link: string // 끝의 커스텀 링크 값
  domain: {
    domain: string // 다음 버전에 쓴다함, 커스텀 도메인
    ssl: boolean // ssl 다는지 여부
  }
}

export interface APIMemberBase {
  userName: string
  nickName: string // 주된 user이름으로 사용
  icon: string
  isBlackList: boolean
  accent_color?: number
  flags?: number
  premium_type?: number
  avatar_decoration_data?: string
}

export interface APIMember extends APIMemberBase {
  id: string
}

export interface APIRole {
  id: string
  name: string
}

export interface APIVerifyBody {
  status: boolean
  role: APIRole
}

export interface APIVerify {
  settings?: {
    role: APIRole
  }
  guild: {
    roles: APIRole[]
  }
}

interface instanceConfig extends InternalAxiosRequestConfig {
  retryCount: number
}

interface instanceError extends AxiosError<any, any> {
  config?: instanceConfig
}

export default () => {
  const config = useRuntimeConfig()
  const router = useRouter()
  const route = useRoute()
  const { pathWithLocale } = usePathUtils()
  const { loadingFailed } = useLoadingState()

  const createDashboardAPI = (isShowError: boolean = true) => {
    const headers = getAccessToken()
      ? {
          Authorization: 'Bearer ' + getAccessToken(),
        }
      : undefined

    const instance = axios.create({
      baseURL: (config.public.API_BASE_URL as string) + '/dashboard',
      headers,
      retryCount: 0,
    } as instanceConfig)

    const retry = (config: InternalAxiosRequestConfig, retryAfterSec: number) => {
      return new Promise(resolve => {
        setTimeout(async () => {
          console.log('Retrying request..')

          // 여기서의 instance에서도 동일하게 interceptor 들이 적용됩니다
          const retryRes = await instance.request(config)
          resolve(retryRes)
        }, retryAfterSec * 1000)
      })
    }

    const onRejected = async (err: instanceError) => {
      switch (err.response?.status) {
        case HttpStatusCode.Unauthorized:
          window.localStorage.removeItem('access_token')
          router.push(pathWithLocale('/login'))
          break

        case HttpStatusCode.NotFound:
          router.push(pathWithLocale('/servers'))
          break

        case HttpStatusCode.TooManyRequests:
          if (!err.response?.data.data.retry_after || !err.config) break
          if (err.config.retryCount > 3) break

          err.config.retryCount++

          // Promise를 return 할 경우엔, 아래의 에러 로깅 로직을 거치지 않고 Promise 로직만 실행합니다
          return retry(err.config, err.response.data.data.retry_after)
      }

      if (isShowError) loadingFailed()
      catchNetworkErr(err, isShowError)
      return Promise.reject(err)
    }

    instance.interceptors.response.use(undefined, onRejected)

    return instance
  }

  const get = {
    servers: async (isShowError: boolean = true) => {
      if (config.public.IS_TEST) {
        return new Promise<APIServer[]>(resolve => {
          resolve([
            {
              id: '1',
              icon: 'tesst',
              name: 'test1',
              now: true,
              isInvited: true,
            },
            {
              id: '2',
              icon: 'tesst',
              name: 'test2___________________________________________0',
              now: false,
              isInvited: true,
            },
            {
              id: '3',
              icon: 'tesst',
              name: 'test3',
              now: false,
              isInvited: false,
            },
          ])
        })
      }

      const res = await createDashboardAPI(isShowError).get<APIServer[]>(`/servers?now=${route.query.id}`)
      return res.data
    },
    summary: async (isShowError: boolean = true) => {
      if (config.public.IS_TEST) {
        return new Promise<APISummary>(resolve => {
          resolve({
            user: 1234567890,
            bot: 1234567890,
            newUser: 1234567890,
            blackUser: 1234567890,
            chartData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          })
        })
      }

      const res = await createDashboardAPI(isShowError).get<APISummary>(`/summary?id=${route.query.id}`)
      return res.data
    },
    invite: async (isShowError: boolean = true) => {
      if (config.public.IS_TEST) {
        return new Promise<APIInvite>(resolve => {
          resolve({
            koreanbots: {
              voted: false,
              lastVote: 0,
            },
            premiumType: APIPremiumType.FREE,
            domain: {
              guild: 'test',
              domain: 'test',
              ssl: false,
            },
            settings: {
              status: 1,
              link: 'test',
              settings: APIInviteType.RECAPTCHA,
              guild: 'test',
            },
          })
        })
      }

      const res = await createDashboardAPI(isShowError).get<APIInvite>(`/invite?id=${route.query.id}`)
      return res.data
    },
    members: async (isShowError: boolean = true) => {
      if (config.public.IS_TEST) {
        return new Promise<APIMember[]>(resolve => {
          resolve([
            {
              id: '1',
              userName: 'test1',
              nickName: 'test1',
              icon: 'tesst',
              isBlackList: false,
            },
            {
              id: '2',
              userName: 'test2',
              nickName: 'test2',
              icon: 'tesst',
              isBlackList: true,
            },
          ])
        })
      }

      const res = await createDashboardAPI(isShowError).get<APIMember[]>(`/members?id=${route.query.id}`)
      return res.data
    },
    verify: async (isShowError: boolean = true) => {
      if (config.public.IS_TEST) {
        return new Promise<APIVerify>(resolve => {
          resolve({
            settings: {
              role: { id: '1234', name: 'test' },
            },
            guild: {
              roles: [
                { id: '1234', name: 'test1' },
                { id: '12345', name: 'test2' },
              ],
            },
          })
        })
      }

      const res = await createDashboardAPI(isShowError).get<APIVerify>(`/verify?id=${route.query.id}`)
      return res.data
    },
  }

  const post = {
    invite: async (body: APIInviteBody, isShowError: boolean = true) => {
      const res = await createDashboardAPI(isShowError).post(`/invite?id=${route.query.id}`, body)
      return
    },
    members: async (memberId: string, isShowError: boolean = true) => {
      const res = await createDashboardAPI(isShowError).post(`/members?id=${route.query.id}`, { member: memberId })
      return
    },
    verify: async (body: APIVerifyBody, isShowError: boolean = true) => {
      const res = await createDashboardAPI(isShowError).post(`/verify?id=${route.query.id}`, body)
      return
    },
    authCallback: async (code: string, isShowError: boolean = true) => {
      const res = await createDashboardAPI(isShowError).post(`/auth/callback`, { code })
      return res.data
    },
  }

  return {
    get,
    post,
  }
}
