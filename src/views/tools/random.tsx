import { copyText } from "@/libs/common"
import { CopyOutlined, BulbOutlined } from "@ant-design/icons"
import { Button, Checkbox, InputNumber, Radio, RadioChangeEvent, Slider } from "antd"
import type { GetProp } from 'antd';
import { useEffect, useState } from "react"
import "./random.less";

const L1 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const L2 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const L3 = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const L4 = ["!", "#", "$", "%", "&", "?", "@", "=", "^", "-", "*", "+"]
const L5 = [" ", "\"", "'", "(", ")", ",", "_", ".", "/", ":", ";", "<", ">", "[", "\\", "]", "`", "{", "|", "}", "~"]



const RandomPage = () => {

    const [uuidArr, setUuidArr] = useState<string[]>([])
    const genUuid = (length: number = 1) => {
        const arr = Array.from({ length }, _ => self.crypto.randomUUID())
        setUuidArr(arr)
    }

    const [charList, setCharList] = useState<string[]>([])
    const [pwd, setPwd] = useState<string[]>([])
    const [pwdlen, setPwdlen] = useState(6)




    useEffect(() => {
        genUuid(5)
        genUserName()
        onSecurityChangeFn({ target: { value: 'letter' } } as RadioChangeEvent)
    }, [])

    const charToColor = (char: string) => {
        if (L1.includes(char)) {
            return '#444'
        } else if (L2.includes(char)) {
            return 'green'
        } else if (L3.includes(char)) {
            return 'teal'
        } else if (L4.includes(char)) {
            return '#ff7800'
        } else if (L5.includes(char)) {
            return 'purple'
        }
    }
    const genPwd = (len: number = pwdlen, list: string[] = charList) => {
        var array = new Uint32Array(len);
        window.crypto.getRandomValues(array);
        const r = [...array].map(x => list[x % list.length])
        setPwd(r)
    }

    const onSecurityChangeFn = ({ target: { value } }: RadioChangeEvent) => {
        console.log('value', value);
        setSecurityVal(value)
        const item = securityList.filter(x => x.name === value)[0];
        if (item) {
            setPwdlen(item.len)
            setCharList(item.list)
            genPwd(item.len, item.list)
        }
    }
    const onPwdlenChange = (val: number | null) => {
        console.log('len', val);
        if (val) {
            setPwdlen(val)
            genPwd(val, charList)
        }
    }
    const [securityVal, setSecurityVal] = useState('letter')

    const securityList = [
        {
            name: 'pin',
            zh: '数字',
            len: 6,
            list: L1
        },
        {
            name: 'letter',
            zh: '字母',
            len: 12,
            list: [...L1, ...L2, ...L3]
        },
        {
            name: 'sgin',
            zh: '符号',
            len: 18,
            list: [...L1, ...L2, ...L3, ...L4, ...L1, ...L2, ...L3,]
        },
        {
            name: 'sign2',
            zh: '安全',
            len: 24,
            list: [...L1, ...L2, ...L3, ...L4, ...L5, ...L1, ...L2, ...L3,]
        }
    ]


    const usernameCfgOptions = [
        { label: '字母', value: 'letter', disabled: true },
        { label: '数字', value: 'num' },
        { label: '下划线', value: '_' },
        { label: '连字符', value: '-' },
        { label: '点号', value: '.' },
    ];
    const [nameCharList, setNameCharList] = useState(['letter', 'num', '_'])
    const [nameList, setNameList] = useState<string[]>([])

    const onChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        const val = checkedValues as string[]
        setNameCharList(val as string[])
        genUserName(val)
    };
    const genUserName = (charList = nameCharList) => {
        const letterList = [...L2, ...L3]
        const ruleList: string[][] = []
        charList.forEach((x) => {
            if (x === 'letter') {
                ruleList.push(letterList)
            } else if (x === 'num') {
                ruleList.push(L1)
            } else {
                ruleList.push([x])
            }
        })
        const flatList = ruleList.flat()
        const checkResult = (rule: string[][], result: string[]) => rule.every(x => result.some(y => x.includes(y)))
        const genResult: () => string[] = () => {
            const array = new Uint32Array(15);
            window.crypto.getRandomValues(array);
            const resultList = [...array].map((x, i) => i ? flatList[x % flatList.length] : letterList[x % letterList.length]);
            if (checkResult(ruleList, resultList)) {
                return resultList
            } else {
                return genResult()
            }
        }
        const r = genResult()
        setNameList(r)
    }

    return <div className="common-tabs inner-page">
        <div className="my20">
            <Button type="primary" icon={<BulbOutlined />} onClick={() => genUserName()}>生成用户名</Button>
        </div>

        <div className="sub-title-plain flex start">
            规则：
            <Checkbox.Group options={usernameCfgOptions} defaultValue={nameCharList} onChange={onChange} />
        </div>
        <div className="code pwd-block inline-flex center start">
            {nameList.map((x, i) => <span key={i} style={{ color: charToColor(x) }}>{x}</span>)}
            <Button type="primary" ghost icon={<CopyOutlined />} className="ml15" onClick={() => copyText(nameList.join(''), '复制成功！')}></Button>
        </div>


        <div className="my20">
            <Button type="primary" icon={<BulbOutlined />} onClick={() => genPwd()}>生成密码</Button>
        </div>
        <div className="sub-title-plain flex start">
            长度：
            <Slider
                min={6}
                max={100}
                style={{ width: 220 }}
                onChange={onPwdlenChange}
                value={typeof pwdlen === 'number' ? pwdlen : 6}
            />
            <InputNumber
                min={6}
                max={100}
                style={{ margin: '0 16px' }}
                value={pwdlen}
                onChange={onPwdlenChange}
            />
        </div>
        <div className="sub-title-plain">
            安全性：
            <Radio.Group onChange={onSecurityChangeFn} buttonStyle="solid" value={securityVal}>
                {securityList.map((x, i) => (
                    <Radio.Button className="my5" value={x.name} key={i}>{x.zh}</Radio.Button>
                ))}
            </Radio.Group>
        </div>
        <div className="code pwd-block inline-flex center start">
            {pwd.map((x, i) => <span key={i} style={{ color: charToColor(x) }}>{x}</span>)}
            <Button type="primary" ghost icon={<CopyOutlined />} className="ml15" onClick={() => copyText(pwd.join(''), '复制成功！')}></Button>
        </div>


        <div className="my20">
            <Button type="primary" icon={<BulbOutlined />} onClick={() => genUuid(5)}>生成 UUID</Button>
        </div>
        <div>{
            uuidArr.map((x, i) => (
                <div title={x} key={i}>
                    <div className="code uuid-block inline-flex center start">
                        {x.split('').map((y, j) => <span key={j} style={{ color: charToColor(y) }}>{y}</span>)}
                        <Button type="primary" ghost icon={<CopyOutlined />} className="ml15" onClick={() => copyText(x, '复制成功！')}></Button>
                    </div>
                </div>

            ))
        }</div>
    </div>
}

export default RandomPage