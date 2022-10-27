import {
  component$,
  useStore,
  useContextProvider,
  createContext,
  Slot,
  useStyles$,
} from '@builder.io/qwik'
export { default as ChatInput } from './ChatInput'
export { default as MessageDisplay } from './MessageDisplay'
import Styling from './chat-window.css'

export interface Message {
  sender: 'bot' | 'user'
  message: string
}
export interface ChatBot {
  messages: Message[]
}
export const ChatContext = createContext<ChatBot>('chat-context')

export const ChatWindow = component$(() => {
  useStyles$(Styling)
  const state = useStore<ChatBot>(
    {
      messages: [
        { sender: 'bot', message: 'Hello Human!' },
        { sender: 'user', message: 'Hello Bot!' },
      ],
    },
    { recursive: true }
  )

  useContextProvider(ChatContext, state)
  return (
    <div class="chat-window">
      <Slot />
    </div>
  )
})
