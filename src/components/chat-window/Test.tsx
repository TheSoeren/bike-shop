import { component$, useContext } from "@builder.io/qwik";
import { ChatContext } from "~/context/ChatContext";

export default component$(() => {
  const chatContext = useContext(ChatContext);

  return <h1>{chatContext.messages.length}</h1>;
});
