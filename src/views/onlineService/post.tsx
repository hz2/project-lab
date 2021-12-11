import React, { useState } from 'react'
import { Input } from 'antd'

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
      <Input value={url} onChange={urlChange} />
    </div>
  )
}

export default Page
