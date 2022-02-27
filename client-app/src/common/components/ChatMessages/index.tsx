import React from 'react';

type Props = {
	children?: React.ReactNode;
	messages: any[];
	user: any;
};

export const ChatMessages = ({ messages, user }: Props) => {
	return (
		<div className='messages'>
			<div id='list'>
				<ul>
					{messages.map((message, index) => {
						const className = (): string => {
							if (message?.from === 'Admin') {
								return 'broadcast';
							}
							if (message?.from === user.name) {
								return 'self';
							}
							return '';
						};
						return (
							<li key={index} className={className()}>
								{message.content.url ? (
									<div>
										<div className='msg'>
											{message?.from !== 'Admin' && (
												<h4>{message.from}</h4>
											)}
											<div className='body'>
												<a
													href={message.url}
													rel='noopener noreferrer'
													target='_blank'
												>
													My current location
												</a>
											</div>
										</div>
										<span className='createdDate'>
											{message.createdDate}
										</span>
									</div>
								) : (
									<div>
										<div className='msg'>
											{message.from !== 'Admin' && (
												<h4>{message.from}</h4>
											)}
											<div className='body'>
												<p>{message.content?.text}</p>
											</div>
										</div>
										<span className='createdDate'>
											{message.createdDate}
										</span>
									</div>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
