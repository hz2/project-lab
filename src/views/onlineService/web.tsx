import React, { useState } from 'react'
import { Input, Button } from 'antd'

const Page = () => {
  const [url, setUrl] = useState('')
  const urlChange = ({
    target: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    console.log('val', value)
    setUrl(value)
  }
  return (
    <div className="common-box">
      <Input value={url} className='w400' onChange={urlChange} />
      <Button type='primary' className='ml15'>提交</Button>
      <Button type='primary' className='ml15'>二维码</Button>
    </div>
  )
}

export default Page
