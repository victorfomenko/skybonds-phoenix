import * as DataApi from '../clients/DataApi';
import * as PortfolioProvider from '../providers/Portfolio';
import * as BondRatingHelper from '../../helpers/BondRating';
import FiltersCaster from '../casters/FiltersCaster';
import _ from 'lodash';


export const filtersApply = (filters, stats, details) => {
	let isPortfolio = false;
	filters.filters = FiltersCaster.format(filters.filters);

	filters.filters.forEach(filter=>{
		if(filter.name === 'portfolio') {
			isPortfolio = true;
		}
	});

	if(_.isArray(filters.filters) && filters.filters.length){
		filters.filters.push({
			name: 'actual',
			value: [true]
		});
	}

	let promises = [];
	if(filters.filters.length) {
		promises.push(DataApi.filtersApply(filters, stats, details))
	}
	if(isPortfolio){
		promises.push(PortfolioProvider.getIsinsByDate(filters.date))
	}

	return Promise.all(promises)
	.then((responses) => {
		let details = []
        let stats = []
        responses = responses.map(resp=> {
        	if(resp.result != null) {
        		details = resp.details || []
        		stats = FiltersCaster.cast(resp.stats) || []
        		return resp.result
        	}
        	return resp
        })
		const isins = _.intersection.apply(_, responses);
		return {
			result: isins,
			details,
			stats,
		};
	});
};


export const getBondsInfo = (isins, attrs) => {
	return DataApi.getBondsInfo(isins, attrs);
};

export const getBondsDaily = (isins, date, attrs) => {
	return DataApi.getBondsDaily(isins, date, attrs);
};

export const getIssuersInfo = (ids, attrs) => {
  return DataApi.getIssuersInfo(ids, attrs);
};

export const getRepayment = (isin) => {
  return DataApi.getRepayment(isin);
};

export const getPutDates = (isin) => {
  return DataApi.getPutDates(isin);
};

export const getCallDates = (isin) => {
  return DataApi.getCallDates(isin);
};

export const getRates = (isin) => {
  return DataApi.getCallDates(isin);
};


