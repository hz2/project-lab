import { useCallback, useEffect, useState } from 'react'
import { Input, Radio, RadioChangeEvent, Spin, message } from 'antd'
import './style.less'
const { TextArea } = Input

// const translateText = async (str: string) => {
//     const response = await fetch('https://serv.respok.com/transmart', {
//         mode: 'cors',
//         method: "POST",
//         body: JSON.stringify({
//             "header": {
//                 "fn": "auto_translation", "client_key": `browser-${navigator.userAgent.split(' ').at(-1)?.replace('/', '-')}-${navigator.platform?.split(' ')[0]}-${crypto.randomUUID()}-${Date.now()}`
//             },
//             "type": "plain",
//             "model_category": "normal",
//             "text_domain": "general",
//             "source":
//             {
//                 "lang": "zh",
//                 "text_list": str.split('\n').flatMap(x => [x, '\n'])
//             },
//             "target": { "lang": "en" }
//         }),
//         headers: {
//             "Content-Type": "application/json",
//         },

//     })
//     const res = await response.json()
//     return res
// }


const NotationPage = () => {


    const [enStr, setEnStr] = useState('');
    const [zhStr, setZhStr] = useState('');
    type typeRadio = typeof typeList[number]['name']
    type typeListType = typeRadio | 'en' | 'zh'
    type IAllOutput = {
        [key in typeListType]: string
    }
    const [currentType, setCurrentType] = useState<typeRadio>('lowerCamelCase')
    const [outputType, setOutputType] = useState('raw')
    const [outputStr, setOutputStr] = useState('')

    const [outputCustomStr, setOutputCustomStr] = useState(`{
    path: "\${en}",
    name: "prefix\${en}",
    meta: {
        title: "\${zh}"
    },
    component: () => import('@/page/pagePath/\${en}.vue')
},`)

    const typeList = [
        {
            name: 'lowerCamelCase',
            zh: '小驼峰',
            fn: (arr: string[]) => arr.map(([x, ...rest], i) => (i ? x.toUpperCase() : x.toLowerCase()) + rest.join('').toLowerCase()).join('')
        },
        {
            name: 'UpperCamelCase',
            zh: '大驼峰',
            fn: (arr: string[]) => arr.map(([x, ...rest]) => x.toUpperCase() + rest.join('').toLowerCase()).join('').replace(/[_-]\w/g, '-')
        },
        {
            name: 'kebab-case',
            zh: '连字符',
            fn: (arr: string[]) => arr.map(x => x.toLowerCase()).join('-').replace(/_/g, '-')
        },
        // {
        //     name: 'SCREAM-KEBAB-CASE',
        //     zh: '连字符大写', 
        //     fn: (arr: string[]) => arr.map(x => x.toUpperCase()).join('-')
        // },
        // {
        //     name: 'snake_case',
        //     zh: '下划线',
        //     fn: (arr: string[]) => arr.map(x => x.toLowerCase()).join('_')
        // },
        {
            name: 'SCREAM_SNAKE_CASE',
            zh: '下划线',
            fn: (arr: string[]) => arr.map(x => x.toUpperCase()).join('_').replace(/-/g, '_')
        },
    ] as const


    const outputTypeList = [
        {
            name: 'raw',
            zh: '原始',
        },
        {
            name: 'kw',
            zh: '键值对',
        },
        {
            name: 'file',
            zh: 'vue文件',
        },
        {
            name: 'customStr',
            zh: '自定义格式',
        },
    ]
    const genShowOutput = (type: string) => {
        let r = '';
        switch (type) {
            case 'raw':
                r = allOutput.map(x => x[currentType]).join('\n')
                break;
            case 'kw':
                r = allOutput.map(x => `${x[currentType]}:"${x.zh || x.en}",`).join('\n')
                break;
            case 'file':
                r = allOutput.map(x => `echo -e "<template>\\n    <div class=\\\"${x['kebab-case']}\\\">\\n        ${x.zh || x.en}\\n    </div>\\n</template>\\n<script lang=\\\"ts\\\" setup>\\n\\n</script>\\n<style scoped lang=\\\"less\\\">\\n.${x['kebab-case']} {}\\n</style>" > ${x[currentType]}.vue`).join('\n')
                break;
            case 'customStr':
                r = allOutput.map(x => (outputCustomStr || '')
                    .replace(/([a-zA-Z])\$\{en\}/g, (_x, _y) => {
                        let srt = x[currentType];
                        if (currentType === 'kebab-case') {
                            srt = _y + '-' + x[currentType]
                        } else if (currentType === 'SCREAM_SNAKE_CASE') {
                            srt = _y + '_' + x[currentType]
                        } else if (currentType === 'lowerCamelCase') {
                            srt = _y + x[currentType].substring(0, 1).toUpperCase() + x[currentType].substring(1)
                        }
                        return srt
                    })
                    .replace(/\$\{lowerCamelCase\}/g, x['UpperCamelCase'])
                    .replace(/\$\{UpperCamelCase\}/g, x['UpperCamelCase'])
                    .replace(/\$\{kebab-case\}/g, x['kebab-case'])
                    .replace(/\$\{SCREAM_SNAKE_CASE\}/g, x['SCREAM_SNAKE_CASE'])
                    .replace(/\$\{zh\}/g, x.zh || x.en)
                ).join('\n')
                break;
            default:
                break;
        }
        setOutputStr(r);
    }
    const [allOutput, setAllOutput] = useState<IAllOutput[]>([])
    const outputFormat = (en = enStr, zh = zhStr) => {
        const genAllOutputFormat = (en: string) => typeList.reduce((p, c) => Object.assign(p, {
            [c.name]: c.fn(en.split(/[ \-_\']/g).filter(x => x))
        } as const), {} as {
            [key in typeof typeList[number]['name']]: string
        })

        const arrMerge = en.split('\n').filter(x => x).map((x, i) => ({
            en: x,
            zh: zh?.split('\n').filter(x => x)[i] || '',
            // output: transformedRaw.split('\n').filter(x => x)[i] ,
            ...genAllOutputFormat(x)
        }))
        console.log('arrMerge', arrMerge);
        setAllOutput(arrMerge)
    }

    useEffect(() => {
        genShowOutput(outputType)
    }, [allOutput, outputType])
    useEffect(() => {
        outputFormat(enStr, zhStr)
    }, [enStr, zhStr, currentType])

    // const [shouldTranslate, setShouldTranslate] = useState(false)
    // const translateSwitch = (checked: boolean) => {
    //     setShouldTranslate(checked)
    // }

    // const [loading, setLoading] = useState(false)

    const insertText = (text: string) => {
        const textarea: HTMLTextAreaElement | null = document.querySelector('#textEl');
        if (!textarea) return
        // Get the current cursor position
        const position = textarea.selectionStart;
        const range = textarea.selectionEnd - textarea.selectionStart;

        // Get the text before and after the cursor position
        const before = textarea.value.substring(0, position);
        const after = textarea.value.substring(position + range, textarea.value.length);

        // Insert the new text at the cursor position
        // textarea.value = before + text + after;
        setTextShape(before + text + after)
        // Set the cursor position to after the newly inserted text
        textarea.selectionStart = textarea.selectionEnd = position + text.length;
    };
    const setTextShape = (value = outputCustomStr) => {
        setOutputCustomStr(value)
        if (!value) {
            setOutputCustomStr('')
            return
        }
        outputFormat(enStr, zhStr)

    }
    return (
        <Spin spinning={false} size="large">
            <div className="common-tabs inner-page  ">
                <h2>命名法转换</h2>
                {/* <div className="sub-title">
                    <span className='mr15'>当前模式：{!shouldTranslate ? '输入英文' : '输入中文，自动翻译'}</span>
                    <Switch checked={shouldTranslate} onChange={translateSwitch} />
                </div> */}
                <div className="flex start">
                    <div className="block">
                        <div className="block">
                            <div className="sub-title inline-block">英文（ en ）</div></div>
                        <TextArea
                            className='textarea-box'
                            placeholder="englishName"
                            rows={6}
                            value={enStr}
                            onChange={({ target: { value } }) => {
                                setEnStr(value)
                                if (!value) {
                                    setEnStr('')
                                    return
                                }
                                try {
                                    // if (shouldTranslate) {
                                    //     setLoading(true)
                                    //     translateText(value).then(r => {
                                    //         const translatedText = r.auto_translation.join('');
                                    //         setOutputRaw(translatedText)
                                    //         outputFormat(outputType, textTransformChange(translatedText), value)
                                    //     }).finally(() => {
                                    //         setLoading(false)
                                    //     })
                                    // } else {
                                    // setOutputRaw(value)
                                    // }
                                } catch (error) {
                                    console.log('error', error)
                                    message.error('输入有误')
                                }
                            }}
                        />
                    </div>
                    <div className="block ml30">
                        <div className="block">
                            <div className="sub-title inline-block">中文（ zh ）</div></div>
                        <TextArea
                            className='textarea-box'
                            placeholder="对应中文"
                            rows={6}
                            value={zhStr}
                            onChange={({ target: { value } }) => {
                                setZhStr(value)
                                if (!value) {
                                    setZhStr('')
                                    return
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="flex start bottom">
                    <div className="block ">
                        <div className="sub-title-plain">
                            <Radio.Group onChange={({ target: { value } }) => {
                                setCurrentType(value)
                            }} buttonStyle="solid" value={currentType}>
                                {typeList.map((x, i) => (
                                    <Radio.Button className="my5" value={x.name} key={i}>{x.zh}</Radio.Button>
                                ))}
                            </Radio.Group>
                        </div>
                        <TextArea
                            className='textarea-box'
                            placeholder={currentType}
                            rows={12}
                            value={outputStr}
                        />
                    </div>
                    {
                        outputType === 'customStr' &&
                        <div className="block ml30">
                            <div className="flex start">
                                <span>替换变量：</span>
                                <button className="sub-title clickable" onClick={() => insertText('${zh}')}> 中文</button>
                                <button className="sub-title clickable ml15" onClick={() => insertText('${lowerCamelCase}')}>小驼峰</button>
                                <button className="sub-title clickable ml15" onClick={() => insertText('${UpperCamelCase}')}>大驼峰</button>
                                <button className="sub-title clickable ml15" onClick={() => insertText('${kebab-case}')}>连字符</button>
                                <button className="sub-title clickable ml15" onClick={() => insertText('${SCREAM_SNAKE_CASE}')}>下划线</button>
                            </div>
                            <TextArea
                                className='textarea-box'
                                id="textEl"
                                placeholder="请输入"
                                rows={12}
                                value={outputCustomStr}
                                onChange={({ target: { value } }) => setTextShape(value)}
                            />
                        </div>
                    }
                </div>
                <div className="sub-title-plain">
                    <Radio.Group onChange={({ target: { value } }) => {
                        setOutputType(value)
                    }} buttonStyle="solid" value={outputType}>
                        {outputTypeList.map((x, i) => (
                            <Radio.Button className="my5" value={x.name} key={i}>{x.zh}</Radio.Button>
                        ))}
                    </Radio.Group>
                </div>
            </div>
        </Spin>

    )
}

export default NotationPage
