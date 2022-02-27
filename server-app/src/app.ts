import express from 'express';
import * as http from 'http';
import cors from 'cors';
import 'dotenv/config';
import ChatSocket from './services/chat.service';
import { SocketConnection } from './common/utils/SocketConnection';
import IndexRouter from './routes/index.routes';
import ChatRouter from './routes/chat.routes';

const app: express.Application = express();
const server: http.Server = http.createServer(app);

const port = process.env.PORT || 8000;
app.set('port', port);

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

app.use(express.urlencoded({ extended: true }));

app.use('/', IndexRouter);
app.use('/chat', ChatRouter);

// 404
app.use('*', (req, res) => {
	return res.status(404).json({
		success: false,
		message: 'Endpoint does not exist',
	});
});

const socketio = SocketConnection.GetSocket(server);
// global.d.ts
declare global {
	var io: any;
}
// Create Socket Connection
global.io = socketio.listen(server);
global.io.on('connection', ChatSocket.connection);

server.listen(port);

server.on('listening', () => {
	console.log(`Server is listening on port ${port}`);
});
