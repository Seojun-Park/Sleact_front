import React, { FC, useCallback } from 'react'
import { ModalStyle } from './styles';

interface Props {
	show: boolean;
	onCloseModal: () => void
}

const Modal: FC<Props> = ({ show, children, onCloseModal }) => {
	const stopPropagation = useCallback((e) => {
		e.stopPropagation()
	}, [])

	if (!show) {
		return null;
	}
	return (
		<ModalStyle.CreateModal>
			<div onClick={stopPropagation}>
				<ModalStyle.CloseModalButton onClick={onCloseModal}>&times;</ModalStyle.CloseModalButton>
				{children}
			</div>
		</ModalStyle.CreateModal>
	)
}

export default Modal