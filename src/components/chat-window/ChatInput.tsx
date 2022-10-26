import { component$, useContext, $, useStore } from '@builder.io/qwik'
import { ChatContext } from '~/components/chat-window/ChatWindow'

export default component$(() => {
  const chatContext = useContext(ChatContext)
  const state = useStore({ message: '' })

  const sendText$ = $(() => {
    if (state.message) {
      chatContext.messages.push(state.message)
      console.log(chatContext.messages)
    }
  })

  const onMessageChange$ = $((e: InputEvent) => {
    const element = e.target as HTMLInputElement
    state.message = element.value || ''
  })

  return (
    <div class="chat-input">
      <form preventdefault:submit onSubmit$={sendText$}>
        <input type="text" onChange$={onMessageChange$} />
      </form>
    </div>
  )
})
