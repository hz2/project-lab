// https://reqbin.com/lib/ipInfo-api/yel1uw4m/ip-geolocation-api-example
// https://devpal.co/
import { useEffect, useState, useCallback } from 'react'
import { AimOutlined } from "@ant-design/icons";
import { Spin, Input, Form, Button } from 'antd'
import { gql } from "@/libs/req"

import './ip.less'

const transformLonlatToDD = (coordinate: number) => {
  const d = Math.floor(coordinate) //116.512885 转换成度（°）实则是取整
  const m = Math.floor((coordinate % 1) * 60) //0.512885 转换成分(') 实则是0.512885 * 60 后取整。
  const s = ((((coordinate % 1) * 60) % 1) * 60).toFixed(1)
  // const s = Math.floor(coordinate % 1 * 60 % 1 * 60); //0.512885 转换成秒('') 实则是m 值的小数值 * 60后取整。
  // const ms = coordinate % 1 * 60 % 1 * 60 % 1 * 1000; //0.512885 秒（''）值后面如有小数值不能丢舍。
  return `${d}°${m}'${s}"`
}

const convertLoc = (lat: number, lon: number) => {
  const latstr = transformLonlatToDD(lat) + (lat > 0 ? 'N' : 'S')
  const lonstr = transformLonlatToDD(lon) + (lon > 0 ? 'E' : 'W')
  return latstr + ' ' + lonstr
}

const getMap = (loc: string) => {
  const locArr = loc.split(',')
  const [lat, lon] = locArr.map((x: string) => Number(x))
  const [x, y] = [7, 6]
  const iframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lon -
    x}%2C${lat - y}%2C${lon + x}%2C${lat +
    y}&layer=mapnik&marker=${lat}%2C${lon}`

  const b64 = btoa(unescape(encodeURIComponent(convertLoc(lat, lon))))
  return (
    <>
      <iframe
        title="loc map"
        src={iframeSrc}></iframe>
      <iframe
        title="bing map"
        src={`https://www.bing.com/maps/embed?osid=&h=350&w=500&cp=${lat}~${lon}&lvl=5`}></iframe>
      <iframe
        src={`
      https://www.google.com/maps/embed?pb=
      !1m10
        !1m4
          !1m3
            !1d5000000
            !2d${lon}
            !3d${lat}
        !3m3
          !1m2
            !1s0x0%3A0x0
            !2z${b64}
        !5e0`.replace(/[\r \t\n]+/g, '')}
        allowFullScreen={true}
        title="GoogleMap"
        loading="lazy"></iframe>
    </>
  )
  // https://www.google.com/maps/@30.4796148,120.5383719,6384234m/data=!3m1!1e3!4m2!7m1!2e1?hl=zh-CN

  // https://www.google.com/maps/@32.9998961,138.4293071,5z/data=!4m2!7m1!2e1
  // <iframe src="https://www.google.com/maps/embed?pb=
  // \!1m14
  // \!1m12
  // \!1m3
  // \!1d13705818.681931842!2d138.42930715!3d32.999896050000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-CN!2sjp!4v1620183206669!5m2!1szh-CN!2sjp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
}

const getIpInfo = (ip?: string | undefined) => {
  const url = 'https://serv.respok.com/ipinfo_io/' + (ip || 'default')
  return fetch(url, { mode: 'cors' }).then(response => response.json())
}

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};


const getCountry = async (iso:string)=> {
  const r = await gql(`query {
    country(iso:"${iso}") {
      emoji
      name
      zh 
    }
  }`)
  return r.country
}

const Page = () => {
  const [text, setText] = useState({
    ip: '',
    city: '',
    region: '',
    org: '',
    timezone: '',
    postal: '',
    loc: ''
  })
  const [ip, setIp] = useState('')
  const [countryObj, setCountryObj] = useState({
    name: '',
    emoji: '',
    zh: ''
  })
  const [loading, setLoading] = useState(false)

  const queryIp = useCallback(() => {
    setLoading(true)
    getIpInfo(ip)
      .then(async r => {
        if (r) {
          const { country } = r
          setText(r)
          if (country) {
            setCountryObj(await getCountry(country))
          }
        }
      })
      .catch(err => console.error(new Error(err)))
      .finally(() => setLoading(false))
  }, [ip])

  useEffect(() => {
    getIpInfo()
      .then(async r => {
        if (r) {
          const { country } = r
          setText(r)
          if (country) {
            setCountryObj(await getCountry(country))
          }
        }
      })
  }, [])

  return (
    <div className="ip-page p20">
      <div className="flex start">
        <Input
          className="w250 m15"
          placeholder="输入 IP 地址"
          value={ip}
          allowClear
          onChange={({ target: { value } }) => setIp(value)}
        />
        <Button type="primary" onClick={() => queryIp()}>查询</Button>
      </div>
      <Spin spinning={loading} size="large">
        <div className="flex start">
          <Form {...layout}>
            <Form.Item label="I P：">{text.ip}</Form.Item>
            <Form.Item label="地址：">
              {`${countryObj.emoji} ${countryObj.zh || ''} ${countryObj.name}`}
            </Form.Item>
            <Form.Item label="区域：">{`${text.region} ${text.city}`}</Form.Item>
            <Form.Item label="组织：">{text.org}</Form.Item>
            <Form.Item label="邮编：">{text.postal || '-'}</Form.Item>
            <Form.Item label="坐标：">
              <div className="flex start"> <AimOutlined className='mr10' /> {text.loc}</div>
            </Form.Item>
            <Form.Item label="时区：">{text.timezone}</Form.Item>
          </Form>
          {getMap(text.loc)}
        </div>
      </Spin>
    </div>
  )
}

export default Page
