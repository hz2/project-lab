// https://reqbin.com/lib/ipInfo-api/yel1uw4m/ip-geolocation-api-example
// https://devpal.co/
import React, { useEffect, useState } from 'react'
const Page = () => {
  const [text, setText] = useState('')

  useEffect(() => {
    const url = 'https://respok.com/ipinfo_io/default'
    fetch(url, { mode: 'cors' })
      .then(response => response.json())
      .then(r => {
        // console.log('r', r)
        if (r) {
          const { country, city, ip } = r
          setText(`${country} ${city} ==> ${ip}`)
        }
      })
      .catch(err => console.error(new Error(err)))
  }, [])
  return <div>{text}</div>
}

export default Page

// https://respok.com/ipinfo_io/

// https://respok.com/ipinfo_io/default

// https://respok.com/ipinfo_io/org
