import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { ChatMessages, ChatMembers } from '../../common/components';
import { socketService } from '../../common/services';

type Props = {
	children?: React.ReactNode;
};

export const Chat = ({ children }: Props): JSX.Element => {
	const location = useLocation();
	const [messages, setMessages] = useState<any>([]);
	const [members, setMembers] = useState<any>([]);
	const [tempMessage, setTempMessage] = useState<{
		content: {
			text?: string;
			url?: string;
		};
		from: string;
		room: string;
		createdDate: string;
	}>({
		content: {
			text: '',
		},
		from: '',
		room: '',
		createdDate: '',
	});

	const { state }: any = location;

	const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		socketService.socket.emit('send-message', {
			channel: state.channel.id,
			message: tempMessage,
		});

		setMessages([...messages, tempMessage]);
		const msgArr = messages.filter(
			(message: any) => message.room === state.channel.id
		);
		if (msgArr.length > 3) {
			scrollToBottom();
		}
		setTempMessage({
			content: {
				text: '',
			},
			from: '',
			room: '',
			createdDate: '',
		});
	};

	useEffect(() => {
		socketService.joinChannel(state?.channel.id, state?.user);
		setMembers([
			...state?.channel.participants,
			{ ...state?.user, id: socketService.socket.id },
		]);
		return () => {
			socketService.leaveChannel(state.channel.id);
		};
	}, [state.channel.id, state.channel.participants, state?.user]);

	useEffect(() => {
		socketService.socket.on('welcomeMessage', (message) => {
			setMessages([...messages, message]);

			if (messages.length > 3) {
				scrollToBottom();
			}
		});
	}, [members, messages]);

	useEffect(() => {
		socketService.socket.on('recieve-message', (message) => {
			setMessages([...messages, message]);

			const msgArr = messages.filter(
				(message: any) => message.room === state.channel.id
			);
			if (msgArr.length > 3) {
				scrollToBottom();
			}
		});
	}, [messages, state?.channel?.id]);

	useEffect(() => {
		socketService.socket.on('getRoomUsers', (users) => {
			setMembers(users);
		});
	}, [members]);

	const scrollToBottom = () => {
		// selectors
		const listHeight: any = document.querySelector('.messages #list ul');
		const messagesList: any = document.querySelector('.messages #list');
		const newMessage: any = document.querySelector(
			'.messages #list ul li:last-child'
		);
		// heights
		const messagesWrapperHeight = listHeight.clientHeight;
		const clientHeight = messagesList.clientHeight;
		const scrollTop = messagesList.scrollTop;
		const scrollHeight = messagesList.scrollHeight;
		const newMessageHeight = newMessage.offsetHeight;
		const lastMessageHeight = newMessage.previousSibling.offsetHeight;

		if (
			clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
			scrollHeight
		) {
			document.querySelector('#list')?.scrollTo(0, messagesWrapperHeight);
		}
	};

	if (state === null) {
		return <Navigate to='/' />;
	}

	return (
		<div className='chatPage'>
			<ChatMembers users={members} />

			<div className='messages_wrap'>
				<h1>
					<Link to='/' replace>
						<i className='fas fa-chevron-circle-left' />
					</Link>
					{state.channel.name}
				</h1>

				<ChatMessages messages={messages} user={state.user} />

				<div className='newMsgForm'>
					<div className='wrap'>
						<form onSubmit={handleSendMessage}>
							<div className='form_wrap'>
								<div className='form_row'>
									<div className='form_item'>
										<div className='form_input'>
											<input
												name='newMsg'
												placeholder='Type your message...'
												autoComplete='off'
												value={
													tempMessage?.content?.text
												}
												onChange={(e) =>
													setTempMessage({
														...tempMessage,
														from: state.user.name,
														createdDate:
															moment().format(
																'h:mm a'
															),
														content: {
															text: e.target
																.value,
														},
													})
												}
											/>
											<span className='bottom_border'></span>
										</div>
									</div>
								</div>
							</div>
							<div className='btnWrap'>
								<button type='submit' className='btn'>
									<i className='fab fa-telegram-plane'></i>
								</button>
								{/* <button
									id='send_location'
									className='btn'
									// onClick={() => this.sendLocation()}
								>
									<i className='far fa-compass'></i>
								</button> */}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
