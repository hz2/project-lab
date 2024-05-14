import { useEffect, useState } from 'react'
import { Radio, Form, Button } from 'antd'
import HeluoComp, { TTabVal } from './heluo'
import Wuxing, { WuXingType } from './wixing'
import { downloadBlob } from '@libs/common'
import { gua as GuaTable } from './guaTable.json'

const w = 1000
const half = w / 2
const subtense = Math.tan((22.5 * Math.PI) / 180) * half
const p1 = half - subtense
const p2 = half + subtense

const listOrig = [
  {
    id: 'ss',
    zh: '南',
    d: ['M', half, half, p1, 0, p2, 0, 'z']
  },
  {
    id: 'sw',
    zh: '西南',
    d: ['M', half, half, p2, 0, w, p1, 'z']
  },
  {
    id: 'ww',
    zh: '西',
    d: ['M', half, half, w, p1, w, p2, 'z']
  },
  {
    id: 'nw',
    zh: '西北',
    d: ['M', half, half, w, p2, p2, w, 'z']
  },

  {
    id: 'nn',
    zh: '北',
    d: ['M', half, half, p2, w, p1, w, 'z']
  },
  {
    id: 'ne',
    zh: '东北',
    d: ['M', half, half, p1, w, 0, p2, 'z']
  },
  {
    id: 'ee',
    zh: '东',
    d: ['M', half, half, 0, p2, 0, p1, 'z']
  },
  {
    id: 'se',
    zh: '东南',
    d: ['M', half, half, 0, p1, p1, 0, 'z']
  }
]

type TGuaType = 'xiantian' | 'houtian' | 'lianshan' | 'guishu' | 'longtu'

type IGuaType = {
  [key in TGuaType]: yaoType[]
}

type yaoType = 'qian' | 'xun' | 'kan' | 'gen' | 'kun' | 'zhen' | 'li' | 'dui'

const guaType: IGuaType = {
  // 伏羲先天
  xiantian: ['qian', 'xun', 'kan', 'gen', 'kun', 'zhen', 'li', 'dui'],
  // 文王后天
  houtian: ['li', 'kun', 'dui', 'qian', 'kan', 'gen', 'zhen', 'xun'],
  lianshan: ['gen', 'li', 'zhen', 'qian', 'dui', 'kan', 'xun', 'kun'],
  guishu: ['kun', 'zhen', 'li', 'dui', 'qian', 'xun', 'kan', 'gen'],
  longtu: ['zhen', 'qian', 'dui', 'kan', 'xun', 'kun', 'gen', 'li']
}
const getGua = (v: string, _order: string) => {
  const getListByOrder = (key: string) => GuaTable.filter(x => x.key === key)[0]
  const obj = {
    text: getListByOrder('text'),
    color: getListByOrder('color'),
    [v]: getListByOrder(v)
  }
  return obj
}

