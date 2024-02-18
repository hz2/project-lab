import { useEffect } from 'react'
// import { Input } from 'antd'
import './gua.less'
import GuaList from './gua.json'
import { NavLink, Route, Routes, useParams } from 'react-router-dom'

const Page = () => {


    // const indexArr = [
    //     {
    //         "gua": "☷ ",
    //         "name": "坤",
    //         "el": "地"
    //     },
    //     {
    //         "gua": "☶ ",
    //         "name": "艮",
    //         "el": "山"
    //     },
    //     {
    //         "gua": "☵ ",
    //         "name": "坎",
    //         "el": "水"
    //     },
    //     {
    //         "gua": "☴ ",
    //         "name": "巽",
    //         "el": "风"
    //     },
    //     {
    //         "gua": "☳ ",
    //         "name": "震",
    //         "el": "雷"
    //     },
    //     {
    //         "gua": "☲ ",
    //         "name": "离",
    //         "el": "火"
    //     },
    //     {
    //         "gua": "☱ ",
    //         "name": "兑",
    //         "el": "泽"
    //     },
    //     {
    //         "gua": "☰",
    //         "name": "乾",
    //         "el": "天"
    //     }
    // ]

    const XiantianRoundList = [...GuaList.sort((x, y) => x.val - y.val).filter((_x, i) => i < 32), ...GuaList.sort((x, y) => y.val - x.val).filter((_x, i) => i < 32)]

    const XiantianSqr = GuaList.sort((x, y) => x.val - y.val).reduce((o, x, i) => { o[Math.floor(i / 8)] = (o[Math.floor(i / 8)] || []).concat(x); return o }, [] as (typeof GuaList)[])



    const getList = () => {
        console.log('vGuaList ',);

    }


    const GuaItem = () => {
        let params = useParams();

        console.log('params',params);
        
        return <div
            style={{
                // // ...styles.fill,
                // // ...styles.rgb,
                // background: `rgb(${params.r}, ${params.g}, ${params.b})`
            }}>
            gua ({params.gua})
        </div>

    }

    useEffect(() => {
        getList()
    }, [])

    return (
        <div className="common-box">
            {/* <Input value={url} onChange={urlChange} /> */}

            <Routes >
                <Route path=":gua" element={<GuaItem />} /> 
            </Routes>
            <div className="round-list">
                {
                    XiantianRoundList.map(((x, i) => <NavLink
                        to={x.gua}
                        className="gua-item" style={{ transform: `translate(-50%, -50%) rotate( ${180 - i * 360 / 64 - 360 / 128}deg )` }} key={i}>
                        <div className="gua-name">{x.name}</div>
                        <div className="gua">{x.gua}</div>
                    </NavLink>))
                }
            </div>
            <div className="square-list">
                {
                    XiantianSqr.map((x, i) => <div className="flex start gua-line" key={i}>
                        {
                            x.map((y, j) => <NavLink
                                to={y.gua}
                                className="gua-item flex" key={j}>
                                <div className="gua-name">{y.name}</div>
                                <div className="gua">{y.gua}</div>
                            </NavLink>)
                        }
                    </div>)
                }
            </div>
        </div>
    )
}

export default Page
