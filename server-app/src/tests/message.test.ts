import Message from '../services/message.service';

describe('sendMessage', () => {
	it('Should generate correct message object', () => {
		const from = 'John';
		const room = 'Node JS';
		const content = { text: 'Some msg' };
		const message = new Message({ from, room, content }).sendMessage();

		expect(typeof message.createdDate).toBe('number');
		expect(message).toMatchObject({ from, content });
	});
});

describe('sendUrlMessage', () => {
	it('Should generate correct url message object', () => {
		const from = 'Jen';
		const room = 'Node JS';

		const lat = '-33.8670522';
		const lon = '151.1957362';
		const message = new Message({
			from,
			room,
			content: { url: `https://www.google.com/maps?q=${lat},${lon}` },
		}).sendMessage();

		expect(typeof message.createdDate).toBe('number');
		expect(message).toMatchObject({
			from,
			content: { url: `https://www.google.com/maps?q=${lat},${lon}` },
		});
	});
});
