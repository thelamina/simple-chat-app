import Message from '../services/message.service';
import { DEFAULT_CHANNELS } from '../common/constants';

class WebSockets {
	// users = [];
	connection(client: any) {
		client.emit('connection', {
			message: 'Welcome to the chat app.',
		});

		client.on('channel-leave', (channel: string) => {
			client.leave(channel);
		});

		client.on(
			'channel-join',
			({ channel_id, user }: any, callback: any) => {
				DEFAULT_CHANNELS.forEach(function (channel) {
					console.log(user.name + ' joined channel: ' + channel.name);
					if (channel.id === channel_id) {
						client.join(channel_id);

						channel.participants.push({ ...user, id: client.id });
						channel.sockets.push(client.id);

						client
							.to(channel.id)
							.emit('getRoomUsers', channel.participants);

						client.emit(
							'welcomeMessage',
							new Message({
								from: 'Admin',
								room: channel.id,
								content: {
									text: `Hi ${user.name} Welcome to the chat app.`,
								},
							}).sendMessage()
						);

						client.to(channel.id).emit(
							'welcomeMessage',
							new Message({
								from: 'Admin',
								room: channel.id,
								content: {
									text: `${user.name} has joined ${channel.name}`,
								},
							}).sendMessage()
						);
						callback;
					}
				});

				return channel_id;
			}
		);

		client.on('send-message', ({ channel, message }: any): void => {
			client.to(channel).emit(
				'recieve-message',
				new Message({
					from: message?.from,
					room: channel,
					content: message?.content,
				}).sendMessage()
			);
		});

		client.on('disconnect', () => {
			DEFAULT_CHANNELS.forEach((channel) => {
				let index = channel.sockets.indexOf(client.id);
				if (index != -1) {
					channel.sockets.splice(index, 1);
					const user = channel.participants.find(
						(user) => user.id === client.id
					);
					const newchannel = channel.participants.filter(
						(u) => u.id !== user.id
					);
					channel.participants = newchannel;

					client
						.to(channel.id)
						.emit('getRoomUsers', channel.participants);

					client.to(channel.id).emit(
						'welcomeMessage',
						new Message({
							from: 'Admin',
							room: channel.id,
							content: {
								text: `${user.name} has left ${channel.name}`,
							},
						}).sendMessage()
					);
				}
			});
		});
	}
}

export default new WebSockets();
