import io from 'socket.io-client';
import moment from 'moment';

const socket = io(
	process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'
);

export const socketService = {
	socket,

	connnect: () => {
		socket.on('connection', () => {
			console.log('Connected to server');
		});
	},

	leaveChannel: (channel: string) => {
		socket.emit('channel-leave', channel);
	},

	sendMessage: (message: any, callback: () => void) => {
		callback();
		socket.emit('message', message);
	},

	joinChannel: (channel_id: string, user: any) => {
		socket.emit('channel-join', {
			channel_id,
			user,
		});
	},

	onMessage: (message: any, callback: any) => {
		socket.on('newMessage', () => {
			var formattedTime = moment(message.createdDate).format('h:mm a');
			let newMsg = {
				text: message.text,
				from: message.from,
				room: message.room,
				createdDate: formattedTime,
			};
			callback(newMsg);
		});
	},
};