//   gql(`query {
//   text: gua1(key: "text") {
//     ...guaKit
//   }
//   color: gua1(key: "color") {
//     ...guaKit
//   }
//   ${v}: gua1(key: "${v}") {
//     ...guaKit
//   }
// }
// fragment guaKit on Gua {${order}}
// `)
const Yi = () => {
  const genDom = async (type: TGuaType = 'houtian', textkey = 'trigrams') => {
    if (['wuxing', 'wuxing0', 'wuxing1', 'wuxing2'].includes(type)) {
      const typeVal = type as WuXingType
      const w = 2000
      const half = w / 2
      const r2 = Math.sqrt(Math.pow((1 / 8) * w, 2) / 2)
      const dom = <Wuxing half={half} r={r2} type={typeVal} />
      setGuaList(dom)
      return
    }



    const guaArr = guaType[type]
    const order = guaArr.join(' ')
    const { text, color, [textkey]: v } = getGua(textkey, order);
    const gua = listOrig
      .map((x, i) => Object.assign(x, {
        text: text[guaArr[i]],
        color: color[guaArr[i]],
        vText: v[guaArr[i]],
      }))
    const result: JSX.Element[] = gua.map((x, i) => (
      <g key={i}>
        <path
          id={x.id}
          d={x.d.join(' ')}
          fill={x.color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          fontSize={w / 15}
          x={half}
          y={half * 0.15}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${i * 45},${half},${half})`}>
          <tspan fill="#fff">{x.text}</tspan>
        </text>
        <text
          fontSize={w / 17}
          x={half}
          y={half * 0.35}
          textAnchor="middle"
          dominantBaseline="middle"
          transform={`rotate(${i * 45},${half},${half})`}>
          <tspan fill="#fff">{x.vText}</tspan>
        </text>
      </g>
    ))
    setGuaList(result)
  }

  const [guaList, setGuaList] = useState<JSX.Element[] | JSX.Element>([])
  // const [luoshuVal, setLuoshuVal] = useState(null)
  const [guaTypeVal, setGuaTypeVal] = useState<TGuaType>('houtian')
  const [guaTextVal, setGuaTextVal] = useState('trigrams')

  useEffect(() => {
    genDom()
  }, [])

  const ActionBar1 = () => {
    const list = Object.entries({
      xiantian: '伏羲先天',
      houtian: '文王后天',
      lianshan: '连山',
      guishu: '坤乾龟书',
      longtu: '震巽龙图',
      wuxing: '五行',
      wuxing0: '生克',
      wuxing1: '五行生',
      wuxing2: '五行克'
    })
    return (
      <Radio.Group
        value={guaTypeVal}
        buttonStyle="solid"
        onChange={({ target: { value } }) => guaTypeFn(value)}>
        {list.map(x => (
          <Radio.Button key={x[0]} value={x[0]}>
            {x[1]}
          </Radio.Button>
        ))}
      </Radio.Group>
    )
  }

  const guaTypeFn = async (val: TGuaType) => {
    setGuaTypeVal(val)
    genDom(val, guaTextVal)
  }
  const ActionBar2 = () => {
    const list = Object.entries({
      trigrams: '卦',
      t2: '自然',
      t13: '节气',
      t14: '四季',
      zh: '方道',
      t8: '五行',
      t15: '五音',
      t16: '五味',
      t17: '五色',
      // t12: '脏腑',
      t11: '天干',
      t9: '地支',
      t10: '生肖',
      // t7: '器官',
      t4: '性情（说卦七）',
      t5: '动物（说卦八）',
      t6: '身体（说卦九）',
      t3: '家人（说卦十）',
    })
    return (
      <Radio.Group
        value={guaTextVal}
        buttonStyle="solid"
        onChange={({ target: { value } }) => guaTextFn(value)}>
        {list.map(x => (
          <Radio.Button key={x[0]} value={x[0]}>
            {x[1]}
          </Radio.Button>
        ))}
      </Radio.Group>
    )
  }
  const guaTextFn = async (val: string) => {
    setGuaTextVal(val)
    genDom(guaTypeVal, val)
  }

  const [heluoTab, setheluoTab] = useState<TTabVal>('fish') // fish

  const ActionBar3 = () => {
    const list = Object.entries({
      // wuji: "无极",
      fish: '太极',
      // huangji: "皇极",
      hetu: '河图',
      hetup: '河图',
      hetup2: '万氏河图',
      luoshu: '洛书',
      luoshup: '洛书',
      taijiorig: '原始太极',
      taijihetu: '太极河图',
      // wuxing: '五行',
      // wuxing0: '生克',
      // wuxing1: '五行生',
      // wuxing2: '五行克'
    })
    return (
      <Radio.Group
        buttonStyle="solid"
        value={heluoTab}
        onChange={({ target: { value } }) => setheluoTab(value)}>
        {list.map(x => (
          <Radio.Button key={x[0]} value={x[0]}>
            {x[1]}
          </Radio.Button>
        ))}
      </Radio.Group>
    )
  }

  const downloadSvgFile = (type: string) => {
    const dom = document.querySelector('#plumflower')
    if (!dom) return
    const genBlob = (x: Element) => new Blob([x.outerHTML], { type: 'image/svg+xml' })
    if (type === 'svg') {
      dom.removeAttribute('width')
      dom.removeAttribute('height')
      downloadBlob(genBlob(dom), 'plumFlowerYi.svg')
    } else if (type === 'bitmap') {
      dom.setAttribute('width', '1000px')
      dom.setAttribute('height', '1000px')
      const canvasDom = document.getElementById('canvas')
      if (!canvasDom) return
      const canvas = canvasDom as HTMLCanvasElement
      const ctx = canvas.getContext('2d')
      const DOMURL = window.URL || window.webkitURL || window
      const img = new Image()
      const url = DOMURL.createObjectURL(genBlob(dom))
      img.src = url
      img.onload = () => {
        if (!ctx) return
        ctx.drawImage(img, 0, 0)
        canvas.toBlob((blob) => {
          if (!blob) return
          downloadBlob(blob, 'plumFlowerYi.png')
        })
        DOMURL.revokeObjectURL(url)
      }
    }
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 }
  }

  return (
    <div className="pageYi">
      <canvas id="canvas" width="1000" height="1000"></canvas>
      <Form {...layout} name="basic">
        <Form.Item label="卦">
          <ActionBar1 />
        </Form.Item>
        <Form.Item label="象征">
          <ActionBar2 />
        </Form.Item>
        <Form.Item label="河洛">
          <ActionBar3 />
        </Form.Item>
      </Form>
      <div className="yiContainer">


        {
          Array.isArray(guaList) ?
            <svg
              id="plumflower"
              viewBox={[0, 0, w, w].join(' ')}
              xmlns="http://www.w3.org/2000/svg">
              <g transform="scale(.9 .9) translate(50,50)">
                <g id="guagraph">{guaList}</g>
                <HeluoComp w={w} tabVal={heluoTab} />
              </g>
            </svg>
            :
            <svg
              id="wuxing"
              viewBox={[0, 0, w, w].join(' ')}
              xmlns="http://www.w3.org/2000/svg" style={{background:'#ccc'}}
              >
              <g transform="translate(-500,-500)" >
              {guaList}
              </g>
            </svg>
        }




      </div>
      <div className="downloadBtn">
        <Button type="default" onClick={() => downloadSvgFile('svg')}>
          下载矢量图
        </Button>
        <Button type="default" onClick={() => downloadSvgFile('bitmap')}>
          下载位图
        </Button>
      </div>
    </div>
  )
}

export default Yi
