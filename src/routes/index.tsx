import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { ChatWindow, ChatInput, MessageDisplay } from '~/components/ChatWindow'

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
