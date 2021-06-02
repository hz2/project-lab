import React, { useState } from 'react'
import { Input } from 'antd'

const Page = () => {
  // is still alive
  return (
    <div className="common-box">
      <Input value={url} onChange={urlChange} />
    </div>
  )
}

export default Page
