import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Test from "~/components/chat-window/Test";
import { ChatContextProvider } from "~/context/ChatContext";

export default component$(() => {
  return (
    <ChatContextProvider>
      <Test />
    </ChatContextProvider>
  );
});

export const head: DocumentHead = {
  title: "Bike Shop",
};
