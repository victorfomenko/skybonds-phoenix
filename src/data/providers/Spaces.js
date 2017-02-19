import * as SpacesApi from '../clients/SpacesApi';
import SpacesCaster from '../casters/SpacesCaster';

export const getSpaces = () => {
	return SpacesApi.getList()
	.then(({ spaces }) => {
		const ids = spaces.map(item=>{ return item.id });
		return SpacesApi.getSpacesByIds(ids);
	})
	.then(spaces => {
		const result = SpacesCaster.cast(spaces);
		return Promise.resolve(result);
	})
	.catch(err => {
		console.warn(err);
	})
};
