import express from 'express';
import { CommonRoutesConfig } from '../common/common.routes.config';

class IndexRouter extends CommonRoutesConfig {
	constructor(app: express.Application) {
		super(app, 'indexRouter');
	}

	configureRoutes() {
		this.router.get('/', (req, res) => {
			return res.status(200).json({
				success: true,
				message: 'Welcome to the API',
			});
		});

		return this.router;
	}
}

export default new IndexRouter(express()).configureRoutes();
