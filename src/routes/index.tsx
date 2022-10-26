import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import ChatInput from '~/components/chat-window/ChatInput'
import { ChatWindow } from '~/components/chat-window/ChatWindow'
import MessageDisplay from '~/components/chat-window/MessageDisplay'

export default component$(() => {
  return (
    <ChatWindow>
      <MessageDisplay />
      <ChatInput />
    </ChatWindow>
  )
})

export const head: DocumentHead = {
  title: 'Bike Shop',
}
