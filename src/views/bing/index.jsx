import React, { useState, useEffect } from 'react'
import { Spin, Image } from 'antd'
import './bing.less'

const req = (mkt, index) =>
  new Promise((resolve, reject) => {
    fetch(
      'https://bing.respok.com/HPImageArchive.aspx?format=js&idx=' +
        index +
        '&n=10&mkt=' +
        mkt,
      { mode: 'cors' }
    )
      .then(response => response.json())
      .then(r => resolve((r && r.images) || []))
      .catch(error => reject(error))
  })

// const openSearch = (x, event) => {   event.preventDefault()
// window.open('https://bing.com' + x.quiz) }
const openView = (x, event) => {
  event.preventDefault()
  window.open(`https://www.bing.com${x.urlbase}_1920x1200.jpg`)
}
const openDown = (name, url, event) => {
  event.preventDefault()
  fetch(url, { mode: 'cors' })
    .then(response => response.blob())
    .then(r => {
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
      file.readAsDataURL(r)
    })
    .catch(err => console.error(new Error(err)))
}

const Bing = () => {
  const [imglist, setImglist] = useState([])
  const [loading, setLoading] = useState(false)
  const [menuShow, toggleMenu] = useState(false)
  const getList = mkt => {
    setLoading(true)
    // setImglist(imglist.map(x => ({})))
    Promise.all([req(mkt, -1), req(mkt, 9)])
      .then(arr => {
        setImglist(
          arr.flat().filter((x, i, o) => x.urlbase !== o[i - 1]?.urlbase)
        )
        setLoading(false)
      })
      .catch(err => setLoading(false) && console.error(new Error(err)))
  }
  const changeto = mkt => {
    getList(mkt)
  }
  useEffect(() => getList('en-ww'), [])

  const items = imglist.map((x = {}, i) => (
    <div className="item" key={i}>
      <div className="btns">
        <a
          className="download btn"
          onClick={e =>
            openDown(
              x.urlbase.split('=')[1] + '.jpg',
              `https://www.bing.com${x.urlbase}_1920x1200.jpg`,
              e
            )
          }
          title="搜索"
          href="#!">
          <span role="img" aria-label="download">
            📥
          </span>
        </a>
        <a
          className="view btn"
          onClick={e => openView(x, e)}
          title="查看"
          href={`https://www.bing.com${x.urlbase}_1920x1200.jpg`}>
          <span role="img" aria-label="view">
            👀
          </span>
        </a>
      </div>
      <Image
        className="imgCotainer"
        alt={x.title}
        src={'https://www.bing.com' + x.urlbase + '_640x480.jpg'}
      />
      <div className="tips">
        <div className="text">{x.copyright?.replace('(©', '\n(©')}</div>
      </div>
    </div>
  ))

  const mktList = [
    'EN-WW',
    'EN-AU',
    'EN-CA',
    'FR-CA',
    'ZH-CN',
    'FR-FR',
    'DE-DE',
    'EN-IN',
    'JA-JP',
    'ES-ES',
    'EN-GB',
    'EN-US'
  ].map((x, i) => (
    <div className="item" key={i} onClick={() => changeto(x)}>
      {x}
    </div>
  ))

  const downAll = e =>
    imglist.forEach(x => {
      const name = x.urlbase.split('=')[1] + '.jpg'
      const url = `https://www.bing.com${x.urlbase}_1920x1200.jpg`
      const name2 = x.urlbase.split('=')[1] + '_1920x1080.jpg'
      const url2 = `https://www.bing.com${x.urlbase}_1920x1080.jpg`
      openDown(name, url, e)
      openDown(name2, url2, e)
    })

  return (
    <div className="bingPage">
      <Spin spinning={loading} size="large">
        <div className="content">{items}</div>
      </Spin>
      <div
        id="toggleMenu"
        className={menuShow ? 'menuShow' : ''}
        onClick={() => toggleMenu(!menuShow)}>
        <span role="img" aria-label="map">
          🌏
        </span>
      </div>
      <div className={menuShow ? 'mktList menuShow' : 'mktList'}>
        {mktList}
        <div className="item" onClick={e => downAll(e)}>
          DownLoad
        </div>
      </div>
    </div>
  )
}

export default Bing
