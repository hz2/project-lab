import { useCallback, useEffect, useRef, useState } from 'react'
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


const TablePage = () => {
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
    const [currentType, setCurrentType] = useState('请输入')
    const textTransformChange = (value = outputRaw, type = currentType) => {
        const fn = typeList.find(x => x.name === type)?.fn || ((str: string[]) => str.join(''))
        return value.split('\n').filter(x => x).map(x => fn(x.split(/[ \-_\']/g).filter(x => x))).join('\n')
    }
    const outputTypeList = [
        {
            name: 'raw',
            zh: '对象',
        },
        {
            name: 'kw',
            zh: '键值对',
        }
    ]
    const [outputType, setOutputType] = useState('kw')
    const outputChangeFn = ({ target: { value: type } }: RadioChangeEvent) => {
        setOutputType(type)
        outputFormat(type)
    }
    const outputFormat = (type = outputType) => {
        switch (type) {
            case 'raw':
                setOutputStr(obj1Str);
                break;
            case 'kw':
                setOutputStr(obj2Str);
                break;
            default:
                break;
        }
    }

    const [shouldTranslate, setShouldTranslate] = useState(false)
    const translateSwitch = (checked: boolean) => {
        setShouldTranslate(checked)
    }

    const [loading, setLoading] = useState(false)


    const [obj1Str, setObj1Str] = useState('')
    const [obj2Str, setObj2Str] = useState('')


    const [html, setHtml] = useState('')
    const currentHtml = async (type: string, blob: Blob) => {
        if (type === 'text/html') {
            const textStr = await blob.text()

            setHtml(textStr)
            const parser = new DOMParser()
            const doc = parser.parseFromString(textStr, 'text/html')

            if (doc) {
                const table = doc.querySelector('table')
                const trList = table?.querySelectorAll('tr') || []
                console.log('tr', trList);

                const thList = [...table?.querySelectorAll('th') || []].map(y => y.innerText)

                const list = [...trList].map(x => [...x.querySelectorAll('td')].map(y => y.innerText)).filter(x => x?.length)

                console.log('list', thList, list);


                const obj1 = list.map((x: string[]) => x.reduce((o, y, i) => {
                    o[thList[i]] = y
                    return o
                }, {} as { [key: string]: string }))
                setObj1Str(JSON.stringify(obj1, undefined, 4))

                let obj2 = `{\n`
                list.forEach((x: string[]) => {
                    const [key, type,, defaultVal, remark] = x;
                    const defaulVal = defaultVal || ({ number: '', string: '' }[type])
                    obj2 += `    "${key}": "${defaulVal}",      // ${remark}\n`
                })
                obj2 += '}'
                setObj2Str(obj2)
                setOutputStr(obj2)


            }



        }
    }

    // 
    const getContentFromClipboard = async () => {
        const pasteEvent = async () => {
            const clipboardItems = await navigator.clipboard.read();
            for (const clipboardItem of clipboardItems) {
                for (const type of clipboardItem.types) {
                    const blob = await clipboardItem.getType(type);
                    currentHtml(type, blob)
                }
            }

        }
        // try {
        //     await pasteEvent()
        // } catch (err) {
        //     document.addEventListener('paste', async (e) => {
        //         e.preventDefault();
        await pasteEvent()
        //     });
        // }

    }


    useEffect(() => {
        window.addEventListener('paste', getContentFromClipboard);
        return () => window.removeEventListener('paste', getContentFromClipboard);
    }, []);


    useEffect(() => {

    }, [])
    return (
        <Spin spinning={loading} size="large">
            <div className="common-tabs inner-page table-exchage">
                <h2>表格转换</h2>
                <div className="sub-title">
                    粘贴复制的表格
                </div>
                <div style={{outline:'1px solid #ffc6c6'}} dangerouslySetInnerHTML={{ __html: html }}></div>
                <TextArea
                    placeholder={currentType}
                    rows={6}
                    value={outputStr}
                    spellCheck="false"
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

export default TablePage
