import { expect } from 'chai';
import { filtersApply } from '../src/data/clients/DataApi';


describe('DataApi', function () {
  it('filtersApply must have answer', async ()  =>{
  	const filters = {
  		filters: [
  			{"name":"corporations","value":[true]},
  			{"name":"actual","value":[true]}
  		],
  		date: "20161226"
  	}
  	const data = await filtersApply(filters)
  	console.log(data)
    //expect(wrapper.hasClass('uiFilters')).to.equal(true);
  });
});
