import { useEffect, useState, forwardRef, RefObject } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GuaList from './guaFull.json'

const GuaItem = forwardRef(({ item }: { item: typeof GuaList[0] }, ref) => {
    // const [item, setItem] = useState<typeof GuaList[0]>()

    const navigate = useNavigate();

    // useEffect(() => {
    //     const item = GuaList.filter(x => x.gua === Prop.gua)[0]
    //     item && setItem(item)

    //     console.log('Prop===>', Prop );

    // }, [])

    const gotoTargetGua = (index: number) => {
        const itemArr = item?.binString.split('') || []
        const target = itemArr.map((x, i) => {
            if (i === index) {
                return '1' === x ? '0' : 1
            }
            return x
        }).join('')
        const linkItem = GuaList.filter(x => x.binString === target)[0]
        navigate('/gua/' + linkItem.gua);
    }

    return <div className="common-box gua-item-full  " ref={ref as RefObject<HTMLDivElement>}
        style={{
            background: `hwb( ${360 / 64 * ((item?.binval || 0) + 18)} 85% 5% / 100% )`
        }}>
        <Link to='/gua/'>六十四卦</Link>
        <div className="gua-graph">
            {
                item?.binString.split('').map((x: string, i: number) =>
                    x === '0' ?
                        <div className='yin' key={i} onClick={() => gotoTargetGua(i)}></div>
                        :
                        <div className='yang' key={i} onClick={() => gotoTargetGua(i)}></div>
                )
            }
            <div className="yao"></div>
        </div>
        <div className="text-info">
            <div className="cixu">{item?.cixuZh}</div>
            <div className="el">{item?.el}</div>
            <div className="enName">{item?.enName}</div>
            <div className="enToZh">{item?.enToZh}</div>
            <div className="f3">{item?.f3}</div>
            <div className="gua">{item?.gua}</div>
            <div className="name">{item?.name}</div>
            <div className="xiang m20">
                <div className="fz24">象</div>
                {
                    item?.xiang.map((x, i) => Array.isArray(x) ? <div key={i} className='m20'> {
                        x.map((y, j) => <div key={j} className='m20'> {y}</div>)
                    }</div> : <div key={i} className='m20'> {x}</div>)
                }</div>
            <div className="yi m20">
                <div className="fz24">易传</div>
                {
                    item?.yi.map((x, i) => Array.isArray(x) ? <div key={i} className='m20'> {
                        x.map((y, j) => <div key={j} className='m20'> {y}</div>)
                    }</div> : <div key={i} className='m20'> {x}</div>)
                }</div>
            <div className="tuan m20">
                <div className="fz24">彖曰</div>
                {
                    item?.tuan.map((x, i) => Array.isArray(x) ? <div className='m20' key={i}>{
                        x.map((y, j) => <div key={j} className='m20'> {y}</div>)
                    }</div> : <div key={i} className='m20'> {x}</div>)
                }</div>
            {
                item?.wenyan?.length && <div className="wenyan m20">

                    <div className="fz24">文言曰</div>
                    {
                        item?.wenyan?.map((x, i) => Array.isArray(x) ? <div key={i} className='m20'> {
                            x.map((y, j) => <div key={j} className='m20'> {y}</div>)
                        }</div> : <div key={i} className='m20'> {x}</div>)
                    }
                </div>
            }

        </div>
    </div>
})
export default GuaItem