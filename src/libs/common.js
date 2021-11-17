import {
  message
} from 'antd'

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


/**
 * 
 * @param {*} text 
 * @param {*} msg 
 * @returns 
 */
export const copyText = (text, msg = '复制成功！') => navigator.clipboard.writeText(text).then(() => message.success(msg)).catch(e => {
  console.log('copy err: ', e);
})


/**
 * 
 * @param {*} bytes 
 * @param {*} decimals 
 * @returns 
 */

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  // const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const sizes = ['b', 'k', 'm'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}