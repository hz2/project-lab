import { useState } from 'react'
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
    const [outputStr, setOutputStr] = useState('')


    const [enStr, setEnStr] = useState('');
    const [zhStr, setZhStr] = useState('');
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
    ]
    const [currentType, setCurrentType] = useState('lowerCamelCase')
    const onChangeFn = ({ target: { value: type } }: RadioChangeEvent) => {
        setCurrentType(type)
        outputFormat(outputType, textTransformChange(enStr, type), enStr, zhStr)
    }
    const textTransformChange = (value = enStr, type = currentType) => {
        const fn = typeList.find(x => x.name === type)?.fn || ((str: string[]) => str.join(''))
        return value.split('\n').filter(x => x).map(x => fn(x.split(/[ \-_\']/g).filter(x => x))).join('\n')
    }
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
    const [outputType, setOutputType] = useState('raw')
    const outputChangeFn = ({ target: { value: type } }: RadioChangeEvent) => {
        setOutputType(type)
        outputFormat(type)
    }
    const outputFormat = (type = outputType, transformedRaw = textTransformChange(enStr), en = enStr, zh = zhStr) => {
        const arrMerge = en.split('\n').filter(x => x).map((x, i) => ({
            en: x,
            zh: zh?.split('\n').filter(x => x)[i] || '',
            output: transformedRaw.split('\n').filter(x => x)[i]
        }))
        console.log('arrMerge', arrMerge);

        let r = '';
        switch (type) {
            case 'raw':
                r = arrMerge.map(x => x.output).join('\n')
                break;
            case 'kw':
                r = arrMerge.map(x => `${x.output}:"${x.zh || x.en}",`).join('\n')
                break;
            case 'file':
                r = arrMerge.map(x => `echo -e "<template>\\n    <div class=\\\"common-page\\\">\\n        ${x.zh || x.en}\\n    </div>\\n</template>\\n<script lang=\\\"ts\\\" setup>\\n\\n</script>\\n<style scoped lang=\\\"less\\\">\\n.common-page {\\n    min-height: calc(100vh - 1px);\\n    background-color: #e8e8e8;\\n}\\n</style>" > ${x.output}.vue`).join('\n')
                break;
            case 'customStr':
                r = arrMerge.map(x => (outputCustomStr || '')
                    .replace(/([a-zA-Z])\$\{en\}/g, (_x, _y) => {
                        let srt = x.output;
                        if (currentType === 'kebab-case') {
                            srt = _y + '-' + x.output
                        } else if (currentType === 'SCREAM_SNAKE_CASE') {
                            srt = _y + '_' + x.output
                        } else if (currentType === 'lowerCamelCase') {
                            srt = _y + x.output.substring(0, 1).toUpperCase() + x.output.substring(1)
                        }
                        return srt
                    })
                    .replace(/\$\{en\}/g, x.output)
                    .replace(/\$\{zh\}/g, x.zh || x.en)
                ).join('\n')
                break;
            default:
                break;
        }
        setOutputStr(r);
    }

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
        outputFormat(outputType, textTransformChange(enStr), enStr, zhStr)

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
                            className='w400'
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
                                    outputFormat(outputType, textTransformChange(value), value, zhStr)
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
                            className='w400'
                            placeholder="对应中文"
                            rows={6}
                            value={zhStr}
                            onChange={({ target: { value } }) => {
                                setZhStr(value)
                                if (!value) {
                                    setZhStr('')
                                    return
                                }

                                outputFormat(outputType, textTransformChange(enStr), enStr, value)
                            }}
                        />
                    </div>
                </div>
                <div className="flex start bottom">
                    <div className="block ">
                        <div className="sub-title-plain">
                            <Radio.Group onChange={onChangeFn} buttonStyle="solid" value={currentType}>
                                {typeList.map((x, i) => (
                                    <Radio.Button className="my5" value={x.name} key={i}>{x.zh}</Radio.Button>
                                ))}
                            </Radio.Group>
                        </div>
                        <TextArea
                            className='w400'
                            placeholder={currentType}
                            rows={12}
                            value={outputStr}
                        />
                    </div>
                    {
                        outputType === 'customStr' &&
                        <div className="block ml30">
                            <div className="flex start">
                                <button className="sub-title clickable" onClick={() => insertText('${zh}')}> zh</button>
                                <button className="sub-title clickable ml15" onClick={() => insertText('${en}')}>en</button>
                            </div>
                            <TextArea
                                className='w400'
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
                    <Radio.Group onChange={outputChangeFn} buttonStyle="solid" value={outputType}>
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
