let subscribers = [] as Subscriber[]


let ws: WebSocket | null = null

const closeHandler = () => {
    setTimeout(createWsChanel, 3000)
}


const createWsChanel = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)

}

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessage))
}

export const chatApi = {
    start() {
        createWsChanel()
    },
    subscribe(callback: (messages: ChatMessage[]) => void) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },

    unsubscribe(callback: (messages: ChatMessage[]) => void) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    }

}

type Subscriber = (messages: ChatMessage[]) => void

export type ChatMessage = {
    message: string
    photo: string
    userId: number
    userName: string

}