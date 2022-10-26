import { component$, useContext } from '@builder.io/qwik'
import { ChatContext } from '~/components/chat-window/ChatWindow'
import ChatMessage from './ChatMessage'

export default component$(() => {
  const chatContext = useContext(ChatContext)

  return (
    <div class="message-display">
      {chatContext.messages.map((message: string) => (
        <ChatMessage message={message} />
      ))}
    </div>
  )
})
