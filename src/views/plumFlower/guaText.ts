


interface IYao {
  [key: string]: string;
}

interface IGua {
  qian: IYao;
  dui: IYao;
  li: IYao;
  zhen: IYao;
  xun: IYao;
  kan: IYao;
  gen: IYao;
  kun: IYao;
}

const Gua: IGua = {
  qian: {
    trigrams: '☰',
    text: '乾',
    t2: '天',
    t3: '父',
    t4: '健',
    t5: '马',
    t6: '首',
    t7: '脑',
    t8: '金',
    t9: '戌亥',
    t10: '狗',
    t11: '甲壬',
    t12: '大肠',
    t13: '小雪',
    t14: '秋冬',
    t15: '商',
    t16: '辛',
    t17: '玄',
    color: '#cfcfcf'
  },
  dui: {
    trigrams: '☱',
    text: '兑',
    t2: '泽',
    t3: '少女',
    t4: '悦',
    t5: '羊',
    t6: '口',
    t7: '肺',
    t8: '金',
    t9: '酉',
    t10: '猴鸡',
    t11: '丁',
    t12: '肺',
    t13: '寒露',
    t14: '秋',
    t15: '商',
    t16: '辛',
    t17: '白',
    color: '#dbdbdb'
  },
  li: {
    trigrams: '☲',
    text: '离',
    t2: '火',
    t3: '中女',
    t4: '丽',
    t5: '雉',
    t6: '目',
    t7: '胆',
    t8: '火',
    t9: '午',
    t10: '蛇马',
    t11: '己',
    t12: '心',
    t13: '小暑',
    t14: '夏',
    t15: '徵',
    t16: '苦',
    t17: '赤',
    color: '#d90505'
  },
  zhen: {
    trigrams: '☳',
    text: '震',
    t2: '雷',
    t3: '长男',
    t4: '动',
    t5: '龙',
    t6: '足',
    t7: '心',
    t8: '木',
    t9: '卯',
    t10: '虎兔',
    t11: '庚',
    t12: '肝',
    t13: '清明',
    t14: '春',
    t15: '角',
    t16: '酸',
    t17: '青',
    color: '#00f0a1'
  },
  xun: {
    trigrams: '☴',
    text: '巽',
    t2: '风',
    t3: '长女',
    t4: '入',
    t5: '鸡',
    t6: '股',
    t7: '肝',
    t8: '木',
    t9: '辰巳',
    t10: '龙',
    t11: '辛',
    t12: '胆',
    t13: '小满',
    t14: '春夏',
    t15: '角',
    t16: '酸',
    t17: '绿',
    color: '#00b076'
  },
  kan: {
    trigrams: '☵',
    text: '坎',
    t2: '水',
    t3: '中男',
    t4: '陷',
    t5: '豕',
    t6: '耳',
    t7: '肾',
    t8: '水',
    t9: '子',
    t10: '猪鼠',
    t11: '戊',
    t12: '肾',
    t13: '小寒',
    t14: '冬',
    t15: '羽',
    t16: '咸',
    t17: '黑',
    color: '#4b4b4b'
  },
  gen: {
    trigrams: '☶',
    text: '艮',
    t2: '山',
    t3: '少男',
    t4: '止',
    t5: '狗',
    t6: '手',
    t7: '胃',
    t8: '土',
    t9: '丑寅',
    t10: '牛',
    t11: '丙',
    t12: '小肠',
    t13: '雨水',
    t14: '冬春',
    t15: '宫',
    t16: '甘',
    t17: '黄',
    color: '#e3aa00'
  },
  kun: {
    trigrams: '☷',
    text: '坤',
    t2: '地',
    t3: '母',
    t4: '顺',
    t5: '牛',
    t6: '腹',
    t7: '脾',
    t8: '土',
    t9: '未申',
    t10: '羊',
    t11: '乙癸',
    t12: '脾',
    t13: '处暑',
    t14: '夏秋',
    t15: '宫',
    t16: '甘',
    t17: '黄',
    color: '#fdcd3c'
  }
}

export default Gua
