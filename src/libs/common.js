export const downloadBlob = (blob, name) => {
  const blobUrl = URL.createObjectURL(blob)
  const el = document.createElement('a')
  el.setAttribute('href', blobUrl)
  el.setAttribute('download', name)
  if (document.createEvent) {
    const event = document.createEvent('MouseEvents')
    event.initEvent('click', true, true)
    el.dispatchEvent(event)
  } else {
    el.click()
  }
}
