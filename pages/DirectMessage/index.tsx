import React, { useCallback } from 'react'
import gravatar from 'gravatar'
import useSWR from 'swr'
import { useParams } from 'react-router'
import axios from 'axios'
import fetcher from '@utils/fetcher'
import { DMStyle } from '@pages/DirectMessage/styles'
import ChatBox from '@components/ChatBox'
import ChatList from '@components/ChatList'
import useInput from '@hooks/useInput'
import { IDM } from '@typings/db'

const DirectMessage = () => {
	const { workspace, id } = useParams<{ workspace: string, id: string }>()
	const { data: userData } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher, {
		dedupingInterval: 1000
	})
	const { data: myData } = useSWR(`/api/users`, fetcher)
	const { data: chatData, mutate: mutateChat, revalidate } = useSWR<IDM[]>(
		`/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`, fetcher
	)
	const [chat, onChangeChat, setChat] = useInput('')

	const onSubmitForm = useCallback((e) => {
		e.preventDefault();
		if (chat?.trim()) {
			axios.post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
				content: chat
			}).then(() => {
				revalidate()
				setChat('')
			}).catch(error => console.dir(error))
		}
		setChat('')
	}, [])



	if (!userData || !myData) {
		return null;
	}

	return (
		<DMStyle.Container>
			<DMStyle.Header>
				<img src={gravatar.url(userData.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
				<span>{userData.nickname}</span>
			</DMStyle.Header>
			<ChatList />
			<ChatBox chat={chat} onChangechat={onChangeChat} onSubmitForm={onSubmitForm} />
		</DMStyle.Container>
	)
}

export default DirectMessage