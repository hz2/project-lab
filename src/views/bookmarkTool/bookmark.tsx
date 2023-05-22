import React, { useState } from 'react'
import { Input, Checkbox, Upload, Button, UploadProps, Tree, Tooltip } from 'antd'
import { UploadOutlined, BulbOutlined } from '@ant-design/icons'
import './tool.less'
import { svgStr2b64 as svgStr2b64Orgi } from '@libs/common'

import type { DataNode, TreeProps } from 'antd/es/tree';

import {
  DownOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import DirectoryTree from 'antd/es/tree/DirectoryTree'




type TCheckBox = { target: { checked: boolean } }
interface TLoadFile {
  name: string,
  uid: string,
  size: number,
  type: string,
  file: string
}

interface TFile extends File {
  uid: string
}
const Page = () => {
  const LoadFile = (file: TFile | undefined): Promise<TLoadFile> =>
    new Promise((resolve, reject) => {
      if (!file) {
        reject('no file')
        return
      }
      const reader = new FileReader()
      reader.readAsText(file, 'UTF-8')
      reader.onload = (f) => {
        const result = f?.target?.result;
        if (!result || typeof result !== 'string') {
          reject('no file')
          return
        }
        resolve({
          name: file.name,
          uid: file.uid,
          size: file.size,
          type: file.type,
          file: result
        })
      }
      reader.onerror = e => reject(e)
    })

  const [inputObj, setInputObj] = useState({
    text: '',
    dataUrl: ''
  })
  const [isb64, setB64] = useState(false)
  const svgStr2b64 = (str: string, val = isb64) => svgStr2b64Orgi(str, val);



  class ItemObj {
    mainTitle?= '';
    title: JSX.Element | string | undefined;
    tagName = '';
    key: string | undefined;
    children?: ItemObj[] = []
    ICON: string | undefined;
    HREF: string | undefined;
    icon: JSX.Element | undefined;
    isLeaf: boolean = false;
    exist: boolean = false;
    titleText: string | undefined;
    titleTextPath: string | undefined;

  }
  const [treeData, setTreeData] = useState<DataNode[]>([])
  const [flatData, setFlatData] = useState<ItemObj[]>([])
  const [duplicateObj, setDuplicateObj] = useState<any>({})

  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // setExpandedKeys(info.expandedKeys)
  };

  const onDrop: TreeProps['onDrop'] = (info) => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...treeData];

    // Find dragObject
    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: DataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setTreeData(data);
  };


  const props: UploadProps = {
    name: 'file',
    multiple: false,
    accept: '.html',
    maxCount: 5,
    showUploadList: false,
    onChange: async ({ fileList }) => {
      const [{ originFileObj }] = fileList
      const content = await LoadFile(originFileObj)
      const str = content.file



      const parser = new DOMParser()
      const r = parser.parseFromString(
        str.trim().replace(/\<DT\>|\<p\>/g, '')
          // .replace(/\<\/DL\>\<p\>/g, '</DL></p>')
          .replace(/&/g, '&amp;')
          .replace('<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">', '<RAWBODY>')
        + '</RAWBODY>'
        , 'text/xml')


      const body = r.querySelector('RAWBODY')

      let flatList: ItemObj[] = []
      let tempDuplicateObj: any = {}

      const domtoobj = (domarr: Element[], lev = '0', ptitle = ''): ItemObj[] => {
        let newArray = []
        lev += 1
        for (const i in domarr) {
          const x = domarr[i]
          let obj = new ItemObj
          obj.key = `${lev}_${i}`
          obj.tagName = x.tagName
          const attr = [...x.attributes]
          attr.map(x => ({ [x.name]: x.nodeValue })).reduce((o, x) => Object.assign(o, x), obj)
          obj.isLeaf = true


          const existItem = flatList.find(y => y.HREF === obj.HREF)
          if (existItem) {
            obj.exist = true
            tempDuplicateObj[obj.HREF as keyof typeof tempDuplicateObj] += (ptitle + '\n')
          }


          if (x.tagName === 'TITLE') {
            obj.title = x.innerHTML
          } else if (['A'].includes(x.tagName)) {
            if (obj.exist) {
              obj.title = <Tooltip title={() => {
                return tempDuplicateObj[obj.HREF || '-']
              }} color='red'  >
                {x.innerHTML}
              </Tooltip>
            } else {
              obj.title = <a href={obj.HREF} title={obj.HREF}   >  {x.innerHTML}</a>
            }

          } else if (x.tagName === 'DL') {
            obj.title = x?.previousElementSibling?.innerHTML
            obj.isLeaf = false
            obj.titleText = obj.title
            obj.titleTextPath = `${ptitle} / ${obj.titleText}`
            obj.children = domtoobj([...x.children], obj.key, obj.titleTextPath)
          } else if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(x.tagName)) {
            continue
          }
          if (obj.ICON) {
            obj.icon = <img src={obj.ICON} />
          }
          newArray.push(obj)
          flatList.push(obj)

        };
        return newArray
      }
      setFlatData(flatList)
      const rrr = domtoobj([...(body?.children || [])] as Element[])
      setTreeData(rrr as any)
      setDuplicateObj(tempDuplicateObj)
    },
    beforeUpload: () => false,
    onPreview: () => false
  }


  return (
    <div className="svgBg" >
      <div className="btngroup">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>上传书签</Button>
        </Upload>
      </div>
      <div className="common-box">
        <DirectoryTree
          showIcon
          showLine
          defaultExpandAll
          defaultSelectedKeys={['0-0-0']}
          switcherIcon={<DownOutlined />}

          draggable
          blockNode
          onDragEnter={onDragEnter}
          onDrop={onDrop}

          treeData={treeData}
        />
      </div>
    </div >
  )
}

export default Page
