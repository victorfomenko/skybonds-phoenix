import { requestProvider, localStorageProvider } from '../helpers';
import { USER_DATA } from '../constants';


const API_V1 = '/api/v1/spaces';
const getUserId = () => {
	let user = localStorageProvider.load(USER_DATA);
	return typeof user === 'object' ? user.id : null;
}

export const getList = () => {
	const USER_ID = getUserId();
	if(!USER_ID) { return Promise.reject('spacesApi.getList: USER_ID is undefined.') }
	return requestProvider.get({
		url: `${API_V1}/${USER_ID}`
	});
};

export const getSpaceById = (spaceId) => {
	const USER_ID = getUserId();
	if(!USER_ID || !spaceId) { return Promise.reject('spacesApi.getSpaceById: USER_ID or spaceId is undefined.') }
	return requestProvider.get({
		url: `${API_V1}/${USER_ID}/${spaceId}`
	});
};

export const getSpacesByIds = (ids=[]) => {
	const USER_ID = getUserId();
	if(!USER_ID) { return Promise.reject('spacesApi.getSpacesByIds: USER_ID is undefined.') }
	return requestProvider.post({
		url: `${API_V1}/${USER_ID}`,
		body: ids
	});
};

export const add = (spaceId, space={}) => {
	const USER_ID = getUserId();
	if(!USER_ID) { return Promise.reject('spacesApi.add: USER_ID is undefined.') }
	if(!spaceId) { return Promise.reject('spacesApi.add: spaceId is undefined.') }
	return requestProvider.post({
		url: `${API_V1}/${USER_ID}/${spaceId}/add`,
		body: space
	});
};

export const remove = (spaceId) => {
	const USER_ID = getUserId();
	if(!USER_ID) { return Promise.reject('spacesApi.remove: USER_ID is undefined.') }
	if(!spaceId) { return Promise.reject('spacesApi.remove: spaceId is undefined.') }
	return requestProvider.post({
		url: `${API_V1}/${USER_ID}/${spaceId}/remove`
	});
};

export const update = (spaceId, space={}) => {
	const USER_ID = getUserId();
	if(!USER_ID) { return Promise.reject('spacesApi.update: USER_ID is undefined.') }
	if(!spaceId) { return Promise.reject('spacesApi.update: spaceId is undefined.') }
	return requestProvider.post({
		url: `${API_V1}/${USER_ID}/${spaceId}/update`,
		body: space
	});
};

export const order = (spaceId, order={}) => {
	const USER_ID = getUserId();
	if(!USER_ID) { return Promise.reject('spacesApi.order: USER_ID is undefined.') }
	if(!spaceId) { return Promise.reject('spacesApi.order: spaceId is undefined.') }
	return requestProvider.post({
		url: `${API_V1}/${USER_ID}/${spaceId}/order`,
		body: order
	});
};
