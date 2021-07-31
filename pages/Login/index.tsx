import React, { useCallback, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { SignupStyles } from '@pages/SignUp/styles'
import useInput from '../../hooks/useInput'
import axios from 'axios'
import useSWR from 'swr'
import fetcher from '../../utils/fetcher'


const Login = () => {
	const { data, error, revalidate, mutate } = useSWR('/api/users', fetcher, {
		dedupingInterval: 20000,
		errorRetryInterval: 5000,
		errorRetryCount: 5
	})
	const [logInError, setLogInError] = useState(false)
	const [email, onChangeEmail] = useInput('');
	const [password, onChangePassword] = useInput('')

	const onSubmit = useCallback((e) => {
		e.preventDefault()
		setLogInError(false)
		axios.post(
			'/api/users/login',
			{ email, password },
			{ withCredentials: true }
		)
			.then((response) => {
				mutate(response.data);
			})
			.catch((error) => {
				console.log(error)
				setLogInError(error.response?.data?.statusCode === 401);
			})
	}, [email, password])


	if (data === undefined) {
		return <div>Loading...</div>
	}

	if (data) {
		return <Redirect to="/workspace/sleact/channel/general" />
	}

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
				<SignupStyles.Label id="password-label">
					<span>비밀번호</span>
					<div>
						<SignupStyles.Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
					</div>
					{logInError && <SignupStyles.Error>이메일과 비밀번호 조합이 일치하지 않습니다.</SignupStyles.Error>}
				</SignupStyles.Label>
				<SignupStyles.Button type="submit">로그인</SignupStyles.Button>
			</SignupStyles.Form>
			<SignupStyles.LinkContainer>
				아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
			</SignupStyles.LinkContainer>
		</div>
	)
}

export default Login