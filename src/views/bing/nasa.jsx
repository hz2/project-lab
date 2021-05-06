// https://respok.com/nasa
import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'
import './nasa.less'

const req = () =>
  new Promise((resolve, reject) => {
    fetch('https://respok.com/nasa', { mode: 'cors' })
      .then(response => response.json())
      .then(r => resolve(r))
      .catch(error => reject(error))
  })

const Nasa = () => {
  const [imglist, setImglist] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    req()
      .then(r => {
        setImglist(r.filter(x => x.hdurl))
      })
      .finally(f => setLoading(false))
  }, [])

  const items = imglist.map((x = {}, i) => (
    <div className="item" key={i}>
      <img src={x.hdurl} alt={x.title} />
      <div className="tips">
        <div className="text">
          {x.date + ' ' + x.title} {x.copyright ? ` © ${x.copyright}` : ''}
        </div>
        <div className="text2">{x.explanation}</div>
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
