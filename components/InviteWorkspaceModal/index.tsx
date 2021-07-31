import React, { FC, useCallback } from 'react'
import useSWR from 'swr'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useParams } from 'react-router'
import { SignupStyles } from '@pages/SignUp/styles'
import Modal from '@components/Modal'
import useInput from '@hooks/useInput'
import fetcher from '@utils/fetcher'
import { IChannel, IUser } from '@typings/db'

interface Props {
	show: boolean;
	onCloseModal: () => void
	setShowInviteModal: (flag: boolean) => void;
}
const InviteWorkspaceModal: FC<Props> = ({ show, onCloseModal, setShowInviteModal }) => {
	const { workspace } = useParams<{ workspace: string }>()
	const [newMember, onChangeNewMember, setNewMember] = useInput('')
	const { data: userData } = useSWR<IUser | false>(
		'/api/users',
		fetcher,
		{ dedupingInterval: 1000 }
	);
	const { revalidate: revalidateMember } = useSWR<IChannel[]>(
		userData ? `/api/workspaces/${workspace}/members` : null,
		fetcher
	)

	const onInviteMember = useCallback((e) => {
		e.preventDefault()
		if (!newMember || !newMember.trim()) return;
		axios.post(`/api/workspaces/${workspace}/members`, {
			email: newMember
		}, { withCredentials: true })
			.then((response) => {
				revalidateMember()
				setShowInviteModal(false);
				setNewMember('')
			})
			.catch((error) => {
				toast.error(error.response?.data, { position: 'bottom-center' })
			})
	}, [workspace, newMember])

	return (
		<Modal show={show} onCloseModal={onCloseModal}>
			<form onSubmit={onInviteMember}>
				<SignupStyles.Label id='channel-label'>
					<span>Email</span>
					<SignupStyles.Input id="channel" type='email' value={newMember} onChange={onChangeNewMember} />
				</SignupStyles.Label>
				<SignupStyles.Button type='submit'>INVITE</SignupStyles.Button>
			</form>
		</Modal>
	)
}

export default InviteWorkspaceModal