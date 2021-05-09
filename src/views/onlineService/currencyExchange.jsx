import React, { useEffect, useState } from 'react'
import { Input, Select } from 'antd'
import { list as Currency } from './currency'

const obj = {
  success: true,
  timestamp: 1620399243,
  base: 'EUR',
  date: '2021-05-07',
  rates: {
    AED: 4.458019,
    AFN: 94.125269,
    ALL: 123.315221,
    AMD: 633.677676,
    ANG: 2.178336,
    AOA: 793.91738,
    ARS: 113.891532,
    AUD: 1.548711,
    AWG: 2.185325,
    AZN: 2.062159,
    BAM: 1.966152,
    BBD: 2.450264,
    BDT: 102.84072,
    BGN: 1.958962,
    BHD: 0.457631,
    BIF: 2377.701313,
    BMD: 1.213732,
    BND: 1.615682,
    BOB: 8.367329,
    BRL: 6.322693,
    BSD: 1.213571,
    BTC: 2.1228314e-5,
    BTN: 89.141699,
    BWP: 13.190652,
    BYN: 3.074743,
    BYR: 23789.150448,
    BZD: 2.446142,
    CAD: 1.475759,
    CDF: 2431.105484,
    CHF: 1.096018,
    CLF: 0.030492,
    CLP: 841.241562,
    CNY: 7.81352,
    COP: 4565.137971,
    CRC: 748.198084,
    CUC: 1.213732,
    CUP: 32.163902,
    CVE: 111.445266,
    CZK: 25.643852,
    DJF: 216.034192,
    DKK: 7.436169,
    DOP: 69.140296,
    DZD: 161.911574,
    EGP: 19.02405,
    ERN: 18.208302,
    ETB: 51.195305,
    EUR: 1,
    FJD: 2.484474,
    FKP: 0.881625,
    GBP: 0.868638,
    GEL: 4.157055,
    GGP: 0.881625,
    GHS: 6.99719,
    GIP: 0.881625,
    GMD: 62.173383,
    GNF: 12046.2916,
    GTQ: 9.362353,
    GYD: 253.892953,
    HKD: 9.426876,
    HNL: 29.281296,
    HRK: 7.534729,
    HTG: 105.880881,
    HUF: 357.463568,
    IDR: 17191.787888,
    ILS: 3.949023,
    IMP: 0.881625,
    INR: 88.963109,
    IQD: 1773.86956,
    IRR: 51104.192328,
    ISK: 150.620056,
    JEP: 0.881625,
    JMD: 184.39609,
    JOD: 0.860515,
    JPY: 131.854402,
    KES: 129.501814,
    KGS: 102.890989,
    KHR: 4915.615755,
    KMF: 495.779299,
    KPW: 1092.359183,
    KRW: 1352.337446,
    KWD: 0.365539,
    KYD: 1.011309,
    KZT: 517.697945,
    LAK: 11433.356369,
    LBP: 1854.58264,
    LKR: 239.065609,
    LRD: 208.749735,
    LSL: 17.283953,
    LTL: 3.583836,
    LVL: 0.734175,
    LYD: 5.455736,
    MAD: 10.757339,
    MDL: 21.600806,
    MGA: 4557.564029,
    MKD: 61.877408,
    MMK: 1890.074905,
    MNT: 3459.928492,
    MOP: 9.708571,
    MRO: 433.302174,
    MUR: 49.402616,
    MVR: 18.630837,
    MWK: 964.917476,
    MXN: 24.1682,
    MYR: 4.990845,
    MZN: 70.49962,
    NAD: 17.283337,
    NGN: 461.81674,
    NIO: 42.674747,
    NOK: 10.001882,
    NPR: 142.626799,
    NZD: 1.669646,
    OMR: 0.467277,
    PAB: 1.213571,
    PEN: 4.633426,
    PGK: 4.278422,
    PHP: 58.056422,
    PKR: 184.790271,
    PLN: 4.553049,
    PYG: 8235.537057,
    QAR: 4.41921,
    RON: 4.925919,
    RSD: 118.220665,
    RUB: 89.58797,
    RWF: 1192.491853,
    SAR: 4.552239,
    SBD: 9.667359,
    SCR: 18.364441,
    SDG: 487.320034,
    SEK: 10.111202,
    SGD: 1.610125,
    SHP: 0.881625,
    SLL: 12428.617587,
    SOS: 711.247037,
    SRD: 17.179156,
    STD: 25159.621596,
    SVC: 10.618749,
    SYP: 1526.350015,
    SZL: 17.296074,
    THB: 37.784056,
    TJS: 13.840363,
    TMT: 4.248063,
    TND: 3.322596,
    TOP: 2.741396,
    TRY: 10.000664,
    TTD: 8.245489,
    TWD: 33.784599,
    TZS: 2814.644809,
    UAH: 33.683138,
    UGX: 4316.562207,
    USD: 1.213732,
    UYU: 53.535062,
    UZS: 12762.393874,
    VEF: 259532618855.4176,
    VND: 27994.732402,
    VUV: 132.950841,
    WST: 3.072838,
    XAF: 659.418989,
    XAG: 0.044496,
    XAU: 0.000663,
    XCD: 3.280172,
    XDR: 0.846444,
    XOF: 659.666431,
    XPF: 120.039877,
    YER: 303.857809,
    ZAR: 17.122243,
    ZMK: 10925.049101,
    ZMW: 27.147928,
    ZWL: 390.821994
  }
}

// https://respok.com/fixer_io

const Page = () => {
  function onChange(value) {
    console.log(`selected ${value}`)
  }

  const list = Currency.map(x => ({
    label: `${x.country} ${x.text} ${x.currency} `,
    value: x.currency
  }))

  const filterOption = (input, option) =>
    option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0

  return (
    <div className="common-box flex start">
      <Input.Group compact className="w320">
        <Input className="w120" placeholder="请输入金额" />
        <Select
          showSearch
          className="w200"
          placeholder="选择货币"
          defaultValue="CNY"
          onChange={onChange}
          filterOption={filterOption}
          options={list}></Select>
      </Input.Group>
      <div className="eq mx15">=</div>

      <Select
        showSearch
        className="w200"
        placeholder="选择货币"
        defaultValue="CNY"
        onChange={onChange}
        filterOption={filterOption}
        options={list}
        addonBefore={'qq'}></Select>
    </div>
  )
}

export default Page
