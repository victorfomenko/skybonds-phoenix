import * as SpacesApi from '../clients/SpacesApi';
import SpaceCaster from '../casters/SpaceCaster';


export const getList = () => {
  return SpacesApi.getList()
}

export const getSpacesByIds = (ids) => {
  if(!ids){console.warn('getSpacesByIds: ids is not defined.')}
  return SpacesApi.getSpacesByIds(ids)
}

export const getMarketSpacesByIds = (ids) => {
  if(!ids){console.warn('getMarketSpacesByIds: ids is not defined.')}
  return SpacesApi.getSpacesByIds(ids)
  .then(spaces => {
    const result = spaces.filter(item=>{return item.ui.type === 'market' })
    return Promise.resolve(result);
  });
}

export const getPortfolioSpacesByIds = (ids) => {
  if(!ids){console.warn('getPortfolioSpacesByIds: ids is not defined.')}
  return SpacesApi.getSpacesByIds(ids)
  .then(spaces => {
    const result = spaces.filter(item=>{return item.ui.type === 'portfolio' })
    return Promise.resolve(result);
  })
}

export const getSpaceById = (spaceId) => {
	return SpacesApi.getSpaceById(spaceId);
};

export const add = (report) => {
  const space = SpaceCaster.format(report);
	return SpacesApi.add(space);
};
