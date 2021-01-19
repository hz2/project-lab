export const downloadBlob = (blob, name) => {
  let file = new FileReader()
  file.onload = e => {
    let el = document.createElement('a')
    el.setAttribute('href', e.target.result)
    el.setAttribute('download', name)
    if (document.createEvent) {
      var event = document.createEvent('MouseEvents')
      event.initEvent('click', true, true)
      el.dispatchEvent(event)
    } else {
      el.click()
    }
  }
  file.readAsDataURL(blob)
}
