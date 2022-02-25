import express from 'express';
import http from 'http';
import { Socket } from 'socket.io';

const app = express();
const port = process.env.PORT || 3000;

app.set('port', port);

const server = http.createServer(app);

server.listen(port);

server.on('listening', () => {
	console.log(`Server is listening on port ${port}`);
});
