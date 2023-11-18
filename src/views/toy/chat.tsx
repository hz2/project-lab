import { Button, Input, List, Spin } from "antd"
import { ChangeEvent, useEffect, useState } from "react"
// import { query } from "./chatapi"
// import VirtualList, { ListRef } from 'rc-virtual-list';
import "./chat.less"
// import { debounce } from "lodash";

const { TextArea } = Input

// interface ChatItem {
//     type: 'me' | 'ai',
//     text: string,
//     t: number
// }

const Chat = () => {

    // const [chatList] = useState<ChatItem[]>([])
    const [inputVal, setInputVal] = useState('')

    const [loading] = useState(false);


    // const sendTextInner = () => {
    //     if (!inputVal) return
    //     const list = [...chatList]
    //     const newList = list.concat({
    //         type: 'me',
    //         text: inputVal,
    //         t: Date.now()
    //     })
    //     setChatList(newList)
    //     getResp(inputVal, newList)
    // }
    const sendText = () => { }; // debounce(sendTextInner, 300)

    const keydownHandler = (e: KeyboardEvent | React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === "Enter" && e.ctrlKey) sendText()
    }
    useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler);
        }
        // eslint-disable-next-line 
    }, []);

    // const hasResp = () => {
    //     setInputVal('')
    //     setLoading(false)
    // }
    // const getResp = async (str: string, oldList: ChatItem[]) => {

    //     setLoading(true)
    //     try {
    //         const response = await query({ prompt: str })
    //         const newList = oldList.concat({
    //             type: 'ai',
    //             text: response && response.trim(),
    //             t: Date.now()
    //         })
    //         setChatList(newList)
    //         hasResp()
    //         const index = newList.length - 1
    //         listRef.current?.scrollTo({ index, align: "bottom" })
    //     } catch (error) {
    //         console.error(error);
    //         hasResp()
    //     }

    // }
    const inputChange = ({
        target: { value }
    }: ChangeEvent<HTMLTextAreaElement>) => {
        setInputVal(value)
    }

    // const listRef = useRef<ListRef>(null)
    return <div className="chat-page">
        <List className="renderList">
            {/* <VirtualList
                data={chatList}
                height={window.innerHeight - 200}
                itemHeight={47}
                itemKey="t" ref={listRef}
            >
                {
                    (x, i) => (<List.Item
                        key={x.t + i}
                        className={"item  " + (x.type === 'me' ? 'me' : 'ai')}
                    >
                        <div className="avatar">{x.type}</div>
                        <div className="text">{x.text}</div>
                    </List.Item>)
                }
            </VirtualList> */}
        </List>
        <Spin spinning={loading}>
            <div className="bottom-block flex nowrap top">
                <TextArea placeholder="请输入" rows={2} value={inputVal} onChange={inputChange} onKeyDown={keydownHandler} />
                <Button type="primary" className="ml15" onClick={sendText}> Ctrl + Enter 发送</Button>
            </div>
        </Spin>
    </div>

}


export default Chat