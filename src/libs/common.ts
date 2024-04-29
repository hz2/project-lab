import { message } from 'antd'


try {
  customElements.define('hxdownload-message',
    class extends HTMLElement {
      constructor() {
        super();

        const divElem = document.createElement('div');
        // divElem.textContent = this.getAttribute('text');
        divElem.className = 'text-node'
        // style
        const style = document.createElement('style');
        style.append(document.createTextNode(`
      .text-node{
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
        shadowRoot.appendChild(divElem);
      }
    }
  );

} catch (error) {

}



declare global {
  function myFunction(): boolean;
  var myVariable: number;
  var __hx_Msg_list: Set<any>;
}

// globalThis.myFunction = () => true;
globalThis.myVariable = 42;

globalThis.__hx_Msg_list = new Set();

class __hx_MsgIns {
  text: string;
  el: HTMLElement;
  textEl: HTMLElement;
  constructor(text: string) {
    this.text = text;
    this.el = document.createElement('hxdownload-message')
    document.body.insertAdjacentElement('beforeend', this.el)
    this.el.className = 'hx-download-original-images-tool-msg';
    this.textEl = this.el.shadowRoot?.querySelector('.text-node')!;
    this.textEl.innerText = text;
    __hx_Msg_list.add(this);
    this.el.style.transform = `translateX(280px) translateY(-${(__hx_Msg_list.size - 1) * 50}px)`
  }
  /**
   * @param {string} text
   */
  update(text: string) {
    this.textEl.innerText = text
  }
  close() {
    this.textEl.innerText = ''
    this.el.parentElement?.removeChild(this.el)
    __hx_Msg_list.delete(this);
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
        __hx_Msg.update(`Received ${formatBytes(receivedLength)} / ${formatBytes(contentLength)}`)
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
  // const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const sizes = ['b', 'k', 'm']

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