import React, { useState } from 'react'
import { Input } from 'antd'

const Page = () => {
  // is still alive
  const [url, setUrl] = useState<number | string>('')
  const urlChange = () => {
    setUrl(1)
  }
  return (
    <div className="common-box">
      <Input value={url} onChange={urlChange} />
    </div>
  )
}

export default Page
