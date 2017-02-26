import * as SpacesApi from '../clients/SpacesApi';
import SpaceCaster from '../casters/SpaceCaster';

export const getSpaces = () => {
	return SpacesApi.getList()
	.then(({ spaces }) => {
		const ids = spaces.map(item=>{ return item.id });
		return SpacesApi.getSpacesByIds(ids);
	})
	.catch(err => {
		console.warn(err);
	})
};

export const getMarketSpaces = () => {
	return getSpaces()
	.then(spaces => {
		const result = spaces.filter(item=>{return item.ui.type === 'market' })
		return Promise.resolve(result);
	})
};

export const getPortfolioSpaces = () => {
  return getSpaces()
  .then(spaces => {
    const result = spaces.filter(item=>{return item.ui.type === 'portfolio' })
    return Promise.resolve(result);
  })
};

export const add = (space) => {
	return SpacesApi.add(space)
};

const ensureReportsAreNotEmpty = ({ reportsIds, orderVersion }) => {
  if(reportsIds.length) { return { reportsIds, orderVersion } }

}

