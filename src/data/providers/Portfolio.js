import * as PortfolioApi from '../clients/PortfolioApi';


export const getIsinsByDate = async (date) => {
	const resp = await PortfolioApi.getQuantityByDate(date);
	return resp.map(item=> {
		return item.isin;
	})
};

export const getDailyData = async (isins, date, attrs) => {
  return PortfolioApi.getDailyData(isins, date, attrs);
};
