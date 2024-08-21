import { useEffect, useState } from 'react'
import { Input, Radio, RadioChangeEvent } from 'antd'
import './style.less'
const { TextArea } = Input



const TablePage = () => {
    const [outputStr, setOutputStr] = useState('')
    const [currentType] = useState('请输入')
    const outputTypeList = [
        {
            name: 'raw',
            zh: '对象',
        },
        {
            name: 'kw',
            zh: '键值对',
        },
        {
            name: 'class',
            zh: '类',
        },
        {
            name: 'text',
            zh: '文本',
        },
        {
            name: 'json',
            zh: 'JSON',
        }
    ]
    const [outputType, setOutputType] = useState('class')
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
            case 'class':
                setOutputStr(obj3Str);
                break;
            case 'text':
                setOutputStr(obj4Str);
                break;
            case 'json':
                setOutputStr(obj5Str);
                break;
            default:
                break;
        }
    }



    const [obj1Str, setObj1Str] = useState('')
    const [obj2Str, setObj2Str] = useState('')
    const [obj3Str, setObj3Str] = useState('')
    const [obj4Str, setObj4Str] = useState('')
    const [obj5Str, setObj5Str] = useState('')


    const [html, setHtml] = useState('')
    const currentHtml = async (type: string, blob: Blob) => {
        console.log('type', type);

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

                const list = [...trList].map(x => [...x.querySelectorAll('td')].map(y => (y.innerHTML = y.innerHTML?.replace(/<br>/gi,'\n')) && y.innerText)).filter(x => x?.length)

                console.log('list', thList, list);


                const obj1 = list.map((x: string[]) => x.reduce((o, y, i) => {
                    o[thList[i]] = y
                    return o
                }, {} as { [key: string]: string }))
                setObj1Str(JSON.stringify(obj1, undefined, 4))

                let obj2 = `{\n`
                let obj3 = `{\n`
                list.forEach((x: string[]) => {
                    const [key, type, , defaultVal, remark] = x;
                    const defaulVal = defaultVal || ({ number: '', string: '', null: '', 'object\u00a0[]': [] }[type]) || ''
                    obj2 += `    ${key}: ${JSON.stringify(defaulVal)},\t\t// ${remark}\n`
                    obj3 += `    ${key} = ${JSON.stringify(defaulVal)};\t\t// ${remark}\n`
                })
                obj2 += '}'
                setObj2Str(obj2)

                obj3 += '}'
                setObj3Str(obj3)
                setOutputStr(obj3)


                const textList = list.map(x => x.join('\t\t\t\t\t')).join('\n')
                setObj4Str(textList)



                const genJSON = (list: string[][]) => {
                    const [k, ...v] = list;
                    return v.map(x => x.reduce((p, c, i) => Object.assign(p, { [k[i]]: c }), {}))
                }
                setObj5Str(JSON.stringify(genJSON(list), null, 4))

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
        <div className="common-tabs inner-page table-exchage">
            <h2>表格转换</h2>
            <div className="sub-title">
                粘贴复制的表格
            </div>
            <div style={{ outline: '1px solid #ffc6c6' }} dangerouslySetInnerHTML={{ __html: html }}></div>
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

    )
}

export default TablePage
