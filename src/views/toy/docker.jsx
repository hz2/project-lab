import React, { useState } from 'react'
import { Input, Radio } from 'antd'

const Page = () => {
    const typeList = [
        {
            zh: "阿里云",
            name: 'aliyun',
            user: 'a@h2',
            passwdfile: '~/.ssh/docker-alibabacloud',
            reg: 'registry.cn-hangzhou.aliyuncs.com',
            path: ''
        }, {
            zh: "腾讯云",
            name: 'qcloud',
            user: '100004236481',
            passwdfile: '~/.ssh/docker-tencentcloud',
            reg: 'ccr.ccs.tencentyun.com',
            path: ''
        }, {
            zh: "Docker hub",
            name: 'dockerhub',
            user: 'hzsq',
            passwdfile: '~/.ssh/dockerioToken',
            reg: '',
            path: ''
        },

    ]
    const [obj, setObj] = useState(typeList[0])
    const urlChange = ({ target: { value } }) => {
        setObj({
            ...obj,
            value: value,
        })
    }

    const [radio, setRadio] = useState('aliyun');

    const onChangeFn = ({ target: { value } }) => {
        const item = typeList.find(x => x.name === value) || {}
        setObj(item)
        setRadio(value)
    }

    return (
        <div className="common-box">
            <div className="my20">选择仓库：</div>
            <Radio.Group onChange={onChangeFn} buttonStyle="solid" value={radio}>
                {typeList.map((x, i) => (
                    <Radio.Button className="my5" value={x.name} key={i}>
                        {x.zh}
                    </Radio.Button>
                ))}
            </Radio.Group>
            {/* {url.text ? <>
                <div className="my20">协议说明：</div>
                <span> {url.text}</span>
            </> : null}
            <div className="my20">输入数值：</div>
            <div className="w350">
                <Input value={url.value} onChange={urlChange} />
            </div>
            <div className="my20">访问结果：</div>
            <a href={url.protocol + url.value} target="_blank" rel="noopener noreferrer">{url.protocol + url.value}</a> */}
        </div>
    )
}

export default Page
