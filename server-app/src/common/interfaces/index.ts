import { IUser } from './user.interface';

export interface IUsersService {
	getUserList: (room: string) => IUser[];
	addUser: (resource: any) => any;
	updateById: (id: string, resource: any) => IUser;
	getUser: (id: string) => IUser;
	removeUser: (id: string) => IUser;
	patchById: (id: string, resource: any) => IUser;
}
