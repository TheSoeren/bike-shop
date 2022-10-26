import { component$ } from '@builder.io/qwik'

export interface ChatMessage {
  message: string
}
export default component$(({ message }: ChatMessage) => {
  return <div class="chat-message">{message}</div>
})
