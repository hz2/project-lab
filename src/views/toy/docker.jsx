import React, { useState } from 'react'
import { Input, Radio } from 'antd'
import "./toy.less"


const Page = () => {
    const typeList = [
        {
            zh: "阿里云",
            name: 'aliyun',
            user: 'a@h2',
            passwdfile: '~/.ssh/docker-alibabacloud',
            reg: 'registry.cn-hangzhou.aliyuncs.com',
            path: [
                {
                    path: "h2",
                    remark: "私有"
                },
                {
                    path: "h7",
                    remark: "私有"
                },
                {
                    path: "h9",
                    remark: "私有"
                },
            ]
        },
        {
            zh: "腾讯云",
            name: 'qcloud',
            user: '100004236481',
            passwdfile: '~/.ssh/docker-tencentcloud',
            reg: 'ccr.ccs.tencentyun.com',
            path: [
                {
                    path: "hzsq",
                    remark: "私有"
                }
            ]
        },
        {
            zh: "Docker hub",
            name: 'dockerhub',
            user: 'hzsq',
            passwdfile: '~/.ssh/dockerioToken',
            reg: '',
            path: [
                {
                    path: "hzsq",
                    remark: "公有"
                }
            ]
        },
        {
            zh: "华为云",
            name: 'huawei',
            user: 'cn-north-4@XRV15LDEFWCFLDH7GDXY',
            passwdfile: '~/.ssh/docker-huaweicloud',
            reg: 'swr.cn-north-4.myhuaweicloud.com',
            path: [
                {
                    path: "hz",
                    remark: "私有"
                }
            ]
        },
        {
            zh: "百度云",
            name: 'baidu',
            user: '18999d5116464463a9cbc2c7f8f3cf01',
            passwdfile: '~/.ssh/docker-baiducloud',
            reg: 'registry.baidubce.com',
            path: [
                {
                    path: "hz",
                    remark: "私有"
                }
            ]
        },
        {
            zh: "金山云",
            name: 'ksyun',
            user: '2615749',
            passwdfile: '~/.ssh/docker-ksyun',
            reg: 'hub-cn-shanghai-2.kce.ksyun.com',
            path: [
                {
                    path: "hzsq",
                    remark: "私有"
                },
                {
                    path: "publ",
                    remark: "公有"
                },
            ]
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
        <div className="common-box ">
            <div className="my20">选择仓库：</div>
            <Radio.Group onChange={onChangeFn} buttonStyle="solid" value={radio}>
                {typeList.map((x, i) => (
                    <Radio.Button className="my5" value={x.name} key={i}>
                        {x.zh}
                    </Radio.Button>
                ))}
            </Radio.Group>
            <div className="my20">登录：</div>
            <div>Linux</div>

            <pre className="code-block">{`docker login -u ${obj.user} ${obj.reg} < ${obj.passwdfile}  --password-stdin`}</pre>

            <div>Windows</div>

            <pre className="code-block">{`type ${obj.passwdfile} | docker login -u ${obj.user} ${obj.reg} --password-stdin`}</pre>

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
