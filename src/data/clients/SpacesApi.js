import { requestProvider, localStorageProvider } from '../helpers';
import { USER_DATA } from '../constants';

let user = localStorageProvider.load(USER_DATA);

const API_V1 = '/api/v1/spaces';
const USER_ID = typeof user === 'object' ? user.id : null;

export const getList = () => {
	if(!USER_ID) { return Promise.reject({}) }
	return requestProvider.get({
		url: `${API_V1}/${USER_ID}`
	});
};

export const getSpaceById = (spaceId) => {
	if(!USER_ID || !spaceId) { return Promise.reject({}) }
	return requestProvider.get({
		url: `${API_V1}/${USER_ID}/${spaceId}`
	});
};

export const getSpacesByIds = (ids=[]) => {
	if(!USER_ID) { return Promise.reject({}) }
	return requestProvider.post({
		url: `${API_V1}/${USER_ID}`,
		body: ids
	});
};

export const add = (spaceId, space={}) => {
	if(!USER_ID || !spaceId) { return Promise.reject({}) }
	return requestProvider.post({
		url: `${API_V1}/${USER_ID}/${spaceId}/add`,
		body: space
	});
};

export const remove = (spaceId) => {
	if(!USER_ID || !spaceId) { return Promise.reject({}) }
	return requestProvider.post({
		url: `${API_V1}/${USER_ID}/${spaceId}/remove`
	});
};

export const update = (spaceId, space={}) => {
	if(!USER_ID || !spaceId) { return Promise.reject({}) }
	return requestProvider.post({
		url: `${API_V1}/${USER_ID}/${spaceId}/update`,
		body: space
	});
};

export const order = (spaceId, order={}) => {
	if(!USER_ID || !spaceId) { return Promise.reject({}) }
	return requestProvider.post({
		url: `${API_V1}/${USER_ID}/${spaceId}/order`,
		body: order
	});
};
