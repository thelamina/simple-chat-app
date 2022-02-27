import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../common/hooks/useFetch';

type Props = {
	children?: React.ReactNode;
};

export const Home = ({ children }: Props) => {
	const navigate = useNavigate();

	const { isLoading, data: channels } = useFetch(
		process.env.REACT_APP_API_BASE_URL + '/chat/channels'
	);

	const [formData, setFormData] = useState({
		channel: '',
		user: {
			name: '',
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		navigate(`chat`, {
			state: {
				...formData,
				channel: JSON.parse(formData.channel),
			},
		});
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='joinForm'>
			<form className='form_wrap' onSubmit={handleSubmit}>
				<div className='form_row'>
					<div className='form_item'>
						<div className='form_input'>
							<input
								required
								type='text'
								placeholder='Full Name'
								autoComplete='off'
								name='name'
								value={formData.user.name}
								onChange={(e) => {
									setFormData({
										...formData,
										user: {
											...formData.user,
											name: e.target.value,
										},
									});
								}}
							/>
							<span className='bottom_border'></span>
						</div>
					</div>
				</div>
				<div className='form_row'>
					<div className='form_item'>
						<div className='form_select'>
							<select
								required
								name='room'
								onChange={(e) => {
									setFormData({
										...formData,
										channel: e.target.value,
									});
								}}
							>
								<option value=''>Please select a group</option>
								{channels?.data.map(
									(channel: any, i: number) => (
										<option
											key={channel.id}
											value={JSON.stringify(channel)}
										>
											{channel.name}
										</option>
									)
								)}
							</select>
							<i className='fas fa-chevron-down'></i>
						</div>
					</div>
				</div>
				<div className='form_buttons'>
					<button className='btn' type='submit'>
						Join
					</button>
				</div>
			</form>
		</div>
	);
};
