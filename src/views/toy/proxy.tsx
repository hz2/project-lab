import React, { useState } from 'react'
import { Input, Select, Radio, message, RadioChangeEvent } from 'antd'
import './toy.less'

interface IPathItem {
    path: string
    remark: string
}

interface ITypeItem {
    zh?: string
    name?: string
    user?: string
    passwdfile?: string
    reg?: string
    path: IPathItem[]
}

const typeList = [
    {
        zh: '阿里云',
        name: 'aliyun',
        user: 'a@h2',
        passwdfile: '~/.ssh/docker-alibabacloud',
        reg: 'registry.cn-hangzhou.aliyuncs.com',
        path: [
            {
                path: 'h2',
                remark: '私有'
            },
            {
                path: 'h7',
                remark: '私有'
            },
            {
                path: 'h9',
                remark: '私有'
            }
        ]
    },
    {
        zh: '腾讯云',
        name: 'qcloud',
        user: '100004236481',
        passwdfile: '~/.ssh/docker-tencentcloud',
        reg: 'ccr.ccs.tencentyun.com',
        path: [
            {
                path: 'hzsq',
                remark: '私有'
            }
        ]
    },
    {
        zh: 'Docker hub',
        name: 'dockerhub',
        user: 'hzsq',
        passwdfile: '~/.ssh/dockerioToken',
        reg: '',
        path: [
            {
                path: 'hzsq',
                remark: '公有'
            }
        ]
    },
    {
        zh: '华为云',
        name: 'huawei',
        user: 'cn-north-4@XRV15LDEFWCFLDH7GDXY',
        passwdfile: '~/.ssh/docker-huaweicloud',
        reg: 'swr.cn-north-4.myhuaweicloud.com',
        path: [
            {
                path: 'hz',
                remark: '私有'
            }
        ]
    },
    {
        zh: '百度云',
        name: 'baidu',
        user: '18999d5116464463a9cbc2c7f8f3cf01',
        passwdfile: '~/.ssh/docker-baiducloud',
        reg: 'registry.baidubce.com',
        path: [
            {
                path: 'hz',
                remark: '私有'
            }
        ]
    },
    {
        zh: '金山云',
        name: 'ksyun',
        user: '2615749',
        passwdfile: '~/.ssh/docker-ksyun',
        reg: 'hub-cn-shanghai-2.kce.ksyun.com',
        path: [
            {
                path: 'hzsq',
                remark: '私有'
            },
            {
                path: 'publ',
                remark: '公有'
            }
        ]
    }
]



const proxyList = [
    {
        orgin: "pbs.twimg.com",
        host: "twitter",
        proxyList: [
            {
                target: "box.p0t.top",
                host: 'cloudflare',
            }
        ]
    },
    {
        orgin: "images.unsplash.com",
        host: "unsplash",
        proxyList: [
            {
                target: "box.p0t.top",
                host: 'cloudflare',
            }
        ]
    },
    {
        orgin: "raw.githubusercontent.com",
        proxyList: [
            {
                target: "raw.p0t.top",
                host: 'cloudflare',
            }
        ]
    },
    {
        orgin: "codeload.github.com",
        proxyList: [
            {
                target: "codeload.p0t.top",
                host: 'cloudflare',
            }
        ]
    },
    {
        orgin: "github.com",
        proxyList: [
            {
                target: "box.p0t.top/gh",
                host: 'cloudflare',
            }
        ]
    },
    {
        orgin: "0xc8.com",
        proxyList: [
            {
                target: "0x.p0t.top",
                host: 'cloudflare',
            }
        ]
    },
    {
        origin: "vs",
        target: "http://vscode.cdn.azure.cn"
    }
]


// get Latest codium version


interface SelectElement {
    createTextRange?(): {
        moveToElementText: (arg0: HTMLElement) => void
        select: () => void
    }
}
function selectText(node: HTMLElement) {
    const body = document.body as SelectElement
    if (body.createTextRange) {
        const range = body.createTextRange()
        if (range.moveToElementText && range.select) {
            range.moveToElementText(node)
            range.select()
        }
    } else if (window.getSelection) {
        const selection = window.getSelection()
        if (!selection) return
        const range = document.createRange()
        range.selectNodeContents(node)
        selection.removeAllRanges()
        selection.addRange(range)
    } else {
        console.warn('Could not select text in node: Unsupported browser.')
    }
    navigator.clipboard
        .writeText(node.innerText)
        .then(() => message.success('复制成功！'))
}

const codeClick = ({ target }: React.MouseEvent<HTMLElement>) =>
    selectText(target as HTMLElement)

interface IInput {
    name: string
    version: string
    namespace: string
}

const Page = () => {
    const [obj, setObj] = useState<ITypeItem>(typeList[0])
    const [radio, setRadio] = useState('aliyun')

    const [inputVal, setInput] = useState<IInput>({
        name: 'name',
        version: 'latest',
        namespace: 'h2'
    })

    const inputChange = (
        { target: { value = '' } }: React.ChangeEvent<HTMLInputElement>,
        fn: string
    ) =>
        setInput({
            ...inputVal,
            [fn]: value
        })

    const onChangeFn = ({ target: { value } }: RadioChangeEvent) => {
        const item: ITypeItem = typeList.find(x => x.name === value) || { path: [] }
        setObj(item)
        setRadio(value)
        const namespace = item.path[0].path
        setInput({
            ...inputVal,
            namespace
        })

        const selection = window.getSelection()
        if (selection) {
            selection.removeAllRanges()
        }
    }

    const selectChange = (val: string) => {
        setInput({
            ...inputVal,
            namespace: val
        })
    }

    const reg2 = obj.reg ? obj.reg + '/' : ''
    const { namespace, name, version } = inputVal

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

            <pre
                className="code-block"
                onClick={
                    codeClick
                }>{`docker login -u ${obj.user} ${obj.reg} < ${obj.passwdfile}  --password-stdin`}</pre>

            <div>Windows</div>
            <pre
                className="code-block"
                onClick={
                    codeClick
                }>{`type ${obj.passwdfile} | docker login -u ${obj.user} ${obj.reg} --password-stdin`}</pre>

            <div className="my20">构建</div>
            <pre
                className="code-block"
                onClick={codeClick}>{`docker build -t ${name} .`}</pre>

            <div className="my20">打包和推送</div>
            <div className="my20 flex start">
                <span className="m15">命名空间</span>
                <Select
                    showSearch
                    className="w150"
                    placeholder="选择命名空间"
                    value={namespace}
                    onChange={selectChange}
                    options={obj.path.map(x => ({
                        label: `${x.path} (${x.remark})`,
                        value: x.path
                    }))}></Select>
                <span className="m15">包名</span>
                <Input
                    value={name}
                    onChange={e => inputChange(e, 'name')}
                    placeholder="packname"
                    className="w150"
                />
                <span className="m15">版本号</span>
                <Input
                    value={version}
                    onChange={e => inputChange(e, 'version')}
                    placeholder="v0.1"
                    className="w150"
                />
            </div>
            <pre
                className="code-block"
                onClick={
                    codeClick
                }>{`docker tag ${name}:${version} ${reg2}${namespace}/${name}:${version}
docker push ${reg2}${namespace}/${name}:${version}
docker rmi ${reg2}${namespace}/${name}:${version}`}</pre>
        </div>
    )
}

export default Page
