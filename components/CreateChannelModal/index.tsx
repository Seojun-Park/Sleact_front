import React, { FC, useCallback } from 'react'
import { SignupStyles } from '@pages/SignUp/styles'
import useInput from '@hooks/useInput';
import Modal from '@components/Modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import useSWR from 'swr';
import { IChannel, IUser } from '../../typings/db';
import fetcher from '../../utils/fetcher';

interface Props {
	show: boolean;
	onCloseModal: () => void
	setShowCreateChannelModal: (flag: boolean) => void;
}

const CreateChannelModal: FC<Props> = ({ show, onCloseModal, setShowCreateChannelModal }) => {
	const [newChannel, onChangeNewChannel, setNewChannel] = useInput('')
	const { workspace, channel } = useParams<{ workspace: string, channel: string }>()
	const { data: userData, error, revalidate, mutate } = useSWR<IUser | false>(
		'/api/users',
		fetcher,
		{ dedupingInterval: 1000 }
	);
	const { revalidate: revalidateChannel } = useSWR<IChannel[]>(
		userData ? `/api/workspaces/${workspace}/channels` : null,
		fetcher
	)

	const onCreateChannel = useCallback((e) => {
		e.preventDefault()
		axios.post(`/api/workspaces/${workspace}/channels`, {
			name: newChannel
		}, { withCredentials: true }
		).then((response) => {
			setShowCreateChannelModal(false)
			revalidateChannel()
			setNewChannel('')
		})
			.catch((error) => {
				console.dir(error)
				toast.error(error.response?.data, { position: 'bottom-center' })
			})
	}, [newChannel])

	if (!show) {
		return null;
	}

	return (
		<Modal show={show} onCloseModal={onCloseModal}>
			<form onSubmit={onCreateChannel}>
				<SignupStyles.Label id='channel-label'>
					<span>Channel</span>
					<SignupStyles.Input id="channel" value={newChannel} onChange={onChangeNewChannel} />
				</SignupStyles.Label>
				<SignupStyles.Button type='submit'>Create</SignupStyles.Button>
			</form>
		</Modal>
	)
}

export default CreateChannelModal