import { Server } from 'socket.io';

export class SocketConnection {
	private static instance: SocketConnection;
	server: any;

	private constructor(server: any) {
		this.server = server;
	}
	public static GetSocket(server: any) {
		const io = new Server(server, {
			cors: {
				origin: ['http://localhost:3000', process.env.CLIENT_URL || ''],
				methods: ['GET', 'POST'],
				allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
				credentials: true,
			},
		});
		io.on('connection', (socket) => {
			console.log('conncted SocketConnection sockets');
			socket.emit('jobResult', { result: 'emitting startup!' });
		});
		return io;
	}
}
