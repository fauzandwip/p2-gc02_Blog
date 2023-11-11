import { useState } from 'react';
import Form from '../components/Form';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import ButtonNormal from '../components/ButtonNormal';
import axios from '../api';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AddUser = () => {
	const [user, setUser] = useState({
		email: '',
		password: '',
		username: '',
		phoneNumber: '',
		address: '',
	});

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			await axios.post('/add-user', user, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('access_token')}`,
				},
			});

			Swal.fire({
				title: 'Success create staff!',
				icon: 'success',
			});
		} catch (error) {
			const errMessage = error.response.data.message;

			if (errMessage) {
				toast.error(errMessage);
			} else {
				error.response.data.messages.forEach((message) => {
					toast.error(message);
				});
			}
		}
	};

	return (
		<div className="bg-slate-600 w-full h-screen flex justify-center pt-24">
			<Form onSubmit={onSubmit} className={'w-1/2 h-max'}>
				<div className="title-form text-4xl text-center mb-4">
					Create New Staff
				</div>
				<Input
					type={'email'}
					labelName={'Email'}
					id={'email-add-user'}
					value={user.email}
					placeholder={'jack@gmail.com'}
					isRequired={true}
					onChange={(e) => {
						setUser((prev) => {
							return { ...prev, email: e.target.value };
						});
					}}
				/>
				<Input
					type={'password'}
					labelName={'Password'}
					id={'password-add-user'}
					value={user.password}
					placeholder={'jackkk1$$0.'}
					isRequired={true}
					onChange={(e) => {
						setUser((prev) => {
							return { ...prev, password: e.target.value };
						});
					}}
				/>
				<div className="w-full flex gap-10">
					<Input
						addClassName={'w-full'}
						labelName={'Username'}
						id={'username-add-user'}
						value={user.username}
						placeholder={'jack'}
						onChange={(e) => {
							setUser((prev) => {
								return { ...prev, username: e.target.value };
							});
						}}
					/>
					<Input
						addClassName={'w-full'}
						labelName={'Phone Number'}
						id={'phone-add-user'}
						value={user.phoneNumber}
						placeholder={'089123456789'}
						onChange={(e) => {
							setUser((prev) => {
								return { ...prev, phoneNumber: e.target.value };
							});
						}}
					/>
				</div>
				<TextArea
					labelName={'Address'}
					id={'address-add-user'}
					rows={5}
					value={user.address}
					placeholder={
						'Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678'
					}
					onChange={(e) => {
						setUser((prev) => {
							return { ...prev, address: e.target.value };
						});
					}}
				></TextArea>
				<ButtonNormal type={'submit'} color={'teal-light'}>
					Add
				</ButtonNormal>
			</Form>
		</div>
	);
};

export default AddUser;
