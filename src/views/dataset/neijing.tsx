import { Button, Table, TableProps } from "antd";
import "./neijing.less";




// const list = [
//     {
//         name: '五行',
//         list: ['水', '火', '木', '金', '土'],
//         from: '',
//         link: '',
//     },
//     {
//         name: '所行之理',
//         list: ['润下', '炎上', '曲直', '从革', '稼穑'],
//         from: '',
//         link: '',
//     },
//     {
//         name: '五藏',
//         list: ['肾', '心', '肝', '肺', '脾'],
//         from: '《黄帝内经》',
//         link: '',
//     },
//     {
//         name: '五藏所恶',
//         list: ['肾', '恶热', '肝', '恶寒', '脾'],
//         from: '',
//         link: '',
//     },



//     {
//         name: '五藏气',
//         list: ['肾', '主噫', '肝', '主欬', '脾'],
//         from: '',
//         link: 'https://zh.wikisource.org/wiki/%E9%BB%83%E5%B8%9D%E5%85%A7%E7%B6%93/%E9%9D%88%E6%A8%9E%E7%AC%AC%E5%8D%81%E4%BA%8C%E5%8D%B7',
//     },
//     {
//         name: '五藏所恶',
//         list: ['肾', '恶热', '肝', '恶寒', '脾'],
//         from: '',
//         link: '',
//     },
//     {
//         name: '五藏所恶',
//         list: ['肾', '恶热', '肝', '恶寒', '脾'],
//         from: '',
//         link: '',
//     },
// ]

const dataSource: IRow[] = [
    // {
    //     key: '1',
    //     name: '五行',
    //     s: '水',
    //     h: '火',
    //     m: '木',
    //     j: '金',
    //     t: '土',
    // },
    {
        key: '2',
        name: '五藏气',
        link: 'https://zh.wikisource.org/wiki/%E9%BB%83%E5%B8%9D%E5%85%A7%E7%B6%93/%E9%9D%88%E6%A8%9E%E7%AC%AC%E5%8D%81%E4%BA%8C%E5%8D%B7',
        x: '噫',
        f: '欬',
        g: '语',
        p: '吞',
        s: '欠',
        d: '怒',
        w: '气逆哕',
        dxc: '泄',
        pg: '遗溺',
        xj: '水',
    },
    {
        key: '3',
        name: '五味',
        x: '苦',
        f: '辛',
        g: '酸',
        p: '甘',
        s: '咸',

        w: '淡',
    },
    {
        key: '4',
        name: '五并',
        x: '喜',
        f: '悲',
        g: '忧',
        p: '畏',
        s: '恐',
    },
    {
        key: '5',
        name: '五恶',
        x: '热',
        f: '寒',
        g: '风',
        p: '湿',
        s: '燥',
    },
    {
        key: '6',
        name: '五液',
        x: '汗',
        f: '涕',
        g: '泣（泪）',
        p: '涎',
        s: '唾',
    },
    {
        key: '7',
        name: '五主',
        x: '脉',
        f: '皮',
        g: '筋',
        p: '肉（肌）',
        s: '骨',
    },



    {
        "key": "010",
        "name": "五方",
        "x": "南",
        "g": "东",
        "p": "中",
        "f": "西",
        "s": "北",
        "link": "https://zh.wikisource.org/wiki/%E9%BB%83%E5%B8%9D%E5%85%A7%E7%B6%93/%E7%B4%A0%E5%95%8F%E7%AC%AC%E4%B8%80%E5%8D%B7"
    },
    {
        "key": "011",
        "name": "五色",
        "x": "赤",
        "g": "青",
        "p": "黄",
        "f": "白",
        "s": "黑"
    },
    {
        "key": "210",
        "name": "五窍",
        "x": "耳",
        "g": "目",
        "p": "口",
        "f": "鼻",
        "s": "二阴"
    },
    // {
    //     "key": "410",
    //     "name": "---",
    //     "x": "故病在五藏",
    //     "g": "其病发惊骇",
    //     "p": "故病在舌本",
    //     "f": "故病在背",
    //     "s": "故病在谿"
    // },
    {
        "key": "510",
        "name": "五味",
        "x": "苦",
        "g": "酸",
        "p": "甘",
        "f": "辛",
        "s": "咸"
    },
    {
        "key": "610",
        "name": "五行",
        "x": "火",
        "g": "木",
        "p": "土",
        "f": "金",
        "s": "水"
    },
    {
        "key": "710",
        "name": "五畜",
        "x": "羊",
        "g": "鸡",
        "p": "牛",
        "f": "马",
        "s": "彘"
    },
    {
        "key": "810",
        "name": "五谷",
        "x": "黍",
        "g": "麦",
        "p": "稷",
        "f": "稻",
        "s": "豆"
    },
    {
        "key": "1010",
        "name": "五星",
        "x": "荧惑",
        "g": "岁星",
        "p": "镇星",
        "f": "太白",
        "s": "辰星"
    },
    {
        "key": "1110",
        "name": "五病位",
        "x": "脉",
        "g": "筋",
        "p": "肉",
        "f": "皮毛",
        "s": "骨"
    },
    {
        "key": "1210",
        "name": "五音",
        "x": "徵",
        "g": "角",
        "p": "宫",
        "f": "商",
        "s": "羽"
    },
    {
        "key": "1310",
        "name": "五数",
        "x": "七",
        "g": "八",
        "p": "五",
        "f": "九",
        "s": "六"
    },
    {
        "key": "1410",
        "name": "五臭",
        "x": "焦",
        "g": "臊",
        "p": "香",
        "f": "腥",
        "s": "腐"
    }
    // ,
    // {
    //     key: '99',
    //     name: '五xxx',
    //     x: '心',
    //     f: '肺',
    //     g: '肝',
    //     p: '脾',
    //     s: '肾',
    // },
];


type IRow = {
    [key: string]: string
}


const columns: TableProps<IRow>['columns'] = [
    {
        title: '分类',
        dataIndex: 'name',
        key: 'name',
        render: (_x, y) => y.link ?
            <a href={y.link} target="_blank">
                <Button type="link">{y.name}</Button>
            </a>
            : <Button type="text">{y.name}</Button>
    },
    {
        title: '心',
        dataIndex: 'x',
        key: 'x',
    },
    {
        title: '肝',
        dataIndex: 'g',
        key: 'g',
    },
    {
        title: '脾',
        dataIndex: 'p',
        key: 'p',
    },
    {
        title: '肺',
        dataIndex: 'f',
        key: 'f',
    },
    {
        title: '肾',
        dataIndex: 's',
        key: 's',
    },
    {
        title: '胆',
        dataIndex: 'd',
        key: 'd',
    },
    {
        title: '胃',
        dataIndex: 'w',
        key: 'w',
    },
    {
        title: '大肠小肠',
        dataIndex: 'dxc',
        key: 'dxc',
    },
    {
        title: '膀胱不约',
        dataIndex: 'pg',
        key: 'pg',
    },
    {
        title: '下焦溢',
        dataIndex: 'xj',
        key: 'xj',
    },
];


export default () => <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 100 }} />;

