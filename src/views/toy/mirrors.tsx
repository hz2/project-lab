import React, { useEffect, useState } from 'react'
import { Input } from 'antd'
import './toy.less'
const { TextArea } = Input

// interface IPathItem {
//     path: string
//     remark: string
// }

// interface ITypeItem {
//     zh?: string
//     name?: string
//     user?: string
//     passwdfile?: string
//     reg?: string
//     path: IPathItem[]
// }

// const typeList = [
//     {
//         zh: '阿里云',
//         name: 'aliyun',
//         user: 'a@h2',
//         passwdfile: '~/.ssh/docker-alibabacloud',
//         reg: 'registry.cn-hangzhou.aliyuncs.com',
//         path: [
//             {
//                 path: 'h2',
//                 remark: '私有'
//             },
//             {
//                 path: 'h7',
//                 remark: '私有'
//             },
//             {
//                 path: 'h9',
//                 remark: '私有'
//             }
//         ]
//     },
//     {
//         zh: '腾讯云',
//         name: 'qcloud',
//         user: '100004236481',
//         passwdfile: '~/.ssh/docker-tencentcloud',
//         reg: 'ccr.ccs.tencentyun.com',
//         path: [
//             {
//                 path: 'hzsq',
//                 remark: '私有'
//             }
//         ]
//     },
//     {
//         zh: 'Docker hub',
//         name: 'dockerhub',
//         user: 'hzsq',
//         passwdfile: '~/.ssh/dockerioToken',
//         reg: '',
//         path: [
//             {
//                 path: 'hzsq',
//                 remark: '公有'
//             }
//         ]
//     },
//     {
//         zh: '华为云',
//         name: 'huawei',
//         user: 'cn-north-4@XRV15LDEFWCFLDH7GDXY',
//         passwdfile: '~/.ssh/docker-huaweicloud',
//         reg: 'swr.cn-north-4.myhuaweicloud.com',
//         path: [
//             {
//                 path: 'hz',
//                 remark: '私有'
//             }
//         ]
//     },
//     {
//         zh: '百度云',
//         name: 'baidu',
//         user: '18999d5116464463a9cbc2c7f8f3cf01',
//         passwdfile: '~/.ssh/docker-baiducloud',
//         reg: 'registry.baidubce.com',
//         path: [
//             {
//                 path: 'hz',
//                 remark: '私有'
//             }
//         ]
//     },
//     {
//         zh: '金山云',
//         name: 'ksyun',
//         user: '2615749',
//         passwdfile: '~/.ssh/docker-ksyun',
//         reg: 'hub-cn-shanghai-2.kce.ksyun.com',
//         path: [
//             {
//                 path: 'hzsq',
//                 remark: '私有'
//             },
//             {
//                 path: 'publ',
//                 remark: '公有'
//             }
//         ]
//     }
// ]

interface IProxy {
    origin: string
    host: string
    list: {
        target: string
        host: string
    }[]
}

const proxyList: IProxy[] = [
    {
        origin: "pbs.twimg.com",
        host: "twitter",
        list: [
            {
                target: "box.p0t.top",
                host: 'cloudflare',
            }
        ]
    },
    {
        origin: "images.unsplash.com",
        host: "unsplash",
        list: [
            {
                target: "box.p0t.top",
                host: 'cloudflare',
            }
        ]
    },
    {
        origin: "raw.githubusercontent.com",
        host: "github",
        list: [
            {
                target: "raw.p0t.top",
                host: 'cloudflare',
            }
        ]
    },
    {
        origin: "codeload.github.com",
        host: "github",
        list: [
            {
                target: "codeload.p0t.top",
                host: 'cloudflare',
            }
        ]
    },
    {
        origin: "github.com",
        host: "github",
        list: [
            {
                target: "box.p0t.top/gh",
                host: 'cloudflare',
            }
        ]
    },
    {
        origin: "0xc8.com",
        host: "web",
        list: [
            {
                target: "0x.p0t.top",
                host: 'cloudflare',
            }
        ]
    },
    {
        origin: "vs",
        host: "web",
        list: [
            {
                target: "http://vscode.cdn.azure.cn",
                host: 'azure',
            }
        ]
    }
]

