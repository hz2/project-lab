import { useEffect, useState } from 'react'
import GuaList from './guaFull.json'

const GuaItem = (Prop: {
    gua?: string
}) => {


    console.log('params', Prop);

    const [item, setItem] = useState<typeof GuaList[0]>()
    useEffect(() => {
        const item = GuaList.filter(x => x.gua === Prop.gua)[0]
        item && setItem(item)
    }, [])

    return <div className="common-box"
        style={{
            // // ...styles.fill,
            // // ...styles.rgb,
            background: `hwb( ${360 / 64 * ( (item?.binval || 0 )+ 18)} 85% 5% / 100% )`
        }}>
        gua ()

        {JSON.stringify(item)}
    </div>
}
export default GuaItem