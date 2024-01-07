const catchNetworkErr = (e: any, doAlert?: boolean) => {
  if (e.response) {
    console.log(e.response.data)
    console.log(e.response.status)
    console.log(e.response.headers)
  } else if (e.request) {
    console.log(e.request)
  } else {
    console.log(e.message)
  }

  if (doAlert) alert('통신 중 오류가 발생하였습니다. 채널톡으로 문의해 주세요.')
}

export { catchNetworkErr }
