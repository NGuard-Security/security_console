const getAccessToken = () => {
  return window.localStorage.getItem('access_token')
}

const setAccessToken = (value: string) => {
  window.localStorage.setItem('access_token', value)
}

const removeAccessToken = () => {
  window.localStorage.removeItem('access_token')
}

export { getAccessToken, setAccessToken, removeAccessToken }
