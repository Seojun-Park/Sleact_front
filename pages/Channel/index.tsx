import React, { useCallback, useEffect, useRef, useState } from 'react'
import ChatBox from '@components/ChatBox'
import ChatList from '@components/ChatList'
import useInput from '@hooks/useInput'
import makeSection from '@utils/makeSection'
import Scrollbars from 'react-custom-scrollbars'
import { useParams } from 'react-router'
import useSocket from '@hooks/useSocket'
import useSWR, { useSWRInfinite } from 'swr'
import fetcher from '@utils/fetcher'
import { DMStyle } from '../DirectMessage/styles'
import { IChannel, IChat, IUser } from '../../typings/db'
import axios from 'axios'
import InviteChannelModal from '../../components/InviteChannelModal'

const Channel = () => {
	const { workspace, channel } = useParams<{ workspace: string, channel: string }>()
	const [showInviteChannelModal, setShowInviteChannelModal] = useState(false)
	const scrollbarRef = useRef<Scrollbars>(null);
	const [socket] = useSocket(workspace)
	const { data: myData } = useSWR(`/api/users`, fetcher)
	const { data: channelData } = useSWR<IChannel>(`/api/workspaces/${workspace}/channels/${channel}`, fetcher)
	const { data: chatData, mutate: mutateChat, revalidate, setSize } = useSWRInfinite<IChat[]>(
		(index) => `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=20&page=${index + 1}`,
		fetcher
	);
	const { data: channelMembersData } = useSWR<IUser[]>(
		myData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null, fetcher
	)

	const isEmpty = chatData?.[0]?.length === 0;
	const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false

	const [chat, onChangeChat, setChat] = useInput('')

	const onSubmitForm = useCallback((e) => {
		e.preventDefault();
		if (chat?.trim() && chatData && channelData) {
			const savedChat = chat;
			mutateChat((prevChatData) => {
				prevChatData?.[0].unshift({
					id: (chatData[0][0]?.id || 0) + 1,
					content: savedChat,
					UserId: myData.id,
					User: myData,
					ChannelId: channelData.id,
					Channel: channelData,
					createdAt: new Date()
				});
				return prevChatData
			}, false).then(() => {
				setChat('')
				if (scrollbarRef.current) {
					scrollbarRef.current?.scrollToBottom()
				}
			})
			axios.post(`/api/workspaces/${workspace}/channels/${channel}/chats`, {
				content: chat
			}).then(() => {
				revalidate()
			})
			.catch(error => console.dir(error))
		}
		setChat('')
	}, [chat, chatData, myData, channelData, workspace, channel])

	//put the scrollbar at the bottom when loading
	useEffect(() => {
		if (chatData?.length === 1) {
			scrollbarRef.current?.scrollToBottom()
		}
	}, [chatData])


	const onMessage = useCallback((data: IChat) => {
		if (data.Channel.name === channel && data.UserId !== myData.id) {
			mutateChat((chatData) => {
				chatData?.[0].unshift(data);
				return chatData
			}, false).then(() => {
				if (scrollbarRef.current) {
					if (
						scrollbarRef.current.getScrollHeight() <
						scrollbarRef.current.getClientHeight() + scrollbarRef.current.getScrollTop() + 150
					) {
						setTimeout(() => {
							scrollbarRef.current?.scrollToBottom();
						}, 50)

					}
				}
			})
		}
	}, [channel, mutateChat, myData])

	useEffect(() => {
		socket?.on('dm', onMessage);
		return () => {
			socket?.off('dm', onMessage)
		}
	}, [socket, myData])

	const onClickInviteChannel = useCallback(() => {
		setShowInviteChannelModal(true)
	}, [])

	const onCloseModal = useCallback(() => {
		setShowInviteChannelModal(false)
	}, [])

	if (!channelData || !myData) {
		return null;
	}

	const chatSections = makeSection(chatData ? chatData.flat().reverse() : [])

	return (
		<DMStyle.Container>
			<DMStyle.Header>
				<span>#{channel}</span>
				<div className="header-right">
					<span>{channelMembersData?.length}</span>
					<button
						onClick={onClickInviteChannel}
						className="c-button-unstyled p-ia__view_header__button"
						aria-label="Add people to #react-native"
						data-sk="tooltip_parent"
						type="button">
						<i className="c-icon p-ia__view_header__button_icon c-icon--add-user" aria-hidden="true" />
					</button>
				</div>
			</DMStyle.Header>
			<ChatList
				chatSections={chatSections}
				scrollRef={scrollbarRef}
				setSize={setSize}
				isReachingEnd={isReachingEnd}
			/>
			<ChatBox chat={chat} onChangechat={onChangeChat} onSubmitForm={onSubmitForm} />
			<InviteChannelModal
				show={showInviteChannelModal}
				onCloseModal={onCloseModal}
				setShowInviteModal={setShowInviteChannelModal}
			/>
		</DMStyle.Container>
	)
}

export default Channel