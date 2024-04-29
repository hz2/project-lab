export default [
    {
        path: "person",
        zh: '用户查询',
        showInHome: true,
        comp: "idcard/idcard"
    },
    {
        path: "bing",
        zh: '必应壁纸',
        showInHome: true,
        comp: "bing/index"
    },
    {
        path: "nasa",
        zh: 'NASA壁纸',
        showInHome: true,
        comp: "bing/nasa"
    },
    {
        path: "color",
        zh: '颜色转换',
        showInHome: true,
        comp: "color/index"
    },
    {
        path: "gradient",
        zh: '渐变',
        showInHome: false,
        comp: "color/gradient"
    },
    {
        path: "lottery",
        zh: '彩票号码',
        showInHome: true,
        comp: "lottery/lottery"
    },
    {
        path: "gua/*",
        zh: '六十四卦',
        showInHome: true,
        comp: "plumFlower/gua"
    },
    {
        path: "plumFlower",
        zh: '梅花易数',
        showInHome: true,
        comp: "plumFlower/plumFlower"
    },
    {
        path: "transform",
        zh: '转写',
        showInHome: false,
        comp: "encode/transform"
    },
    {
        path: "qs",
        zh: '查询字符串',
        showInHome: true,
        comp: "encode/qs"
    },
    {
        path: "notation",
        zh: '命名法转换',
        showInHome: true,
        comp: "encode/notation"
    },
    {
        path: "table",
        zh: '表格转换',
        showInHome: true,
        comp: "encode/table"
    },
    {
        path: "hex",
        zh: '进制转换',
        showInHome: true,
        comp: "encode/hexConversion"
    },
    {
        path: "encode",
        zh: '编码转换',
        showInHome: true,
        comp: "encode/encodeDecode"
    },
    {
        path: "dataURL",
        zh: '网址编码',
        showInHome: true,
        comp: "encode/dataURL"
    },
    {
        path: "qrcode",
        zh: '二维码',
        showInHome: true,
        comp: "encode/qr"
    },
    {
        path: "emoji",
        zh: '符号',
        showInHome: false,
        comp: "emoji/index"
    },
    {
        path: "post",
        comp: "onlineService/post"
    },
    {
        path: "ipAddress",
        zh: '位置查询',
        showInHome: true,
        comp: "onlineService/ip"
    },
    {
        path: "ip",
        comp: "onlineService/ip"
    },
    {
        path: "currency",
        showInHome: true,
        zh: '货币换算',
        comp: "onlineService/currencyExchange"
    },
    {
        path: "web",
        comp: "onlineService/web"
    },
    {
        path: "svgSymbol",
        zh: '矢量符号',
        showInHome: true,
        comp: "svgTool/svgSymbol"
    },
    {
        path: "svgo",
        zh: '矢量图优化',
        showInHome: true,
        comp: "svgTool/svgO"
    },
    {
        path: "svgbg",
        zh: '矢量图背景',
        showInHome: true,
        comp: "svgTool/svg2bg"
    },
    {
        path: "toy",
        comp: "toy/toy"
    },
    {
        path: "docker",
        comp: "toy/docker"
    },
    {
        path: "mirrors",
        zh: '公共镜像',
        showInHome: true,
        comp: "toy/mirrors"
    },
    {
        path: "chat",
        comp: "toy/chat"
    },
    {
        path: "bookmark",
        comp: "bookmarkTool/bookmark"
    },
    {
        path: "random",
        zh: '随机数据',
        showInHome: true,
        comp: "tools/random"
    }
]