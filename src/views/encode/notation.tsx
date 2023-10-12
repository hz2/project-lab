import  { useState } from 'react'
import { Input, Radio, RadioChangeEvent, Spin, Switch, message } from 'antd'
import './style.less'
const { TextArea } = Input

const translateText = async (str: string) => {
    const response = await fetch('https://serv.respok.com/transmart', {
        mode: 'cors',
        method: "POST",
        body: JSON.stringify({
            "header": {
                "fn": "auto_translation", "client_key": `browser-${navigator.userAgent.split(' ').at(-1)?.replace('/', '-')}-${navigator.platform?.split(' ')[0]}-${crypto.randomUUID()}-${Date.now()}`
            },
            "type": "plain",
            "model_category": "normal",
            "text_domain": "general",
            "source":
            {
                "lang": "zh",
                "text_list": str.split('\n').flatMap(x => [x, '\n'])
            },
            "target": { "lang": "en" }
        }),
        headers: {
            "Content-Type": "application/json",
        },

    })
    const res = await response.json()
    return res
}


const NotationPage = () => {
    const [inputStr, setInputStr] = useState('')
    const [outputStr, setOutputStr] = useState('')
    const [outputRaw, setOutputRaw] = useState('')
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
        outputFormat(outputType, textTransformChange(outputRaw, type), inputStr)
    }
    const textTransformChange = (value = outputRaw, type = currentType) => {
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
            zh: '文件',
        },
    ]
    const [outputType, setOutputType] = useState('raw')
    const outputChangeFn = ({ target: { value: type } }: RadioChangeEvent) => {
        setOutputType(type)
        outputFormat(type)
    }
    const outputFormat = (type = outputType, transformedRaw = textTransformChange(outputRaw), input = inputStr) => {
        const arrMerge = input.split('\n').filter(x => x).map((x, i) => ({
            input: x,
            output: transformedRaw.split('\n').filter(x => x)[i]
        }))
        let r = '';
        switch (type) {
            case 'raw':
                r = arrMerge.map(x => x.output).join('\n')
                break;
            case 'kw':
                r = arrMerge.map(x => `${x.output}:"${x.input}",`).join('\n')
                break;
            case 'file':
                r = arrMerge.map(x => `echo "<template><div class=\\\"page\\\">${x.input}</div></template>" > ${x.output}.vue`).join('\n')
                break;
            default:
                break;
        }
        setOutputStr(r);
    }

    const [shouldTranslate, setShouldTranslate] = useState(false)
    const translateSwitch = (checked: boolean) => {
        setShouldTranslate(checked)
    }

    const [loading, setLoading] = useState(false)

    return (
        <Spin spinning={loading} size="large">
            <div className="common-tabs">
                <div className="sub-title">
                    <span className='mr15'>当前模式：{!shouldTranslate ? '输入英文' : '输入中文，自动翻译'}</span>
                    <Switch checked={shouldTranslate} onChange={translateSwitch} />
                </div>
                <TextArea
                    placeholder={!shouldTranslate ? 'englishName' : '中文'}
                    rows={6}
                    value={inputStr}
                    onChange={({ target: { value } }) => {
                        setInputStr(value)
                        if (!value) {
                            setOutputStr('')
                            return
                        }
                        try {
                            if (shouldTranslate) {
                                setLoading(true)
                                translateText(value).then(r => {
                                    const translatedText = r.auto_translation.join('');
                                    setOutputRaw(translatedText)
                                    outputFormat(outputType, textTransformChange(translatedText), value)
                                }).finally(() => {
                                    setLoading(false)
                                })
                            } else {
                                setOutputRaw(value)
                                outputFormat(outputType, textTransformChange(value), value)
                            }
                        } catch (error) {
                            console.log('error', error)
                            message.error('输入有误')
                        }
                    }}
                />
                <div className="sub-title-plain">
                    <Radio.Group onChange={onChangeFn} buttonStyle="solid" value={currentType}>
                        {typeList.map((x, i) => (
                            <Radio.Button className="my5" value={x.name} key={i}>{x.zh}</Radio.Button>
                        ))}
                    </Radio.Group>
                </div>
                <TextArea
                    placeholder={currentType}
                    rows={6}
                    value={outputStr}
                />
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
