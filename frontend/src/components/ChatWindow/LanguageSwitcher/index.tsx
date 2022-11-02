import { component$, useContext, useStyles$, $ } from '@builder.io/qwik'
import { ChatContext } from '..'
import Styling from './language-switcher.css'

export const LanguageSwitcher = component$(() => {
  useStyles$(Styling)
  const chatContext = useContext(ChatContext)

  const changeLanguage = $(() => {
    chatContext.language === 'en'
      ? (chatContext.language = 'de')
      : (chatContext.language = 'en')
  })

  return (
    <button class="language-switcher" onClick$={changeLanguage}>
      {chatContext.language === 'en' ? (
        <img src="en.png" />
      ) : (
        <img src="de.png" />
      )}
    </button>
  )
})
