import React, { useCallback } from 'react'
import ChatBox from '../../components/ChatBox'
import ChatList from '../../components/ChatList'
import useInput from '../../hooks/useInput'
import { ChannelStyle } from './styles'

const Channel = () => {
	const [chat, onChangeChat] = useInput('')

	const onSubmitForm = useCallback((e) => { 
		e.preventDefualt()
	}, [])
	return (
		<ChannelStyle.Container>
			<ChannelStyle.Header>Channel!</ChannelStyle.Header>
			<ChatList />
			<ChatBox chat={chat} onChangechat={onChangeChat} onSubmitForm={onSubmitForm} />
		</ChannelStyle.Container>
	)
}

export default Channel