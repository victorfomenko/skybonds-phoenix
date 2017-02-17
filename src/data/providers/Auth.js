import * as UserApi from '../clients/UserApi';
import { localStorageProvider } from '../helpers';
import { ACCESS_TOKEN, USER_DATA } from '../constants';


export const login = (email, password) => {
	return UserApi.auth(email, password)
	.then(resp => {
		if(!!resp.error) return Promise.reject(resp);
		localStorageProvider.save(ACCESS_TOKEN, resp.token);
		return UserApi.current();
	})
	.then(resp => {
		if(!!resp.error) return Promise.reject(resp);
		localStorageProvider.save(USER_DATA, resp);
		return {
			...resp,
			token: localStorageProvider.load(ACCESS_TOKEN)
		};
	})
	.catch(error => {
		localStorageProvider.remove(ACCESS_TOKEN);
		localStorageProvider.remove(USER_DATA);
		return Promise.reject(error);
	});
};

export const loginWithToken = async () => {
	return UserApi.current()
	.then(resp => {
		if(!!resp.error) return Promise.reject(resp);
		localStorageProvider.save(USER_DATA, resp);
		return {
			...resp,
			token: localStorageProvider.load(ACCESS_TOKEN)
		};
	})
  	.catch(error => {
		localStorageProvider.remove(ACCESS_TOKEN);
		localStorageProvider.remove(USER_DATA);
		return Promise.reject(error);
	});
};

export const logout = () => {
	return UserApi.logout()
	.then(resp => {
		if(resp.status) {
			localStorageProvider.remove(ACCESS_TOKEN);
			localStorageProvider.remove(USER_DATA);
		}
		return resp;
	}).catch(error => {
		return Promise.reject(error);
	});
};
