// https://reqbin.com/lib/ipInfo-api/yel1uw4m/ip-geolocation-api-example
// https://devpal.co/
import React, { useEffect, useState } from 'react'
import { getCountry } from './country'

const getMap = loc => {
  const locArr = loc.split(',')
  const [lat, lon] = locArr.map(x => x * 1)
  const [x, y] = [7, 6]
  const iframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lon -
    x}%2C${lat - y}%2C${lon + x}%2C${lat +
    y}&layer=mapnik&marker=${lat}%2C${lon}`
  return (
    <iframe width="500" height="350" frameBorder="0" src={iframeSrc}></iframe>
  )
}
const Page = () => {
  const [text, setText] = useState({})
  const [countryObj, setCountryObj] = useState({})
  const [mapIframe, setMapIframe] = useState('')

  useEffect(() => {
    const url = 'https://respok.com/ipinfo_io/default'
    fetch(url, { mode: 'cors' })
      .then(response => response.json())
      .then(r => {
        if (r) {
          const { country, loc } = r
          setText(r)
          if (loc) {
            const mapIframe = getMap(loc)
            setMapIframe(mapIframe)
          }
          if (country) {
            const countryObj = getCountry(country)
            setCountryObj(countryObj)
          }
        }
      })
      .catch(err => console.error(new Error(err)))
  }, [])
  return (
    <div className="p20">
      {/* <div className="flex">
      <Input
        className="m15"
        placeholder="输入 IP 地址"
        value={this.state.idcvalue}
        onChange={this.handleChange}
      />
      <Button type="primary">查询</Button>
    </div> */}
      <ul>
        <li>IP: {text.ip || ''}</li>
        <li>
          地址：
          {`${countryObj.emoji || ''} ${countryObj.zh ||
            ''} ${countryObj.name || ''}`}
        </li>
        <li>区域: {`${text.region || ''} ${text.city || ''}`}</li>
        <li>组织: {text.org}</li>
        <li>邮编: {text.postal || ''}</li>
        <li>坐标: {text.loc || ''}</li>
        <li>时区: {text.timezone || ''}</li>
      </ul>
      {mapIframe}
    </div>
  )
}

export default Page

// https://respok.com/ipinfo_io/

// https://respok.com/ipinfo_io/default
