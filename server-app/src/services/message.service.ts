import moment from 'moment';

class Message {
	from: string;
	room: string;
	content: { text?: string; url?: string };
	createdDate: number;
	constructor({
		from,
		room,
		content,
	}: {
		from: string;
		room: string;
		content: { text?: string; url?: string };
	}) {
		this.from = from;
		this.room = room;
		this.content = content;
		this.createdDate = moment().valueOf();
	}

	getFrom(): string {
		return this.from;
	}

	getRoom(): string {
		return this.room;
	}

	getContent(): { text?: string; url?: string } {
		return this.content;
	}

	getCreatedDate(): number {
		return this.createdDate;
	}

	getCreatedDateFormatted(): string {
		return moment(this.createdDate).format('h:mm a');
	}

	sendMessage(): any {
		return {
			from: this.from,
			room: this.room,
			content: this.content,
			createdDate: moment(this.createdDate).format('h:mm a'),
		};
	}
}

export default Message;
