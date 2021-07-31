import React, { CSSProperties, FC, useCallback } from 'react'
import { MenuStyles } from './styles'

interface Props {
	show: boolean;
	onCloseModal: (e: any) => void;
	style: CSSProperties
	closeButton?: boolean
}

const Menu: FC<Props> = ({ children, style, show, onCloseModal, closeButton }) => {
	const stopPropagation = useCallback((e) => {
		e.stopPropagation();
	}, [])

	if (!show) {
		return null;
	}

	return (
		<MenuStyles.CreateMenu onClick={onCloseModal}>
			<div style={style} onClick={stopPropagation}>
				{closeButton && <MenuStyles.CloseModalButton onClick={onCloseModal}>&times;</MenuStyles.CloseModalButton>}
				{children}
			</div>
		</MenuStyles.CreateMenu>
	)
}

Menu.defaultProps = {
	closeButton: true
}

export default Menu