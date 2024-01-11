import { LOADING_STATE } from '#imports'

export default () => {
  const loadingState = useState<LOADING_STATE>('loadingState', () => LOADING_STATE.Connecting)

  const loadingSuccess = () => {
    loadingState.value = LOADING_STATE.Success
  }
  const loadingFailed = () => {
    loadingState.value = LOADING_STATE.Failed
  }

  return { loadingState, loadingSuccess, loadingFailed }
}
