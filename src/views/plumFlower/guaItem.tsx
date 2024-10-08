import { forwardRef, RefObject } from 'react'
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

    const root = document.documentElement;
    root.style.setProperty('--gua-full-bg', `hwb( ${360 / 64 * ((item?.binval || 0) + 18)} 85% 5% / 100% )`);

    return <div className="gua-item-full  " ref={ref as RefObject<HTMLDivElement>}>
        <div className="flex start">
            <Link to='/gua/'>六十四卦</Link>
            <span className='mx15'>&gt;</span>
            <div className="cixu">{item?.cixuZh}</div>
        </div>
        <div className="graph-box">
            <div className="gua-graph">
                {
                    item?.binString.split('').map((x: string, i: number) =>
                        x === '0' ?
                            <div className='yin' key={i} onClick={() => gotoTargetGua(i)}></div>
                            :
                            <div className='yang' key={i} onClick={() => gotoTargetGua(i)}></div>
                    )
                }
            </div>
            <div className="comp">{item?.f3?.split(/(?=.{2}$)/g).map(x => <div className="el" key={x}>{x}</div>)}</div>
            <div className="element">
                {
                    item?.el?.includes('为') ?
                        <>
                            <div className="el dark" >{item?.name}</div>
                            <div className="el" >{item?.el.replace(item?.name, '')}</div>
                        </>
                        :
                        <>
                            <div className="el" >{item?.el.replace(item?.name, '')}</div>
                            <div className="el dark" >{item?.name}</div>
                        </>
                }

            </div>
        </div>
        <div className="text-info">
            <div className="en">{item?.en} {item?.enToZh}</div>
            <div className="gua">{item?.gua}</div>
            <div className="name">{item?.name}</div>
            <div className="yi m20">
                <div className="fz24">易经</div>
                {
                    item?.yi.map((x, i) => Array.isArray(x) ? <div key={i} className='m20'> {
                        x.map((y, j) => <div key={j} className='m20'> {y}</div>)
                    }</div> : <div key={i} className='m20'> {x}</div>)
                }
            </div>
            <div className="tuan m20">
                <div className="fz24">彖曰</div>
                {
                    item?.tuan.map((x, i) => Array.isArray(x) ? <div className='m20' key={i}>{
                        x.map((y, j) => <div key={j} className='m20'> {y}</div>)
                    }</div> : <div key={i} className='m20'> {x}</div>)
                }
            </div>
            <div className="xiang m20">
                <div className="fz24">象</div>
                {
                    item?.xiang.map((x, i) => Array.isArray(x) ? <div key={i} className='m20'> {
                        x.map((y, j) => <div key={j} className='m20'> {y}</div>)
                    }</div> : <div key={i} className='m20'> {x}</div>)
                }
            </div>
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