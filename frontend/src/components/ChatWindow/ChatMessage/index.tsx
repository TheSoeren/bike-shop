import { component$, useStyles$ } from '@builder.io/qwik'
import { Message } from '~/components/ChatWindow'
import Styling from './chat-message.css'

export interface ChatMessage {
  message: Message
}
export default component$(({ message }: ChatMessage) => {
  useStyles$(Styling)
  return (
    <div
      class={[
        'chat-message',
        message.sender === 'user' ? 'chat-message--user' : 'chat-message--bot',
      ]}
    >
      <p>{message.message}</p>
    </div>
  )
})
