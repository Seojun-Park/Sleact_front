import React, { useCallback, RefObject } from 'react'
import { IChat, IDM } from '@typings/db'
import Chat from '../Chat'
import { ChatListStyle } from './styles'
import { Scrollbars } from 'react-custom-scrollbars'

interface Props {
	chatSections: { [key: string]: (IDM | IChat)[] }
	setSize: (f: (index: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
	isReachingEnd: boolean
	scrollRef: RefObject<Scrollbars>
}

const ChatList: React.FC<Props> = ({ chatSections, setSize, isReachingEnd, scrollRef }) => {
	const onScroll = useCallback((values) => {
		if (values.scrollTop === 0 && !isReachingEnd) {
			setSize((prevSize) => prevSize + 1).then(() => {
				if (scrollRef?.current) {
					scrollRef.current?.scrollTop(scrollRef.current?.getScrollHeight() - values.scrollHeight)
				}
			});
			//data added
		}
	}, [])

	return (
		<ChatListStyle.ChatZone>
			<Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>
				{Object.entries(chatSections).map(([date, chats]) => {
					return (
						<ChatListStyle.Section className={`section-${date}`} key={date}>
							<ChatListStyle.StickyHeader>
								<button>{date}</button>
							</ChatListStyle.StickyHeader>
							{chats.map((chat: (IDM | IChat)) => {
								return (
									<Chat key={chat.id} data={chat} />
								)
							})}
						</ChatListStyle.Section>

					)
				})}
			</Scrollbars>
		</ChatListStyle.ChatZone>
	)
}

export default ChatList