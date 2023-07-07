import  { useState } from 'react'
import { Input, Button } from 'antd'
import "./web.less";

const Page = () => {
  const [url, setUrl] = useState('')
  const [twObj, setTwObj] = useState({
    link: ''
  })
  const [phObj, setPhObj] = useState({
    link: ''
  })
  const urlChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(value)
  }
  const handleUrl = () => {
    console.log('url', url);

    if (!url) {
      return
    }
    // twitter
    const tw = url.match(/pbs\.twimg\.com\/media\/(FJBhq7JakAAXztR)\?format=([a-z]+)&name=/i)
    if (tw) {
      const link = `https://app.hx.fyi/media/${tw[1]}?format=${tw[2]}&name=orig`
      setTwObj({
        link
      })
    }
    // 
    const ph = url.match(/^https:\/\/telegra.ph\/([\w\d\-_]+)/i)
    if (ph) {
      const link = `https://app.hx.fyi/${ph[1]}`
      setPhObj({
        link
      })

    }

  }
  return (
    <div className="common-box">
      <nav>
        <Input value={url} className='w400' placeholder='https://www.' onChange={urlChange} />
        <Button type='primary' className='ml15' onClick={() => handleUrl()}>提交</Button>
        <Button type='primary' className='ml15'>二维码</Button>
      </nav>
      {twObj.link ? <section className='twipic' >
        <img src={twObj?.link} alt="" />

      </section> : null}
      {phObj.link ? <section className='ph-article' >
        <a href={phObj.link}>{phObj.link}</a>

      </section> : null}


    </div>
  )
}

export default Page