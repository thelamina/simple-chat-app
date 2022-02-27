import express from 'express';

export abstract class CommonRoutesConfig {
	app: express.Application;
    router: express.Router;
	name: string;

	constructor(app: express.Application, name: string) {
		this.app = app;
		this.name = name;
        this.router = express.Router();
		this.configureRoutes();
	}
	getName() {
		return this.name;
	}
	abstract configureRoutes(): express.Router;
}
