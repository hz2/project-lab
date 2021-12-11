import { message } from 'antd'

export const downloadBlob = (blob: Blob | MediaSource, name: string) => {
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

/**
 *
 * @param {*} text
 * @param {*} msg
 * @returns
 */
export const copyText = (
  text: string,
  msg: string | undefined = '复制成功！'
) =>
  navigator.clipboard
    .writeText(text)
    .then(() => message.success(msg))
    .catch(e => {
      console.log('copy err: ', e)
    })

/**
 *
 * @param {*} bytes
 * @param {*} decimals
 * @returns
 */

export const formatBytes = (
  bytes: number,
  decimals: number | undefined = 2
) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  // const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const sizes = ['b', 'k', 'm']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const svgStr2b64 = (str = '', val: boolean | string = false) => {
  let out = str
    .replace(/(<\?xml[\w ".=-]+\?>\n*)|version *= *"[\d.]+" |(<!-.*->)/g, '')
    .replace(/(\n +)|[\n\r\t]+/g, ' ')
  if (!/http:\/\/\www\.w3\.org\/2000\/svg/i.test(str)) {
    out = str.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"')
  }
  const output = out.replace(/>[\n\r \t]+</g, '><').replace(/[\n\r \t]+/g, ' ')

  if (val === 'orgin') {
    return output
  } else if (val) {
    return 'data:image/svg+xml;base64,' + window.btoa(output)
  } else {
    return (
      'data:image/svg+xml,' +
      output.replace(/[^\d\w ="'/]/g, x => encodeURIComponent(x))
    )
  }
}

export const svgStr2BlobUrl = (str: string | undefined) => {
  let out = svgStr2b64(str, 'orgin')
  const blob = new Blob([out], {
    type: 'image/svg+xml'
  })
  return URL.createObjectURL(blob)
}
