import {
  component$,
  useStore,
  useContextProvider,
  createContext,
  Slot,
} from "@builder.io/qwik";

export interface ChatBot {
  messages: string[];
}
export const ChatContext = createContext<ChatBot>("chat-context");

export const ChatContextProvider = component$(() => {
  const state = useStore<ChatBot>({
    messages: [],
  });

  useContextProvider(ChatContext, state);
  return (
    <>
      <Slot />
      Messages: {state.messages.length}
    </>
  );
});
