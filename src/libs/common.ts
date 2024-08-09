import { message } from 'antd'

const CUSTOM_EL = 'hxdownload-message-list'

try {
  let ctor = customElements.get(CUSTOM_EL);
  console.log('ctor ', ctor);

  customElements.define(CUSTOM_EL,
    class extends HTMLElement {
      constructor() {
        super();

        // const divElem = document.createElement('div');
        // divElem.textContent = this.getAttribute('text');
        // divElem.className = 'text-node'
        // style
        const style = document.createElement('style');
        style.append(document.createTextNode(`
      .hx-msg-item{
        width: 250px;
        background: linear-gradient(to bottom right, #0007, #0004, #0005);
        box-shadow: 1px 0 20px 1px #64646433;
        padding: 2px 20px;
        margin-top: 16px;
        z-index: 65536;
        border-radius: 100px;
        color: #fff;
        transform: translateX(280px) translateY(0);
        transition: all cubic-bezier(0.18, 0.89, 0.32, 1.28) 450ms;
      }
      .hx-msg-item.creating {
        transform: translateX(0) translateY(0);
      }
      .hx-msg-item.deleting {
        transform: translateX(0) translateY(0);
      }
      .hx-text-node{
        font-size: 14px;
        line-height: 21px;
        font-family: sans-serif;
        width: 100%;
        overflow: hidden;
        word-break: break-word;
      }
      `))
        const shadowRoot = this.attachShadow({
          mode: 'open'
        });
        shadowRoot.appendChild(style);
      }
    }
  );

} catch (error) {
  console.log('e', error);


}



declare global {
  function myFunction(): boolean;
  var myVariable: number;
  var __hx_Msg_list: Set<any>;
}

// globalThis.myFunction = () => true;
globalThis.myVariable = 42;

globalThis.__hx_Msg_list = new Set();

