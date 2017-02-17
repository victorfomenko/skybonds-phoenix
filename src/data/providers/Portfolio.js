import * as PortfolioApi from '../clients/PortfolioApi';


export const getBondsInfo = (date) => {
	return PortfolioApi.getQuantityByDate(date);
};
