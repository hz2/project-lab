import { copyText } from "@/libs/common"
import { CopyTwoTone } from "@ant-design/icons"
import { Button, InputNumber, Radio, RadioChangeEvent, Slider } from "antd"
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
        onSecurityChangeFn({ target: { value: 'letter' } } as RadioChangeEvent)
    }, [])

    const charToColor = (char: string) => {
        if (L1.includes(char)) {
            return 'blue'
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
    const genPwd = (len: number, charList: string[]) => {
        var array = new Uint32Array(len);
        window.crypto.getRandomValues(array);
        const r = [...array].map(x => charList[x % charList.length])
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




    return <div className="common-tabs inner-page  ">
        <h2>随机用户名</h2>
        _-
        +
        .

        <h2>密码</h2>

        <div className="sub-title-plain">
            长度：
            <Slider
                min={6}
                max={100}
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
        <div className="buttons">
            <div className="pwd-block">{pwd.map(x => <span style={{ color: charToColor(x) }}>{x}</span>)}</div>
        </div>
        <h2>uuid</h2>

        <div className="buttons">
            <Button type="primary" onClick={() => genUuid()}>
                uuid
            </Button>
            <Button type="primary" onClick={() => genUuid(5)}>
                uuid x 5
            </Button>
        </div>
        <div className="ballList">{
            uuidArr.map((x, i) => (
                <div className="colorItem" title={x} key={i}>
                    <div className="text">{x}</div>
                    <div
                        className="colorItem flex center bgcf c5"
                        onClick={() => copyText(x, '复制成功！')}>
                        <CopyTwoTone />
                    </div>
                </div>

            ))
        }</div>
    </div>
}

export default RandomPage