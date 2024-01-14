import type { AxiosError } from 'axios'

const catchNetworkErr = (e: AxiosError<any, any>, doAlert: boolean = false) => {
  let errMsg = ''

  if (e.response) {
    errMsg = 'Response received'
    console.error(e.response.data)
    console.error(e.response.status)
    console.error(e.response.headers)
  } else if (e.request) {
    errMsg = 'Response not received, it could be CORS issue'
    console.error(e.request)
  } else {
    errMsg = 'Request not made'
    console.error(e.message)
  }

  console.error(`[NETWORK ERROR]
ErrorType:    ${errMsg}
ErrorName:    ${e.name}
ErrorMessage: ${e.message}
${e.config?.url ? `ErrorURL:     ${e.config.url}` : ''}`)

  if (doAlert) alert('통신 중 오류가 발생하였습니다. 채널톡으로 문의 부탁드립니다.')
}

export { catchNetworkErr }
