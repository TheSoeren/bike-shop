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
import { v4 as uuid } from 'uuid'
import Styling from './chat-window.css'
import { LanguageSwitcher } from './LanguageSwitcher'

export interface Message {
  sender: 'bot' | 'user'
  message: string
}
export interface ChatBot {
  sessionId: string
  language: 'en' | 'de'
  messages: Message[]
}
export const ChatContext = createContext<ChatBot>('chat-context')

export const ChatWindow = component$(() => {
  useStyles$(Styling)
  const state = useStore<ChatBot>(
    {
      sessionId: uuid(),
      language: 'en',
      messages: [
        {
          sender: 'bot',
          message: `Welcome to<pre>
    ___ _            _    _               _            
   / __\\ | ___   ___| | _| |__  _   _ ___| |_ ___ _ __ 
  /__\\// |/ _ \\ / __| |/ / '_ \\| | | / __| __/ _ \\ '__|
 / \\/  \\ | (_) | (__|   <| |_) | |_| \\__ \\ ||  __/ |   
 \\_____/_|\\___/ \\___|_|\\_\\_.__/ \\__,_|___/\\__\\___|_|   
        </pre>What do you want to do today?`,
        },
      ],
    },
    { recursive: true }
  )

  useContextProvider(ChatContext, state)
  return (
    <>
      <LanguageSwitcher />
      <div class="chat-window">
        <Slot />
      </div>
    </>
  )
})
