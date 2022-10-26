import {
  component$,
  useStore,
  useContextProvider,
  createContext,
  Slot,
} from '@builder.io/qwik'

export interface ChatBot {
  messages: string[]
}
export const ChatContext = createContext<ChatBot>('chat-context')

export const ChatWindow = component$(() => {
  const state = useStore<ChatBot>(
    {
      messages: [],
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
