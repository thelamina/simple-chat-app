import { v4 as uuidv4 } from 'uuid';

type Channel = {
	id: string;
	participants: any[];
	sockets: any[];
	description: string;
	name: string;
};

export const DEFAULT_CHANNELS: Array<Channel> = [
	{
		name: 'Engineering',
		participants: [],
		id: uuidv4(),
		sockets: [],
		description: 'This is the engineering channel',
	},
	{
		name: 'General',
		participants: [],
		id: uuidv4(),
		sockets: [],
		description: 'This is the general channel',
	},
	{
		name: 'Random',
		participants: [],
		id: uuidv4(),
		sockets: [],
		description: 'This is the funny channel',
	},
];
