import React, { useEffect, useRef, VFC } from 'react'
import { useCallback } from "react"
import { ChatBoxStyles } from "@components/ChatBox/styles"
import autosize from 'autosize'

interface Props {
	chat: string;
	onSubmitForm: (e: any) => void;
	onChangechat: (e: any) => void;
}

const ChatBox: VFC<Props> = ({ chat, onSubmitForm, onChangechat }) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const onKeyDownChat = useCallback((e) => {
		if (e.key === 'Enter') {
			if (!e.shiftKey) {
				e.preventDefault()
				onSubmitForm(e)
			}
		}
	}, [onSubmitForm])

	useEffect(() => {
		if (textareaRef.current) {
			autosize(textareaRef.current)
		}
	}, [])

	return (
		<ChatBoxStyles.ChatArea>
			<ChatBoxStyles.Form onSubmit={onSubmitForm}>
				<ChatBoxStyles.MentionsTextarea
					id="editor-chat"
					value={chat}
					onChange={onChangechat}
					onKeyDown={onKeyDownChat}
					placeholder={''}
					ref={textareaRef}
				/>
				<ChatBoxStyles.Toolbox>
					<ChatBoxStyles.SendButton
						className={
							'c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send' +
							(chat?.trim() ? '' : ' c-texty_input__button--disabled')
						}
						data-qa="texty_send_button"
						aria-label="Send message"
						data-sk="tooltip_parent"
						type="submit"
						disabled={!chat?.trim()}
					>
						<i className='c-icon c-icon--paperplane-filled' aria-hidden="true" />
					</ChatBoxStyles.SendButton>
				</ChatBoxStyles.Toolbox>
			</ChatBoxStyles.Form>
		</ChatBoxStyles.ChatArea>
	)
}

export default ChatBox