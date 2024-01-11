import axios, { HttpStatusCode } from 'axios'
import { ALERT } from '~/utils/enums'
import { LOADING_STATE } from '#imports'

//TODO - any로 공구리 친거 전부 명시 해야됨
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
  id: any
  icon: string
  name: string
  now: boolean
  isInvited: boolean
}

export interface APISummary {
  user: number
  bot: number
  new_user: number
  black_user: number
  summary: number[]
}

export interface APIInvite {
  koreanbots: {
    voted: boolean
    lastVote: number
  }
  payData: {
    type: any
    expire: string
  }
  domain: {
    guild: string
    domain: string
    ssl: boolean
  }
  settings: {
    status: number
    link: any
    settings: any
  }
}

export interface APIMemberBase {
  discriminator: string
  userName: string
  global_name: string
  avatar: string
  bot: boolean
  system: boolean
  mfa_enabled: boolean
  banner: string
  accent_color: number
  locale: string
  verified: boolean
  email: string
  flags: number
  premium_type: number
  public_flags: number
  avatar_decoration: string
  // nickName: string
  // icon: string
  // isBlackList: boolean
}

export interface APIMember extends APIMemberBase {
  id: string
}

export interface APIInviteBody {
  status: boolean
  settings: number
  link: string
  domain: {
    domain: string
    ssl: boolean
  }
}

export interface APIVerifyBody {
  status: boolean
  role: any
}

export interface APIVerify {
  settings: {
    role: any
  }
  guild: {
    roles: any[]
  }
}

export default () => {
  const config = useRuntimeConfig()
  const router = useRouter()
  const { pathWithLocale } = usePathUtils()
  const { loadingFailed } = useLoadingState()

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
                //TODO - 요청 다시 한번 하는거로
                window.location.reload()
              }, err.response?.data.data.retry_after * 1000)
              break
          }
        }

        catchNetworkErr(err)
        throw err
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
                //TODO - 요청 다시 한번 하는거로
              }, err.response?.data.data.retry_after * 1000)
              break
          }
        }

        loadingFailed()
        catchNetworkErr(err, true)
        throw err
      },
    )

    return appDashboardAPI
  }

  //TODO - stateless하게 한답시고 serverId를 인자로 받아왔는데, 그냥 생략할까?
  const getServers = async (nowGuildId: number) => {
    if (isNaN(nowGuildId)) throw new Error("invaild 'nowGuildId' prop")

    const res = await createAppAPI().get<APIServer[]>(`/dashboard/servers?now=${nowGuildId}`)
    return res.data
  }

  const getSummary = async (serverId: number) => {
    if (isNaN(serverId)) throw new Error("invaild 'ServerId' prop")

    const res = await createDashboardAPI().get<APISummary>(`/dashboard/summary?id=${serverId}`)
    return res.data
  }

  const getInvite = async (serverId: number) => {
    if (isNaN(serverId)) throw new Error("invaild 'ServerId' prop")

    const res = await createDashboardAPI().get<APIInvite>(`/dashboard/invite?id=${serverId}`)
    return res.data
  }

  const postInvite = async (serverId: number, body: APIInviteBody) => {
    if (isNaN(serverId)) throw new Error("invaild 'ServerId' prop")

    const res = await createDashboardAPI().post(`/dashboard/invite?id=${serverId}`, body)
    return
  }

  const getMembers = async (serverId: number) => {
    if (isNaN(serverId)) throw new Error("invaild 'ServerId' prop")

    const res = await createDashboardAPI().get<APIMember[]>(`/dashboard/members?id=${serverId}`)
    return res.data
  }

  const postMembers = async (serverId: number, memberId: string) => {
    if (isNaN(serverId)) throw new Error("invaild 'ServerId' prop")

    const res = await createDashboardAPI().post(`/dashboard/members?id=${serverId}`, { member: memberId })
    return
  }

  const getVerify = async (serverId: number) => {
    if (isNaN(serverId)) throw new Error("invaild 'ServerId' prop")

    const res = await createDashboardAPI().get<APIVerify>(`/dashboard/verify?id=${serverId}`)
    return res.data
  }

  const postVerify = async (serverId: number, body: APIVerifyBody) => {
    if (isNaN(serverId)) throw new Error("invaild 'ServerId' prop")

    const res = await createDashboardAPI().post(`/dashboard/verify?id=${serverId}`, body)
    return
  }

  //FIXME - staging ??
  const postAuthCallback = async (code: string, isStaging: boolean) => {
    const res = await createDashboardAPI().post(`/dashboard/auth/callback`, {
      code,
      // staging: isStaging,
    })
    return
  }

  return {
    getServers,
    getSummary,
    getInvite,
    postInvite,
    getMembers,
    postMembers,
    getVerify,
    postVerify,
    postAuthCallback,
  }
}
