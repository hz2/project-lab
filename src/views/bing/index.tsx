import { useState, useEffect } from 'react'
import { Spin, Image } from 'antd'
import './bing.less'
import { openDown } from '@libs/common'

interface IWPItem {
  startdate: string
  copyrightlink: string
  urlbase: string
  copyright: string
  title: string
}

type TWPList = IWPItem[]

const req = (mkt: string, index: string | number, delay = 0): Promise<TWPList> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(
        'https://app.hx.fyi/bing/HPImageArchive.aspx?format=js&idx=' +
        index +
        '&n=10&mkt=' +
        mkt,
        { mode: 'cors' }
      )
        .then(response => response.json())
        .then(r => resolve((r && r.images) || []))
        .catch(error => reject(error))
    }, delay);
  })

const openSearch = (
  x: IWPItem,
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) => {
  event.preventDefault()
  if (!x.copyrightlink) return
  if (!x.copyrightlink.startsWith('http')) {
    return
  }
  window.open(x.copyrightlink)
}
const openView = (
  x: IWPItem,
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) => {
  event.preventDefault()
  window.open(`https://www.bing.com${x.urlbase}_UHD.jpg`)
}

const Bing = () => {
  const [imglist, setImglist] = useState<TWPList>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [menuShow, toggleMenu] = useState(false)
  const getList = (mkt: string) => {
    setLoading(true)
    // setImglist(imglist.map(x => ({})))
    Promise.all([req(mkt, -1), req(mkt, 9, 500)])
      .then(arr => {
        const list = (arr.flat() || []).filter(
          (x, i, o) => x.urlbase !== o[i - 1]?.urlbase
        )
        setImglist(list)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        console.error(new Error(err))
      })
  }
  const changeto = (mkt: string) => {
    getList(mkt)
  }
  useEffect(() => getList('en-ww'), [])

  const items = imglist.map((x, i) => (
    <div className="item" key={i}>
      <div className="btns">
        {x.copyrightlink && x.copyrightlink.startsWith('http') ? (
          <a
            className="search btn"
            onClick={e => openSearch(x, e)}
            title={new URLSearchParams(x.copyrightlink.split('?')[1]).get('q') || ''}
            href={x.copyrightlink}>
            <span role="img" aria-label="search">
              🔍
            </span>
          </a>
        ) : null}
        <a
          className="download btn"
          onClick={e =>
            openDown(
              x.urlbase.split('=')[1] + '.jpg',
              `https://s.cn.bing.net${x.urlbase}_UHD.jpg`,
              e
            )
          }
          title="下载原图"
          href="#!">
          <span role="img" aria-label="download">
            📥
          </span>
        </a>
        <a
          className="view btn"
          onClick={e => openView(x, e)}
          title="查看原图"
          href={`https://www.bing.com${x.urlbase}_UHD.jpg`}>
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
        <div className="text">{x.title + '\n' + x.copyright?.replace('(©', '\n(©')}</div>
      </div>
    </div>
  ))
  // https://s.cn.bing.net/th?id=OHR.KissingPenguins_EN-CN8556731919_1920x1080.webp&qlt=10
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

  const downAll = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    imglist.forEach((x, i) => {
      const name = x.urlbase.split('=')[1] + '.jpg'
      const url = `https://s.cn.bing.net${x.urlbase}_UHD.jpg`
      // const name2 = x.urlbase.split('=')[1] + '_1920x1080.jpg'
      // const url2 = `https://s.cn.bing.net${x.urlbase}_1920x1080.jpg`
      setTimeout(() => {
        openDown(name, url, e)
      }, i * 120);
      // openDown(name2, url2, e)
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
        <div className="item" onClick={e => downAll(e)} title="下载全部原图">
          <span role="img" aria-label="download"> 📥 </span>
        </div>
      </div>
    </div>
  )
}

export default Bing
