import React, { useCallback, useState } from 'react';
import { SignupStyles } from './styles'
import { Link } from 'react-router-dom'
import useInput from '../../hooks/useInput';

const SignUp = () => {
	const [email, onChangeEmail] = useInput('')
	const [nickname, onChangeNickname] = useInput('')
	const [password, setPassword] = useState<string>('')
	const [passwordCheck, setPasswordCheck] = useState<string>('')
	const [mismatchError, setMismatchError] = useState<boolean>(false);

	const onChangePassword = useCallback((e) => {
		setPassword(e.target.value)
		setMismatchError(e.target.value !== passwordCheck)
	}, [passwordCheck])

	const onChangePasswordCheck = useCallback((e) => {
		setPasswordCheck(e.target.value)
		setMismatchError(e.target.value !== password)
	}, [password])

	const onSubmit = useCallback((e) => {
		e.preventDefault()
		console.log(email, nickname, password, passwordCheck)
		if (!mismatchError) {
			console.log('서버로 회원가입 하기')
		}
	}, [email, nickname, password, passwordCheck])


	return (
		<div id="container">
			<SignupStyles.Header>Sleact</SignupStyles.Header>
			<SignupStyles.Form onSubmit={onSubmit}>
				<SignupStyles.Label id="email-label">
					<span>이메일 주소</span>
					<div>
						<SignupStyles.Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
					</div>
				</SignupStyles.Label>
				<SignupStyles.Label id="nickname-label">
					<span>닉네임</span>
					<div>
						<SignupStyles.Input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} />
					</div>
				</SignupStyles.Label>
				<SignupStyles.Label id="password-label">
					<span>비밀번호</span>
					<div>
						<SignupStyles.Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
					</div>
				</SignupStyles.Label>
				<SignupStyles.Label id="password-check-label">
					<span>비밀번호 확인</span>
					<div>
						<SignupStyles.Input
							type="password"
							id="password-check"
							name="password-check"
							value={passwordCheck}
							onChange={onChangePasswordCheck}
						/>
					</div>
					{mismatchError && <SignupStyles.Error>비밀번호가 일치하지 않습니다.</SignupStyles.Error>}
					{!nickname && <SignupStyles.Error>닉네임을 입력해주세요.</SignupStyles.Error>}
					{/* {signUpError && <SignupStyles.Error>{signUpError}</SignupStyles.Error>}
					{signUpSuccess && <SignupStyles.Success>회원가입되었습니다! 로그인해주세요.</SignupStyles.Success>} */}
				</SignupStyles.Label>
				<SignupStyles.Button type="submit">회원가입</SignupStyles.Button>
			</SignupStyles.Form>
			<SignupStyles.LinkContainer>
				이미 회원이신가요?&nbsp;
        <Link to="/login">로그인 하러가기</Link>
			</SignupStyles.LinkContainer>
		</div>
	);
};

export default SignUp;
