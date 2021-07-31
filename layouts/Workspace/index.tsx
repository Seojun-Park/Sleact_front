import axios from 'axios'
import React, { FC, useCallback } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'
import { WorkSpaceStyle } from './styles'
import gravatar from 'gravatar'
import loadable from '@loadable/component'

const Channel = loadable(() => import('@pages/Channel'))
const DirectMessage = loadable(() => import('@pages/DirectMessage'))

const Workspace: FC = ({ children }) => {
	const { data, error, revalidate, mutate } = useSWR('http://localhost:3095/api/users', fetcher, {
		dedupingInterval: 1000
	})

	const onLogout = useCallback(() => {
		axios.post('http://localhost:3095/api/users/logout', null, {
			withCredentials: true,
		})
			.then(() => {
				mutate(false)
			})
	}, [])


	if (data === undefined) {
		return <div>Loading...</div>
	}

	if (!data) {
		return <Redirect to="/login" />
	}

	return (
		<div>
			<WorkSpaceStyle.Header>
				<WorkSpaceStyle.RightMenu>
					<span>
						<WorkSpaceStyle.ProfileImg src={gravatar.url(data.nickname, { s: '28px', d: 'retro' })} alt={data.nickname} />
					</span>
				</WorkSpaceStyle.RightMenu>
			</WorkSpaceStyle.Header>
			<button>logout</button>
			<WorkSpaceStyle.WorkspaceWrapper>
				<WorkSpaceStyle.Workspaces>test</WorkSpaceStyle.Workspaces>
				<WorkSpaceStyle.Channels>
					<WorkSpaceStyle.WorkspaceName>
						Sleact
					</WorkSpaceStyle.WorkspaceName>
					<WorkSpaceStyle.MenuScroll>
						memu scroll
					</WorkSpaceStyle.MenuScroll>
				</WorkSpaceStyle.Channels>
				<WorkSpaceStyle.Chats>
					<Switch>
						<Route path="/workspace/channel" component={Channel} />
						<Route path="/workspace/dm" component={DirectMessage} />
					</Switch>
				</WorkSpaceStyle.Chats>
			</WorkSpaceStyle.WorkspaceWrapper>
		</div>
	)
}

export default Workspace