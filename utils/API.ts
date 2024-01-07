import axios from 'axios'

const config = useRuntimeConfig()

const appAPI = axios.create({
  baseURL: config.public.API_BASE_URL as string,
})
appAPI.interceptors.response.use(
  res => res,
  err => {
    return err
  },
)

const getAPIServers = () => {}
const getAPISummary = () => {}
const getAPIInvite = () => {}
const getAPIMembers = () => {}
const getAPIVerify = () => {}
