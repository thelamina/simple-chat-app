import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';
import { DEFAULT_CHANNELS } from '../common/constants';

class ChatRouter extends CommonRoutesConfig {
	constructor(app: express.Application) {
		super(app, 'ChatRouter');
	}

	configureRoutes() {
		this.router.get('/', (req, res) => {
			return res.status(200).json({
				success: true,
				message: 'Welcome to the Chat API',
			});
		});

		this.router.get('/channels', (req, res) => {
			return res.status(200).json({
				success: true,
				data: DEFAULT_CHANNELS,
				message: 'Default channels fetched successfully',
			});
		});

		this.router.get('/channels/:channel_id', (req, res) => {
			const channel_id = req.params.channel_id;
			const channel = DEFAULT_CHANNELS.find(
				(channel) => channel.id === channel_id
			);
			if (channel) {
				return res.status(200).json({
					success: true,
					data: channel,
					message: 'Channel fetched successfully',
				});
			}
			return res.status(404).json({
				success: false,
				message: 'Channel not found',
			});
		});
		return this.router;
	}
}

export default new ChatRouter(express()).configureRoutes();
