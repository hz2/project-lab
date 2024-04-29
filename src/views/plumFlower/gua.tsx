import { useRef, CSSProperties } from 'react'
// import { Input } from 'antd'
import './gua.less'
import GuaList from './gua.json'
import GuaFullList from './guaFull.json'
import {
    NavLink, Route, Routes, useLocation, useParams,
} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import GuaItem from './guaItem'

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

    const XiantianRoundList = [
        ...GuaList.sort((x, y) => x.val - y.val).filter((_x, i) => i < 32),
        ...GuaList.sort((x, y) => y.val - x.val).filter((_x, i) => i < 32)]

    const XiantianSqr = GuaList.sort((x, y) => x.val - y.val).reduce((o, x, i) => { o[Math.floor(i / 8)] = (o[Math.floor(i / 8)] || []).concat(x); return o }, [] as (typeof GuaList)[])



    // const getList = () => {
    //     console.log('vGuaList ',);
    // }

    const { pathname } = useLocation()
    const location = useLocation()
    const nodeRef = useRef(null);


    const GuaItemEl = () => {
        let params = useParams();
        const item = GuaFullList.filter(x => x.gua === params.gua)[0]
        return <GuaItem item={item} ref={nodeRef} />

    }

    // useEffect(() => {
    //     getList()
    // }, [])

    return ['/gua/', '/gua'].includes(pathname) ?
        <div className="common-box">
            <div className="round-list">
                {
                    XiantianRoundList.map(((x, i) => <NavLink
                        to={x.gua}
                        className="gua-item" style={{
                            '--gua-rotate': 180 - i * 360 / 64 - 360 / 128 + 'deg',
                            '--gua-binval': 360 / 64 * (x.binval + 18)
                        } as CSSProperties} key={i}>
                        <div className="gua-name">{x.name}</div>
                        <div className="gua"  >{x.gua}</div>
                    </NavLink>))
                }
            </div>
            <div className="square-list">
                {
                    XiantianSqr.map((x, i) => <div className="flex start gua-line" key={i}>
                        {
                            x.map((y, j) => <NavLink
                                to={y.gua}
                                style={{
                                    '--gua-binval': 360 / 64 * (y.binval + 18)
                                } as CSSProperties}
                                className="gua-item flex" key={j}>
                                <div className="gua-name">{y.name}</div>
                                <div className="gua">{y.gua}</div>
                            </NavLink>)
                        }
                    </div>)
                }
            </div>
        </div>
        :
        <TransitionGroup className="common-box" style={{ background: 'var(--gua-full-bg)' }}>
            <CSSTransition
                key={location.pathname}
                timeout={100}
                classNames="page-ani"
                unmountOnExit
                nodeRef={nodeRef}
            >
                <Routes >
                    <Route path=":gua" element={<GuaItemEl />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
}

export default Page