const createElementWithName = (name: string) => {
  const tag = name.split(/[\.\#\[]/g)[0] || 'div';
  const classname = name.match(/(?<=\.)[\w\-]+/g)?.join(' ');
  const id = name.match(/(?<=\#)[\w\-]+/g)?.[0];
  const attr = name.match(/(?<=\[)[\w\-\=\"\']+(?=\])/g)?.map(x => x.split('='))
  const el = document.createElement(tag);
  if (classname) {
    el.className = classname;
  }
  if (id) {
    el.id = id
  }
  if (attr?.length) {
    attr.forEach(([key, val]) => el.setAttribute(key, val.replace(/["']/g, '')))
  }
  return el
}

class __hx_MsgIns {
  text: string;
  container: HTMLElement;
  el: HTMLElement;
  textEl: HTMLElement;
  constructor(text: string) {
    this.text = text;
    const containerEl = <HTMLElement>document.querySelector(CUSTOM_EL);
    if (containerEl) {
      this.container = containerEl
    } else {
      this.container = createElementWithName(CUSTOM_EL + '.hx-download-original-images-tool-msg')
      document.body.insertAdjacentElement('beforeend', this.container)
    }
    this.el = createElementWithName('.hx-msg-item.creating');
    this.textEl = createElementWithName('.hx-text-node');
    this.textEl.innerText = text;
    this.el.appendChild(this.textEl)
    this.container.shadowRoot?.append(this.el)
    __hx_Msg_list.add(this);
    setTimeout(() => {
      this.el.className = 'hx-msg-item'      
    }, 100);
  }
  /**
   * @param {string} text
   */
  update(text: string) {
    this.textEl.innerText = text
  }
  close() {
    this.el.className = 'hx-msg-item deleting'
    setTimeout(() => {
      this.textEl.innerText = ''
      console.log(' this', this);
      this.container.shadowRoot?.removeChild(this.el)
      __hx_Msg_list.delete(this);
    }, 450);
  }
}

export const openDown = (
  name: string,
  url: string,
  e:
    | React.MouseEvent<HTMLDivElement, MouseEvent>
    | React.MouseEvent<HTMLAnchorElement, MouseEvent>
) => {
  e && e.preventDefault();
  e && e.stopPropagation()

  if (url.startsWith('blob')) {
    downBlobUrl(url, name)
    return
  }

  fetch(url, {
    mode: "cors"
  })
    .then(async resp => {
      // instead of response.json() and other methods
      const reader = resp.body!.getReader();
      const contentLength = +resp.headers.get('Content-Length')!;
      const ct = (resp.headers && resp.headers.get('Content-Type')) || '';
      console.log('ct', ct);
      // Step 3: read the data
      let receivedLength = 0; // received that many bytes at the moment
      let chunks = []; // array of received binary chunks (comprises the body)


      const __hx_Msg = new __hx_MsgIns('Loading');
      // infinite loop while the body is downloading
      while (true) {
        // done is true for the last chunk
        // value is Uint8Array of the chunk bytes
        const {
          done,
          value
        } = await reader.read();

        if (done) {
          break;
        }
        chunks.push(value);
        receivedLength += value.length;
        __hx_Msg.update(`下载中 ${formatBytes(receivedLength)} / ${formatBytes(contentLength)}`)
      }
      __hx_Msg.close()
      return new Blob(chunks, {
        type: ct
      });


      // // Step 4: concatenate chunks into single Uint8Array
      // let chunksAll = new Uint8Array(receivedLength); // (4.1)
      // let position = 0;
      // for(let chunk of chunks) {
      //   chunksAll.set(chunk, position); // (4.2)
      //   position += chunk.length;
      // }

      // // Step 5: decode into a string
      // let result = new TextDecoder("utf-8").decode(chunksAll);

      // // We're done!
      // let commits = JSON.parse(result);
      // alert(commits[0].author.login);

      // return resp.blob()
    })
    .then(r => {
      downloadBlob(r, name)
    })
    .catch(err => {
      console.log("Request failed", err);
    });
}

export const downloadBlob = (blob: Blob | MediaSource, name: string) => {
  const blobUrl = URL.createObjectURL(blob)
  downBlobUrl(blobUrl, name)
}

export const downBlobUrl = (blobUrl: string, name?: string) => {
  let el = document.createElement("a");
  el.setAttribute("href", blobUrl);
  if (name) {
    el.setAttribute("download", name)
  }
  if (document.createEvent) {
    const event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    el.dispatchEvent(event);
  } else {
    el.click();
  }
}

/**
 *
 * @param {*} text
 * @param {*} msg
 * @returns
 */
export const copyText = (
  text: string,
  msg: string | undefined = '复制成功！'
) =>
  navigator.clipboard
    .writeText(text)
    .then(() => message.success(msg))
    .catch(e => {
      console.log('copy err: ', e)
    })

/**
 *
 * @param {*} bytes
 * @param {*} decimals
 * @returns
 */

export const formatBytes = (
  bytes: number,
  decimals: number | undefined = 2
) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  // const sizes = ['b', 'k', 'm']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const svgStr2b64 = (str = '', val: boolean | string = false) => {
  let out = str
    .replace(/(<\?xml[\w ".=-]+\?>\n*)|version *= *"[\d.]+" |(<!-.*->)/g, '')
    .replace(/(\n +)|[\n\r\t]+/g, ' ')
  if (!/http:\/\/\www\.w3\.org\/2000\/svg/i.test(str)) {
    out = str.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"')
  }
  const output = out.replace(/>[\n\r \t]+</g, '><').replace(/[\n\r \t]+/g, ' ')

  if (val === 'orgin') {
    return output
  } else if (val) {
    return 'data:image/svg+xml;base64,' + window.btoa(output)
  } else {
    return (
      'data:image/svg+xml,' +
      output.replace(/[^\d\w ="'/]/g, x => encodeURIComponent(x))
    )
  }
}

export const svgStr2BlobUrl = (str: string | undefined) => {
  const out = svgStr2b64(str, 'orgin')
  const blob = new Blob([out], {
    type: 'image/svg+xml'
  })
  return URL.createObjectURL(blob)
}



export const Qs = {
  /**
   * Serializes an object into a query string.
   *
   * @param {any} obj - The object to stringify.
   * @return {string} The serialized query string.
   */
  stringify: (obj: Record<string, string>): string => new URLSearchParams(obj).toString(),
  parse: (str: string) => Object.fromEntries(new URLSearchParams(str).entries())
}