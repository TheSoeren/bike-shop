import { component$, useContext, useStyles$ } from '@builder.io/qwik'
import { ChatContext } from '~/components/ChatWindow'
import ChatMessage from '../ChatMessage'
import Styling from './message-display.css'

export default component$(() => {
  useStyles$(Styling)
  const chatContext = useContext(ChatContext)

  return (
    <div class="message-display">
      {chatContext.messages.map((message) => (
        <ChatMessage message={message} />
      ))}
    </div>
  )
})
