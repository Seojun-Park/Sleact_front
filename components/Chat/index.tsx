import React, { VFC, memo, useMemo } from 'react'
import gravatar from 'gravatar'
import { IChat, IDM } from '../../typings/db'
import { ChatStyle } from './styles'
import dayjs from 'dayjs'
import regexifyString from 'regexify-string'
import { Link, useParams } from 'react-router-dom'

interface Props {
	data: IDM | IChat
}

const Chat: VFC<Props> = ({ data }) => {
	const { workspace } = useParams<{ workspace: string, channel: string }>()
	const user = 'Sender' in data ? data.Sender : data.User;

	// \d === number, + more than 1, ? 0 or 1, * more than 0, g === global
	const result = useMemo(() => regexifyString({
		input: data.content,
		pattern: /@\[(.+?)\]\((\d+?)\)|\n/g,
		decorator(match, index) {
			const arr: string[] | null = match.match(/@\[(.+?)\]\((\d+?)\)/)!;
			if (arr) {
				return (
					<Link key={match + index} to={`/workspaces/${workspace}/dms/${arr[2]}`}>
						@{arr[1]}
					</Link>
				)
			}
			return <br key={index} />
		}
	}), [data.content])

	return (
		<ChatStyle.Wrapper>
			<div className="chat-img">
				<img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
			</div>
			<div className="chat-text">
				<div className="chat-user">
					<b>{user.nickname}</b>
					<span>{dayjs(data.createdAt).format(' h:mm A')}</span>
				</div>
				<p>{result}</p>
			</div>
		</ChatStyle.Wrapper>
	)
}

export default memo(Chat)