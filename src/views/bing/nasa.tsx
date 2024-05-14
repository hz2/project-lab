// https://respok.com/nasa
import { useState, useEffect } from 'react'
import { Spin } from 'antd'
import './nasa.less'

interface INasa {
  hdurl: string
  title: string
  explanation: string
  copyright: string
  date: string
}

type TNasa = INasa[]

const req = (): Promise<TNasa> =>
  new Promise((resolve, reject) => {
    fetch('https://app.hx.fyi/nasa', { mode: 'cors' })
      .then(response => response.json())
      .then(r => resolve(r))
      .catch(error => reject(error))
  })

const Nasa = () => {
  const [imglist, setImglist] = useState<TNasa>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    req()
      .then(r => {
        setImglist(r.filter(x => x.hdurl))
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const items = imglist.map((x, i) => (
    <div className="item" key={i}>
      <img src={x.hdurl} alt={x.title} />
      <div className="tips">
        <div className="text" title={x.explanation}>
          {x.date + ' ' + x.title} {x.copyright ? ` © ${x.copyright}` : ''}
        </div>
        {/* <div className="text2">{x.explanation}</div> */}
      </div>
    </div>
  ))

  return (
    <div className="bingPage">
      <Spin spinning={loading} size="large">
        <div className="nasa-content">{items}</div>
      </Spin>
    </div>
  )
}
export default Nasa
