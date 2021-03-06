import axios from 'axios'
import React, { VFC, useCallback, useState, useEffect } from 'react'
import { Redirect, Route, Switch, useParams } from 'react-router'
import useSWR from 'swr'
import { WorkSpaceStyle } from './styles'
import gravatar from 'gravatar'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import loadable from '@loadable/component'
import Menu from '@components/Menu'
import { IChannel, IUser, IWorkspace } from '@typings/db'
import Modal from '@components/Modal'
import { SignupStyles } from '@pages/SignUp/styles'
import useInput from '@hooks/useInput'
import fetcher from '@utils/fetcher'
import CreateChannelModal from '@components/CreateChannelModal'
import InviteWorkspaceModal from '@components/InviteWorkspaceModal'
import InviteChannelModal from '@components/InviteChannelModal'
import DMList from '@components/DMList'
import ChannelList from '@components/ChannelList'
import useSocket from '@hooks/useSocket'

const Channel = loadable(() => import('@pages/Channel'))
const DirectMessage = loadable(() => import('@pages/DirectMessage'))

const Workspace: VFC = () => {
	const [newUrl, onChangeNewUrl, setNewUrl] = useInput('')
	const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('')
	const [showUserMenu, setShowUserMenu] = useState<boolean>(false)
	const [showWorkspaceModal, setShowWorkspaceModal] = useState<boolean>(false)
	const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState<boolean>(false)
	const [showCreateChannelModal, setShowCreateChannelModal] = useState<boolean>(false)
	const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState<boolean>(false)
	const [showInviteChannelModal, setShowInviteChannelModal] = useState<boolean>(false)
	const { workspace } = useParams<{ workspace: string }>()

	const { data, error, revalidate, mutate } = useSWR<IUser | false>('/api/users', fetcher, {
		dedupingInterval: 1000
	})
	const { data: channelData } = useSWR<IChannel[]>(data ? `/api/workspaces/${workspace}/channels` : null, fetcher)
	const { data: memberData } = useSWR<IUser[]>(data ? `/api/workspaces/${workspace}/members` : null, fetcher)
	const [socket, disconnect] = useSocket(workspace)

	console.log(channelData, memberData)
	useEffect(() => {
		if (channelData && data && socket) {
			socket.emit('login', { id: data.id, channels: channelData.map((v) => v.id) });
		}
	}, [socket, data, channelData])

	useEffect(() => {
		return () => {
			disconnect()
		}
	}, [workspace, disconnect])

	const onLogout = useCallback(() => {
		axios.post('/api/users/logout', null, {
			withCredentials: true,
		})
			.then(() => {
				mutate(false, false)
			})
	}, [])

	const onClickUserProfile = useCallback(() => {
		setShowUserMenu(!showUserMenu)
	}, [showUserMenu])

	const onClickCreateWorkspace = useCallback(() => {
		setShowCreateWorkspaceModal(true)
	}, [])

	const onCloseModal = useCallback(() => {
		setShowCreateWorkspaceModal(false);
		setShowCreateChannelModal(false)
		setShowInviteWorkspaceModal(false)
		setShowInviteChannelModal(false)
	}, [])

	const onClickAddChannel = useCallback(() => {
		setShowCreateChannelModal(true)
	}, [])

	const onClickInviteWorkspace = useCallback(() => {
		setShowInviteWorkspaceModal(true)
	}, [])

	const CreateWorkspace = useCallback((e) => {
		e.preventDefault();
		if (!newWorkspace || !newWorkspace.trim()) return; // trim : prevent blank space
		if (!newUrl || !newUrl.trim()) return;
		axios.post('/api/workspaces', {
			workspace: newWorkspace,
			url: newUrl,
		},
			{ withCredentials: true }
		).then(() => {
			revalidate();
			setShowCreateWorkspaceModal(false);
			setNewWorkspace('')
			setNewUrl('')
		}).catch((error) => {
			console.dir(error)
			toast.error(error.response?.data, { position: 'bottom-center' })
		});
	}, [newWorkspace, newUrl])

	const toggleWorkspaceModal = useCallback(() => {
		setShowWorkspaceModal(!showWorkspaceModal)
	}, [showWorkspaceModal])


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
					<span onClick={onClickUserProfile}>
						<WorkSpaceStyle.ProfileImg src={gravatar.url(data.email, { s: '28px', d: 'retro' })} alt={data.nickname} />
						{showUserMenu && (
							<Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onClickUserProfile}>
								<WorkSpaceStyle.ProfileModal>
									<img src={gravatar.url(data.nickname, { s: '28px', d: 'retro' })} alt={data.nickname} />
									<div>
										<span id="profile-name">{data.nickname}</span>
										<span id="profile-active">Active</span>
									</div>
								</WorkSpaceStyle.ProfileModal>
								<WorkSpaceStyle.LogOutButton onClick={onLogout}>Log out</WorkSpaceStyle.LogOutButton>
							</Menu>
						)}
					</span>
				</WorkSpaceStyle.RightMenu>
			</WorkSpaceStyle.Header>
			<WorkSpaceStyle.WorkspaceWrapper>
				<WorkSpaceStyle.Workspaces>
					{data && data.Workspaces && data.Workspaces.map((ws: IWorkspace) => {
						return (
							<Link key={ws.id} to={`/workspaces/${ws.name}/channels/general`}>
								<WorkSpaceStyle.WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkSpaceStyle.WorkspaceButton>
							</Link>
						)
					})}
					<WorkSpaceStyle.AddButton onClick={onClickCreateWorkspace}>+</WorkSpaceStyle.AddButton>
				</WorkSpaceStyle.Workspaces>
				<WorkSpaceStyle.Channels>
					<WorkSpaceStyle.WorkspaceName onClick={toggleWorkspaceModal}>
						Jin-sleact
					</WorkSpaceStyle.WorkspaceName>
					<WorkSpaceStyle.MenuScroll>
						<Menu show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal} style={{ top: 95, left: 80 }}>
							<WorkSpaceStyle.WorkspaceModal>
								<h2>Sleact</h2>
								<button onClick={onClickInviteWorkspace}>Add Member to this workspace</button>
								<button onClick={onClickAddChannel}>Add channel</button>
							</WorkSpaceStyle.WorkspaceModal>
						</Menu>
						<ChannelList />
						<DMList />
						{/* {channelData?.map((v) => (<div>{v.name}</div>))} */}
					</WorkSpaceStyle.MenuScroll>
				</WorkSpaceStyle.Channels>
				<WorkSpaceStyle.Chats>
					<Switch>
						<Route path="/workspaces/:workspace/channels/:channel" component={Channel} />
						<Route path="/workspaces/:workspace/dms/:id" component={DirectMessage} />
					</Switch>
				</WorkSpaceStyle.Chats>
			</WorkSpaceStyle.WorkspaceWrapper>
			<Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
				<form onSubmit={CreateWorkspace}>
					<SignupStyles.Label id='workspace-label'>
						<span>Workspace Name</span>
						<SignupStyles.Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
					</SignupStyles.Label>
					<SignupStyles.Label id='workspace-url-label'>
						<span>Workspace Url</span>
						<SignupStyles.Input id="workspace" value={newUrl} onChange={onChangeNewUrl} />
					</SignupStyles.Label>
					<SignupStyles.Button type='submit'>Create</SignupStyles.Button>
				</form>
			</Modal>
			<CreateChannelModal show={showCreateChannelModal} onCloseModal={onCloseModal} setShowCreateChannelModal={setShowCreateChannelModal} />
			<InviteWorkspaceModal show={showInviteWorkspaceModal} onCloseModal={onCloseModal} setShowInviteModal={setShowInviteWorkspaceModal} />
			<InviteChannelModal show={showInviteChannelModal} onCloseModal={onCloseModal} setShowInviteModal={setShowInviteChannelModal} />
		</div>
	)
}

export default Workspace