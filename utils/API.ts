import axios from 'axios'

const config = useRuntimeConfig()
const accountStore = useAccountStore()

const appAPI = axios.create({
  baseURL: config.public.API_BASE_URL as string,
})
appAPI.interceptors.response.use(
  res => res,
  err => {
    return err
  },
)

const getAPIServers = async () => {
  //route.query.id
  const res = await appAPI.get('/dashboard/servers?now=' + '', {
    headers: {
      Authorization: 'Bearer ' + accountStore.accessToken,
    },
  })

  return res.data
}

const getAPISummary = () => {}

const getAPIInvite = () => {}

const getAPIMembers = () => {}

const getAPIVerify = () => {}

export { getAPIServers }
