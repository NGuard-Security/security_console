import type { ArrayElement, ArrToEnum } from '~/utils/types'

export default <T extends readonly string[] = []>(modalNames: T) => {
  type ModalName = ArrayElement<T>
  type ModalEnum = ArrToEnum<T>

  const modalsIsShow = useState<Record<ModalName, boolean>>('useModal', () => {
    return Object.keys(modalNames).reduce((acc, name) => {
      acc[name as ModalName] = false
      return acc
    }, {} as Record<ModalName, boolean>)
  })

  const _getModalEnum = (): ModalEnum => {
    const res = [...modalNames, ...modalNames].reduce((prev, value) => {
      prev[value] = value
      return prev
    }, {} as Record<string, string>)

    return res as ModalEnum
  }

  const MODAL = _getModalEnum()

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

  return { modalsIsShow, modalShow, modalClose, modalShowAndClose, MODAL }
}
