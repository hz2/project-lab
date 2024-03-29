import  { useEffect, useState } from 'react'
import { Upload, Button, message, UploadProps } from 'antd'
import {
  UploadOutlined,
  DownloadOutlined,
  DeleteTwoTone,
  BulbOutlined
} from '@ant-design/icons'
import './svgTool.less'

import { downloadBlob, svgStr2BlobUrl } from '@libs/common'
import { RcFile } from 'antd/lib/upload'
import JSZip from 'jszip'

const dom2ostr = (dom: Node) => {
  const s = new XMLSerializer()
  const svgString = s.serializeToString(dom)
  return svgString.replace(/symbol/gi, 'svg')
  // const result = optimize(svgString.replace(/symbol/ig, 'svg'), {
  //   multipass: true
  // })
  // return result.data;
}

/**
 * Parses a string into an SVG XML document using the DOMParser API.
 *
 * @param {string} str - The string to be parsed.
 * @return {Document} The parsed SVG XML document.
 */
const str2dom = (str: string) => {
  const parser = new DOMParser()
  return parser.parseFromString(str, 'image/svg+xml')
}
const str2symbolList = (str: string) => {
  const d = str2dom(str)
  const symbolList = [...Array.from(d.querySelectorAll('symbol'))]
  const dom2Arr = (x: Element) => {
    const d = x;
    d.removeAttribute('xmlns');
    return [x.id, d.outerHTML]
  }
  const GradientList = Object.fromEntries([...Array.from(d.querySelectorAll('svg>linearGradient,svg>radialGradient'))].map(x => dom2Arr(x)))
  return symbolList.map(x => {
    const fillUrl = [...Array.from(x.querySelectorAll("[fill^=url]"))].map(y => {
      const key = y?.attributes?.getNamedItem('fill')?.value.replace(/^url\(#|\)$/gi, '');
      return GradientList[key || ''] || ''
    }).join('');
    if (!fillUrl) {
      return x
    } else if (x.querySelector('defs')) {
      x.querySelector('defs')!.insertAdjacentHTML('beforeend', fillUrl)
    } else if (fillUrl) {
      x.insertAdjacentHTML('afterbegin', `<defs>${fillUrl}</defs>`)
    }
    return x
  })
}

interface ISymbol {
  svg: string,
  bloburl: string,
  name: string,
}

interface TLoadFile {
  name: string,
  uid: string,
  list: ISymbol[],
}
const SvgTool = () => {
  const [svgList, setSvgList] = useState<TLoadFile[]>([])
  useEffect(() => { }, [])
  const LoadFile = (file: RcFile | undefined): Promise<TLoadFile> =>
    new Promise((resolve, reject) => {
      if (!file) {
        reject('no file')
        return
      }
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      reader.onload = ({ target }) => {
        const result = target?.result
        if (!result || typeof result !== 'string') {
          reject('no onload result')
          return
        }
        resolve({
          name: file.name,
          uid: file?.uid,
          list: str2symbolList(result).map(symbol => ({
            svg: dom2ostr(symbol),
            bloburl: svgStr2BlobUrl(dom2ostr(symbol)),
            name: symbol.id
          }))
        })
      }
      reader.onerror = e => reject(e)
    })


  const donwloadZip = () => {
    if (!svgList.length) {
      message.info('请上传 Svg Symbol')
      return
    }
    const zip = new JSZip()
    const FolderList = (list: ISymbol[], folder: { file: (arg0: string, arg1: string) => void }) => {
      const nameArr: string[] = []
      list.forEach((x) => {
        const name = x.name || 'svg'
        let newName = name
        if (nameArr.includes(name)) {
          newName += '_' + nameArr.filter(y => y === name).length
        }
        nameArr.push(name)
        folder.file(newName + '.svg', x.svg)
      })
    }
    svgList.forEach(x => {
      const folder = zip.folder(x.name.replace('.svg', ''))
      if (folder) {
        FolderList(x.list, folder)

      }
    })
    zip
      .generateAsync({ type: 'blob' })
      .then((blob: Blob | MediaSource) => downloadBlob(blob, 'svgSymbol2svg.zip'))
  }

  const scrollToDom = ({ uid }: { uid: string }) => {
    const top = document.querySelector('#' + uid)?.getBoundingClientRect().y
    window.scrollTo({
      top,
      left: 0,
      behavior: 'smooth'
    })
  }

  const props: UploadProps = {
    name: 'file',
    multiple: true,
    accept: '.svg',
    onChange: ({ fileList }) => {
      const arr = fileList.map((x) => LoadFile(x.originFileObj))
      Promise.all(arr).then(list => setSvgList(list))
    },
    beforeUpload: () => false,
    onPreview: scrollToDom
  }

  const setSample = () => {
    fetch('./svgsymbol2.svg', { mode: 'cors' })
      .then(response => response.blob())
      .then(blob => {
        const filename = 'svgsymbol2.svg'
        const file = new File([blob], filename, {
          type: 'image/svg+xml',
          lastModified: Date.now()
        }) as RcFile
        LoadFile(file).then(res => setSvgList([res]))
      })
  }

  const removeItem = (index: number) => {
    setSvgList(svgList.filter((_x, i) => i !== index))
  }

  return (
    <div className='inner-page'>
      <div className="btngroup">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>上传图标(Symbol)</Button>
        </Upload>
        <Button icon={<DownloadOutlined />} onClick={donwloadZip}>
          下载 Zip
        </Button>
        <Button className="ml25" icon={<BulbOutlined />} onClick={setSample}>
          示例
        </Button>
      </div>
      <div className="result">
        {svgList.map((x, i) => (
          <div className="file" key={i}>
            <div className="file-name common-title" id={x.uid}>
              <span>{x.name}</span>
              <DeleteTwoTone className="ml45" onClick={() => removeItem(i)} />
            </div>
            <div className="file-content">
              {x.list.map((y: { bloburl: string; name: string }, j: React.Key) => (
                <div className="item" key={j}>
                  <div className="icon">
                    <img src={y.bloburl} alt={y.name || ''} srcSet="" />
                  </div>
                  <div className="text">{y.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SvgTool
