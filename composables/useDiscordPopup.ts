export default () => {
  const popupWidth = 450
  const popupHeight = 940
  const popupX = document.body.offsetWidth / 2 + window.screenX - popupWidth / 2
  const popupY = document.body.offsetHeight / 2 + window.screenY - popupHeight / 2

  const discordPopup = (url: string, target?: string) => {
    window.open(
      url,
      target || (isMobileOrTablet() ? '_self' : '_blank'),
      `width = ${popupWidth}, height = ${popupHeight}, top = ${popupY}, left = ${popupX}, location = no, toolbars = no, status = no`,
    )
  }

  return { discordPopup }
}
