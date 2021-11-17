export const svgStr2b64 = (str, val = false) => {
  let out = str.replace(/(<\?xml[\w ".=-]+\?>\n*)|version *= *"[\d.]+" |(<!-.*->)|( id=[^<>\s]+)/g, '').replace(/(\n +)|[\n\r\t]+/g, ' ')
  if (!/http:\/\/\www\.w3\.org\/2000\/svg/i.test(str)) {
    out = str.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"')
  }
  const output = out.replace(/>[\n\r \t]+</g, '><').replace(/[\n\r \t]+/g, ' ')

  if (val) {
    return 'data:image/svg+xml;base64,' + window.btoa(output)
  } else {
    return 'data:image/svg+xml,' + output.replace(/[^\d\w ="'/]/g, x => encodeURIComponent(x))
  }
}