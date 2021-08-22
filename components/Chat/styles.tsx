import styled from '@emotion/styled'

export const ChatStyle = {
	Wrapper: styled.div`
	display: flex;
	padding: 8px 20px;
	&:hover{
		background:#eee;
	};
	& .chat-img{
		display: flex;
		width:36px;
		margin-right:9px;
		& img{
			width:36px;
			height:36px;
		}
	}
	`
}