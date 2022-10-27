import { component$, useContext, useStyles$, useRef, useClientEffect$, useSignal, Signal, useWatch$ } from '@builder.io/qwik'
import { ChatContext } from '~/components/ChatWindow'
import ChatMessage from '../ChatMessage'
import Styling from './message-display.css'

export default component$(() => {
  useStyles$(Styling)
  const chatContext = useContext(ChatContext)
  const signal = useSignal<HTMLElement>()

  useClientEffect$(({ track }) => {
    track(() => chatContext.messages.length);

    if (signal.value){
      console.log('signal', signal.value)
      signal.value.scrollTop = signal.value.scrollHeight
    }
  })

  return (
    <div ref={signal} class="message-display">
      {chatContext.messages.map((message) => (
        <ChatMessage message={message} />
      ))}
    </div>
  )
})
