import { useState } from 'react';
import Input from '../components/Input';
import ButtonNormal from '../components/ButtonNormal';
import Form from '../components/Form';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className="login flex flex-col gap-10 items-center justify-center w-full h-screen bg-slate-500">
			<div className="text-4xl font-bold text-slate-100">Welcome to Blog</div>
			<Form>
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
