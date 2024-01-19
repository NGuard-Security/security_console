import type { ArrayElement } from '~/utils/types'

export default <T extends readonly string[]>(modalNames: T) => {
  type ModalName = ArrayElement<T>

  const modalsIsShow = useState<Record<ModalName, boolean>>('useModal', () => {
    return Object.keys(modalNames).reduce((acc, name) => {
      acc[name as ModalName] = false
      return acc
    }, {} as Record<ModalName, boolean>)
  })

  const modalShow = (name: ModalName) => {
    modalsIsShow.value[name] = true
  }

  const modalClose = (name: ModalName) => {
    modalsIsShow.value[name] = false
  }

  const modalShowAndClose = async (name: ModalName, waitMs: number) => {
    modalsIsShow.value[name] = true
    await wait(waitMs)
    modalsIsShow.value[name] = false
  }

  return { modalsIsShow, modalShow, modalClose, modalShowAndClose }
}
