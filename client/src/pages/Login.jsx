import { useState } from 'react';
import Input from '../components/Input';
import ButtonNormal from '../components/ButtonNormal';
import Form from '../components/Form';
import axios from '../api/index';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post('/login', {
				email,
				password,
			});
			localStorage.setItem('access_token', data.access_token);
			navigate('/posts');
		} catch (error) {
			console.log(error.response);
		}
	};

	return (
		<div className="login flex flex-col gap-10 items-center justify-center w-full h-screen bg-slate-500">
			<div className="text-4xl font-bold text-slate-100">Welcome to Blog</div>
			<Form onSubmit={handleOnSubmit}>
				<Input
					labelName={'Email'}
					id={'email-login'}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder={'email@gmail.com'}
					isRequired={true}
				/>
				<Input
					type={'password'}
					labelName={'Password'}
					id={'password-login'}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder={'j@ckkk$paRRR0www'}
					isRequired={true}
				/>
				<ButtonNormal type={'submit'} color={'teal-light'}>
					Login
				</ButtonNormal>
			</Form>
		</div>
	);
};

export default Login;
