import {
  component$,
  useContext,
  $,
  useStore,
  useStyles$,
} from '@builder.io/qwik'
import { ChatContext, Message } from '~/components/ChatWindow'
import Styling from './chat-input.css'

export const BASE_MESSAGE_OBJECT: Message = { sender: 'user', message: '' }

export default component$(() => {
  useStyles$(Styling)
  const chatContext = useContext(ChatContext)
  const messageObject = useStore(BASE_MESSAGE_OBJECT)

  const sendText$ = $(() => {
    if (messageObject.message.trim()) {
      chatContext.messages.push(Object.assign({}, messageObject)) // remove reactiveness
      Object.assign(messageObject, BASE_MESSAGE_OBJECT)
    }
  })

  const onMessageChange$ = $((e: InputEvent) => {
    const element = e.target as HTMLInputElement
    messageObject.message = element.value || ''
  })

  return (
    <div class="chat-input">
      <form preventdefault:submit onSubmit$={sendText$}>
        <input
          type="text"
          value={messageObject.message}
          onInput$={onMessageChange$}
          autoFocus
        />
      </form>
    </div>
  )
})
