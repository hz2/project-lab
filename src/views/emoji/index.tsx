
import './style.less'

// let output = (len, start) => {
//   return new Array(len)
//     .fill(1)
//     .map((x, i) => String.fromCodePoint(start + i))
//     .join(' ')
// }

const output = Array.from(Array(5000), (_x, i) => (125000 + i).toString(16))

const openDown = (
  name: string,
  url: RequestInfo,
  event: React.MouseEvent<Element, MouseEvent>,
  i: number
) => {
  event.preventDefault()
  fetch(url, { mode: 'cors' })
    .then(response => {
      if (response.ok) {
        console.log('index==>', i)
        return response.blob()
      }
    })
    .then(r => {
      if (!r) return
      const file = new FileReader()
      file.onload = e => {
        if (!e.target) return
        const result = e.target.result + ''
        const el = document.createElement('a')
        el.setAttribute('href', result)
        el.setAttribute('download', name)
        if (document.createEvent) {
          const event = document.createEvent('MouseEvents')
          event.initEvent('click', true, true)
          el.dispatchEvent(event)
        } else {
          el.click()
        }
      }
      file.readAsDataURL(r)
    })
    .catch(err => console.error(new Error(err)))
}

const downloadlist = (event: React.MouseEvent<Element, MouseEvent>) => {
  output.forEach((x, i) => {
    const name = x + '.svg'
    const url = `https://abs-0.twimg.com/emoji/v2/svg/${x}.svg`
    openDown(name, url, event, i)
  })
}

const About = () => (
  <div className="container">
    <div className="symbol">
      <button onClick={event => downloadlist(event)}>下载</button>
      {/* <h1>太玄经</h1>
      <h1>{output(87, 0x1d300)}</h1>
      <hr />
      <h1>爻</h1>
      <h1>{output(64, 0x4dc0)}</h1>
      <hr />
      <h1>扑克</h1>
      <h1>{output(82, 0x1f0a0)}</h1>
      <hr />
      <h1>domino</h1>
      <h1>{output(100, 0x1f030)}</h1>
      <h1>麻将</h1>
      <h1>{output(44, 0x1f000)}</h1> */}
    </div>
  </div>
)

export default About