export const getPeers = (isin, date, peersFilters, peersLimit = 20) => {

  let _preformParentBondData = function(isin, date) {
    return Promise.all([
      getBondsInfo([isin]),
      getBondsDaily([isin], date)
    ])
  };

  let _getPeersSlices = function(parentBond, date, durationFactor) {
    let bondTypes, country, currency, duration, durationDelta, durationFrom, durationTo, isConvertible, isFloater, isSubordinated, issuer, promises, rating, ref, sector, type, value;
    if (durationFactor == null) {
      durationFactor = .15;
    }
    isFloater = parentBond["info"].isFloater;
    isConvertible = parentBond["info"].isConvertible;
    isSubordinated = parentBond["info"].isSubordinated;
    bondTypes = !isFloater && !isConvertible && !isSubordinated ? {
      "Regular": true
    } : isFloater ? {
      "Floaters": true
    } : isConvertible && !isFloater && !isSubordinated ? {
      "Convertibles": true,
      "Regular": true
    } : isSubordinated ? {
      "Subord": true
    } : void 0;
    currency = parentBond["info"].ccy;
    country = parentBond["info"].country;
    rating = parentBond["info"].ratingGroup;
    duration = ((ref = parentBond.daily) != null ? ref.duration : void 0) || 0;
    durationDelta = duration * durationFactor;
    durationFrom = duration - durationDelta >= 0 ? duration - durationDelta : 0;
    durationTo = duration + durationDelta;
    sector = parentBond["info"].sector;
    issuer = parentBond["info"].issuerId;
    promises = [];
    for (type in bondTypes) {
      value = bondTypes[type];
      let typeFilters = {
        date: date,
        filters: {}
      };
      typeFilters.filters[ 'type' ] = [] ;
      typeFilters.filters[ 'type' ].push({
        name: type.toLowerCase()
      });

      promises.push(filtersApply(typeFilters, false));
    }

    let maturityFilters = {
      date: date,
      filters: {
        'maturity': [ 0, Infinity ]
      }
    };

    promises.push(filtersApply(maturityFilters, false));

    let currencyFilters = {
      date: date,
      filters: {
        'currency': [{
          name: currency
        }]
      }
    };

    promises.push(filtersApply(currencyFilters, false));

    let countryFilters = {
      date: date,
      filters: {
        'country': [{
          name: country
        }]
      }
    };

    promises.push(filtersApply(countryFilters, false));

    let ratingArray = BondRatingHelper.getCloseRatings(rating);
    let ratingNames = []
    for (let i = 0, len = ratingArray.length; i < len; i++) {
      let item = ratingArray[i];
      ratingNames.push({
        name: item
      })
    }

    let ratingFilters = {
      date: date,
      filters: {
        'rating': ratingNames
      }
    };

    promises.push(filtersApply(ratingFilters, false));

    let durationFilters = {
      date: date,
      filters: {
        duration: [durationFrom, durationTo]
      }
    };

    promises.push(filtersApply(durationFilters, false));

    let sectorFilters = {
      date: date,
      filters: {
        sector: [{
          name: sector
        }]
      }
    };

    promises.push(filtersApply(sectorFilters, false));

    if (isSubordinated) {

      let issuerFilters = {
        date: date,
        filters: {
          issuer: [{
            name: issuer
          }]
        }
      };

      promises.push(filtersApply(issuerFilters, false));
    }
    return Promise.all(promises);
  };


  let _applyPeersSlices = function(parentBond, date, peersSlices, peersFilters, peersLimit) {
    let filtersResult, i, len, parentBondPos, peersOptionalSlices, peersResult, peersSlice, sliceIntersection;
    peersResult = peersSlices['type'];
    if (peersSlices['issuer'] != null) {
      peersResult = _.union(peersResult, peersSlices['issuer']);
    }
    peersResult = _.intersection(peersResult, peersSlices['maturityRange']);
    peersResult = _.intersection(peersResult, peersSlices['currency']);
    peersResult = _.uniq(peersResult);
    parentBondPos = peersResult.indexOf(parentBond.isin);
    if (parentBondPos !== -1) {
      peersResult.splice(parentBondPos, 1);
    }
    filtersResult = {};
    if (peersResult.length > peersLimit) {
      peersOptionalSlices = [
        {
          key: 'country',
          isins: peersSlices['country']
        }, {
          key: 'ratingAdjacent',
          isins: peersSlices['ratingAdjacent']
        }, {
          key: 'durationRange',
          isins: peersSlices['durationRange']
        }, {
          key: 'industrySimilar',
          isins: peersSlices['industrySimilar']
        }
      ];
      for (i = 0, len = peersOptionalSlices.length; i < len; i++) {
        peersSlice = peersOptionalSlices[i];
        if (peersFilters == null) {
          sliceIntersection = _.intersection(peersResult, peersSlice.isins);
          if (sliceIntersection.length > peersLimit) {
            peersResult = sliceIntersection;
            filtersResult[peersSlice.key] = true;
          } else {
            break;
          }
        } else {
          if (peersFilters.indexOf(peersSlice.key) === -1) {
            continue;
          }
          peersResult = _.intersection(peersResult, peersSlice.isins);
          if (peersResult.length > peersLimit) {
            filtersResult[peersSlice.key] = true;
          }
        }
      }
    }
    return getBondsDaily(peersResult, date, ['duration']).then(function(bonds) {
      var parentBondDuration, ref;

      parentBondDuration = ((ref = parentBond.daily) != null ? ref.duration : void 0) || 0;
      bonds.sort(function(a, b) {
        var durationDeltaA, durationDeltaB, ref1, ref2;
        durationDeltaA = Math.abs(parentBondDuration - (((ref1 = a.data) != null ? ref1.duration : void 0) || 0));
        durationDeltaB = Math.abs(parentBondDuration - (((ref2 = b.data) != null ? ref2.duration : void 0) || 0));
        return durationDeltaA - durationDeltaB;
      });
      return {
        peers: bonds.map(function(bond) {
          return bond.isin;
        }),
        filters: Object.keys(filtersResult)
      };
    });
  };


  return _preformParentBondData(isin, date).then((response) => {
    let parentBond = {
      'info': response[0][0].data,
      'daily': response[1][0].data
    };
    return _getPeersSlices(parentBond, date).then((response) => {
      let peersSlices = {
        type: response[0].result,
        maturityRange: response[1].result,
        currency: response[2].result,
        country: response[3].result,
        ratingAdjacent: response[4].result,
        durationRange: response[5].result,
        industrySimilar: response[6].result
      };
      if (parentBond.info.isSubordinated) {
        peersSlices['issuer'] = response[7].industrySimilar
      }
      return _applyPeersSlices(parentBond, date, peersSlices, peersFilters, peersLimit)
    })
  });

};
