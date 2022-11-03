import {
  component$,
  useContext,
  $,
  useStore,
  useStyles$,
} from '@builder.io/qwik'
import { ChatContext, Message } from '~/components/ChatWindow'
import Styling from './chat-input.css'

export const buildMessage = (
  message: string,
  sender: 'bot' | 'user'
): Message => ({
  message,
  sender,
})

export const BASE_MESSAGE_OBJECT: Message = { sender: 'user', message: '' }

export default component$(() => {
  useStyles$(Styling)
  const chatContext = useContext(ChatContext)
  const messageObject = useStore(BASE_MESSAGE_OBJECT)

  const getAIResponse = $(async (message: string) => {
    const restURL = new URL(
      'https://18fc-2a02-1210-8ed3-8200-14a3-b63b-ede6-5556.eu.ngrok.io/communicate'
    )

    restURL.searchParams.append('sessionId', chatContext.sessionId)
    restURL.searchParams.append('message', message)
    restURL.searchParams.append('language', chatContext.language)

    const response = await fetch(restURL, {
      headers: new Headers({
        'ngrok-skip-browser-warning': '69420',
      }),
    })

    const answer = await response.text()
    chatContext.messages.push(buildMessage(answer, 'bot'))
  })

  const sendText$ = $(() => {
    if (messageObject.message.trim()) {
      chatContext.messages.push(Object.assign({}, messageObject)) // remove reactiveness
      getAIResponse(messageObject.message)
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
