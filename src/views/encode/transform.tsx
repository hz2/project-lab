import { Tabs, TabsProps } from 'antd'

import Qs from './qs'
import Notation from './notation'

const items: TabsProps['items'] = [
    {
        key: '1',
        label: '查询字符串 Query String',
        children: <Qs />
    },
    {
        key: '2',
        label: '命名法',
        children: <Notation />
    },
]


const TransformText = () => {
    return (
        <div className="common-box">
            <Tabs defaultActiveKey="1" items={items}></Tabs>
        </div>
    )
}

export default TransformText
