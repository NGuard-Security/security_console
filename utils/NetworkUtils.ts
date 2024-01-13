import type { AxiosError } from 'axios'

const catchNetworkErr = (e: AxiosError<any, any>, doAlert: boolean = false) => {
  if (e.config?.url) console.error('NetworkErrorURL: ' + e.config.url)
  console.error(e.name)
  console.error(e.message)

  if (e.response) {
    console.error('NetworkError: Response received')
    console.error(e.response.data)
    console.error(e.response.status)
    console.error(e.response.headers)
  } else if (e.request) {
    console.error('NetworkError: Response not received, it could be CORS issue')
    console.error(e.request)
  } else {
    console.error('NetworkError: Request not made')
    console.error(e.message)
  }

  if (doAlert) alert('통신 중 오류가 발생하였습니다. 채널톡으로 문의해 주세요.')
}

export { catchNetworkErr }
