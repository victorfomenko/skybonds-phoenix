import SpaceCaster from '../casters/SpaceCaster';
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
	return Promise.resolve({"spaces":[{"id":"1096","version":23},{"id":"1111","version":10}],"orderVersion":1953})
	return requestProvider.get({
		url: `${API_V1}/${USER_ID}`
	});
};

export const getSpaceById = (spaceId) => {
	const USER_ID = getUserId();
	if(!USER_ID || !spaceId) { return Promise.reject('spacesApi.getSpaceById: USER_ID or spaceId is undefined.') }
	return requestProvider.get({
		url: `${API_V1}/${USER_ID}/${spaceId}`
	})
	// .then(space => {
	// 	return Promise.resolve(SpaceCaster.cast(space))
	// });
};

export const getSpacesByIds = (ids=[]) => {
	const USER_ID = getUserId();
	if(!USER_ID) { return Promise.reject('spacesApi.getSpacesByIds: USER_ID is undefined.') }
	return Promise.resolve([
		{"id":"1096","version":23,"source":{"layers":[{"id":1,"method":"set","functions":[]}],"include":null,"exclude":null},"ui":{"type":"portfolio","spaceName":"Portfolio report","extensions":{"web":{"viewMode":"bonds","filters":[{"name":"currency","value":"RUB"},{"name":"industry","value":["Banks"]}],"calendar":{"date":"20170207"}},"mobile":null}},"addons":null},
		{"id":"1111","version":10,"source":{"layers":[{"id":0,"method":"set","functions":[{"name":"filters","args":{"filters":[{"name":"industry","value":["Banks"]},{"name":"country","value":["USA"]},{"name":"portfolio","value":["portfolio"]},{"name":"corporations","value":["corporations"]},{"name":"duration","value":["-Infinity","5"]}],"date":"20170218"}},{"name":"peersFor","args":[]},{"name":"include","args":[]},{"name":"exclude","args":[]}]}],"include":[],"exclude":[]},"ui":{"type":"market","spaceName":"New report","viewMode":"scatterPlot","viewModeSettings":{"scatterPlot":{"axes":{"x":"duration","y":"yield"},"zoom":{"x":0.5,"y":0.5,"scale":1},"showOutOfRange":true},"timeSeries":{"axes":{"y":"totalReturn"}},"table":null},"extensions":{"web":{"layers":[{"id":0,"name":"","viewMode":"bonds"}],"calendar":{"labels":{"now":true,"past":null,"future":null},"dates":["20170218"]},"activeLayerId":"0"},"mobile":null}},"addons":null}
		])
	return requestProvider.post({
		url: `${API_V1}/${USER_ID}`,
		body: ids
	})
	// .then(spaces => {
	// 	const result = spaces.map(item=>{ return SpaceCaster.cast(item) })
	// 	return Promise.resolve(result)
	// });
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
