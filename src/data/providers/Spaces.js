import * as SpacesApi from '../clients/SpacesApi';
import SpaceCaster from '../casters/SpaceCaster';

export const getSpaces = () => {
	return SpacesApi.getList()
	.then(({ spaces }) => {
		const ids = spaces.map(item=>{ return item.id });
		return SpacesApi.getSpacesByIds(ids);
	})
	.then(spaces => {
		const result = spaces.map(item=>{return SpaceCaster.cast(item);})
		return Promise.resolve(result);
	})
	.catch(error => {
		console.warn(error);
	})
};