const softwareList = [
    {
        categrory: '基础环境',
        list: [
            {
                name: 'git-scm',
                link: "https://mirrors.tuna.tsinghua.edu.cn/github-release/git-for-windows/git/LatestRelease/",
                icon: 'gwindows_logo.svg',
                offical: 'https://git-scm.com/download',
                altList: []
            },
            {
                name: 'Node.js',
                link: "https://mirrors.tuna.tsinghua.edu.cn/nodejs-release/",
                icon: 'nodejs.svg',
                offical: 'https://nodejs.org/en/download/',
                altList: []
            },
            {
                name: 'npm',
                link: "",
                icon: 'npm.svg',
            },
            {
                name: 'Adoptium',
                link: "https://mirrors.tuna.tsinghua.edu.cn/Adoptium/",
                icon: 'Adoptium.svg',
                offical: "https://adoptium.net/",
            },
            {
                name: 'Maven',
                link: "",
                icon: 'maven.svg',
                offical: "https://maven.apache.org/",
            },
            {
                name: 'Gradle',
                link: "",
                icon: 'gradle-elephant.svg',
                offical: "https://gradle.org/",
            },
        ]
    },
    {
        categrory: '开发工具',
        list: [
            {
                name: 'vscode',
                link: "",
                icon: 'vscode.svg',
                offical: "https://developer.android.google.cn/studio",
            },
            {
                name: 'codium',
                link: "https://mirrors.tuna.tsinghua.edu.cn/github-release/VSCodium/vscodium/LatestRelease/#:~:text=VSCodium%2Dlinux%2Dx64",
                icon: 'codium.svg',
            },
            {
                name: 'dbeaver',
                link: "https://mirrors.tuna.tsinghua.edu.cn/github-release/dbeaver/dbeaver/LatestRelease/",
                icon: 'dbeaver.png',
            },
            {
                name: 'Android Studio',
                link: "",
                icon: 'android-studio.svg',
                offical: "https://developer.android.google.cn/studio",
            },
        ]
    }
]

// get Latest codium version


interface IItem {
    [k: string]: string
}


const genImg = (name: string) => {
    const url = {
        web: 'web.svg',
        arrow: 'arrow.svg',
        cloudflare: 'cloudflare.png',
        github: 'github.svg',
        twitter: 'twitter.svg',
        unsplash: 'unsplash.png',
    }[name]

    console.log('url', url);

    return <img src={require(`./imgs/${url}`)} alt="img" />
}


const Page = () => {
    const [resultList, setResultList] = useState<IItem[]>([])
    const getInfo = () => {
        

        fetch('https://api.github.com/graphql', {
            mode: 'cors',
            method: "POST",
            body: JSON.stringify({
                query: `{
  repository(name: "vscodium", owner: "VSCodium") {
    latestRelease {
      name
      releaseAssets(last: 50 ) {
        ...ReleaseAssetConnectionFragment
        totalCount
      }
    }
  }
}

fragment ReleaseAssetConnectionFragment on ReleaseAssetConnection {
  nodes {
    downloadUrl
    name
  }
}`
            }),
            headers: {
                // https://github.com/settings/tokens/new  Expires on Sat, Apr 13 2024.
                Authorization: "bearer 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",
                // "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.text()
                }
            })
            .then(r => {
                console.log('r', r && JSON.parse(r));

            })

    }

    useEffect(() => {
        getInfo()
    }, [])


    const getMirrors = (url: string) => {
        inputUrl(url)
        const item = proxyList.find(x => url.match(x.origin))
        if (item) {

            const r = item.list.map(x => ({ ...x, origin_host: item.host, link: url.replace(item.origin, x.target) }))

            console.log('r', r);
            setResultList(r)


        }



    }


    const [url, inputUrl] = useState('https://github.com/VSCodium/vscodium/releases/download/1.74.2.23007/VSCodium-linux-x64-1.74.2.23007.tar.gz')

    return (
        <div className="common-box ">
            <div className="my20">获取镜像</div>
            <TextArea
                placeholder={'https://github.com/....tar.gz'}
                rows={4}
                className="w400"
                value={url}
                onChange={({ target: { value } }) => {
                    getMirrors(value)
                }}
            />

            <div className="mirrors-list">
                {resultList.map((x, i) => <div className='item flex start' key={i}>
                    <div className="orgin">
                        {genImg(x.origin_host)}
                    </div>
                    <div className="to">{genImg('arrow')}</div>
                    <a href={x.link} title={x.link}>
                        <div className="host">
                            {genImg(x.host)}
                        </div>
                    </a>
                </div>)}
            </div>

            <div className="my20">软件下载</div>

            <div className="software-list">
                {softwareList.map((x, i) => <div className='categrory' key={i}>
                    <div className="title">{x.categrory}</div>
                    {
                        x.list.map((y, j) => <div className='item' key={j} >
                            <a href={y.link} target="_blank" rel="noreferrer">
                                <div className="img">
                                    <img src={require(`./imgs/${y.icon}`)} alt={y.name} />
                                </div>
                                <div className="name">{y.name}</div></a>
                        </div>)
                    }

                </div>)}
            </div>

        </div>

    )
}

export default Page
