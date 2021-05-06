// https://respok.com/nasa
import React, { useState, useEffect } from 'react'
import { Spin, Image } from 'antd'
import './nasa.less'
import { downloadBlob } from '../../libs/common.js'

const req = () =>
  new Promise((resolve, reject) => {
    fetch('https://respok.com/nasa', { mode: 'cors' })
      .then(response => response.json())
      .then(r => resolve(r))
      .catch(error => reject(error))
  })

const openView = (x, event) => {
  event.preventDefault()
  window.open(x)
}
const openDown = (x, event) => {
  const arr = x.split('/')
  const name = arr[arr.length - 1]
  event.preventDefault()
  fetch(x, { mode: 'cors' })
    .then(response => response.blob())
    .then(r => downloadBlob(r, name))
    .catch(err => console.error(new Error(err)))
}

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
      <div className="btns">
        <a
          className="download btn"
          onClick={e => openDown(x.hdurl, e)}
          title="下载原图"
          href="#!">
          <span role="img" aria-label="download">
            {' '}
            📥{' '}
          </span>
        </a>
        <a
          className="view btn"
          onClick={e => openView(x.hdurl, e)}
          title="查看原图"
          href={x.hdurl}>
          <span role="img" aria-label="view">
            {' '}
            👀{' '}
          </span>
        </a>
      </div>
      <Image className="imgCotainer" alt={x.title} src={x.url} />
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
