import * as PortfolioApi from '../clients/PortfolioApi';


export const getBondsInfo = async (date) => {
	const resp = await PortfolioApi.getQuantityByDate(date)
	return resp.map(item=> {
		return item.isin;
	})
};
