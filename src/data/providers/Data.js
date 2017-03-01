import * as DataApi from '../clients/DataApi';
import * as PortfolioProvider from '../providers/Portfolio';
import * as BondRatingHelper from '../../helpers/BondRating';
import FiltersCaster from '../casters/FiltersCaster';
import { keyBy, map, isArray, intersection } from 'lodash';


export const filtersApply = (filters, stats) => {
  let isPortfolio = false;
  filters.filters = FiltersCaster.format(filters.filters);

  filters.filters.forEach(filter=>{
    if(filter.name === 'portfolio') {
      isPortfolio = true;
    }
  });

  if(isArray(filters.filters) && filters.filters.length){
    filters.filters.push({
      name: 'actual',
      value: [true]
    });
  }

  let promises = [];
  if(filters.filters.length) {
    promises.push(DataApi.filtersApply(filters, stats))
  }
  if(isPortfolio){
    promises.push(PortfolioProvider.getIsinsByDate(filters.date))
  }

  return Promise.all(promises)
    .then((responses) => {
      let stats = [];
      responses = responses.map(resp=> {
        if(resp.result != null) {
          stats = FiltersCaster.cast(resp.stats) || [];
          return resp.result
        }
        return resp
      });
      const isins = intersection.apply(_, responses);
      return {
        result: isins,
        stats,
      };
    });
};

export const filtersStats = (filters, isins) => {
  filters.filters = FiltersCaster.format(filters.filters);
  // if(isArray(filters.filters) && filters.filters.length){
  //   filters.filters.push({
  //     name: 'actual',
  //     value: [true]
  //   });
  // }
  return DataApi.filtersStats(filters, isins).then((response)=>{
    return FiltersCaster.cast(response) || [];
  })
};

export const getBondsInfo = (isins, attrs) => {
  return DataApi.getBondsInfo(isins, attrs);
};

export const getBondsDaily = (isins, date, attrs) => {
  return DataApi.getBondsDaily(isins, date, attrs);
};

export const getBondsData = (isins, date, infoAttrs, dailyAttrs) => {
  return Promise.all([
    DataApi.getBondsInfo(isins, infoAttrs),
    DataApi.getBondsDaily(isins, date, dailyAttrs)
  ]).then((response)=>{
    let infoDataMap = keyBy(response[0], 'isin');
    let dailyDataMap = keyBy(response[1], 'isin');
    return isins.map((isin)=>{
      return {
        isin: isin,
        info: infoDataMap[isin].data || {},
        daily: dailyDataMap[isin].data || {}
      }
    });
  });
};

export const getLayerBondsData = async (isins, date) => {
  const INFO_ATTRS = ['issuerId', 'issuer', 'standardName', 'ratingGroup', 'ccy'];
  const DAILY_ATTRS = ['yield', 'duration'];
  let bondsData = await getBondsData(isins, date, INFO_ATTRS, DAILY_ATTRS);
  return bondsData;
};

export const getSearchBondsData = async (bonds, date) => {
  if(bonds.length == 0) {
    return bonds;
  }
  const isins = bonds.map((bond)=> { return bond.isin });
  const DAILY_ATTRS = ['yield', 'duration'];
  let dailyData = await DataApi.getBondsDaily(isins, date, DAILY_ATTRS);
  let dailyDataMap = keyBy(dailyData, 'isin');
  return bonds.map((bond)=>{
    return {
      isin: bond.isin,
      info: bond.info,
      daily: dailyDataMap[bond.isin].data || {}
    };
  });
};

export const getIssuersInfo = (ids, attrs) => {
  return DataApi.getIssuersInfo(ids, attrs);
};

export const getBondsSchedule = (isin) => {
  return DataApi.getBondsSchedule(isin);
};

export const getBondsSchedulePut = (isin) => {
  return DataApi.getBondsSchedulePut(isin);
};

export const getBondsScheduleCall = (isin) => {
  return DataApi.getBondsScheduleCall(isin);
};

export const getRatesByDate = (date) => {
  return DataApi.getRatesByDate(date);
};

export const getTimeSeries = (isin, dates) => {
  return DataApi.getTimeSeries(isin, dates);
};

export const getPeersData = (isins, date) => {
  const colorGenerator = d3.scale.category10();
  let promises = [
    DataApi.getBondsInfo(isins),
    DataApi.getBondsDaily(isins, date)
  ];

  return Promise.all(promises).then((response)=> {
     let peersBonds = [];
     //TODO: this needs to be refactored according to ES6
     for (let i = 0, len1 = response[0].length; i < len1; i++) {
         let itemInfo =  response[0][i];
         peersBonds.push({
           isin: itemInfo.isin,
           info: itemInfo.data,
           color: colorGenerator(itemInfo.isin)
         });

       for (let j = 0, len2 = response[1].length; j < len2; j++) {
         let itemDaily = response[1][i];
         if (itemDaily.isin == itemInfo.isin) {
           peersBonds[i]['daily'] = itemDaily.data;
         }
       }
     }
    return peersBonds;
  });
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
        'currency': [currency]
      }
    };

    promises.push(filtersApply(currencyFilters, false));

    let countryFilters = {
      date: date,
      filters: {
        'country': [country]
      }
    };

    promises.push(filtersApply(countryFilters, false));

    let ratingArray = BondRatingHelper.getCloseRatings(rating);
    let ratingNames = []
    for (let i = 0, len = ratingArray.length; i < len; i++) {
      let item = ratingArray[i];
      ratingNames.push(item)
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
        sector: [sector]
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
      isin: isin,
      'info': response[0][0].data,
      'daily': response[1][0].data,
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

export const getBenchmarkPeers = (isin, date, peersFilters, peersLimit = 20) => {

  let _preformParentBondData = function(isin, date) {
    return Promise.all([
      getBondsInfo([isin]),
      getBondsDaily([isin], date)
    ])
  };

  let _getBenchmarkPeersSlices = function(parentBond, date) {
    let bondTypes, country, currency, duration, durationDelta, durationFrom, durationTo, isConvertible, isFloater, isSubordinated, issuer, promises, rating, ref, sector, type, value;
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
        'currency': [currency]
      }
    };

    promises.push(filtersApply(currencyFilters, false));

    let countryFilters = {
      date: date,
      filters: {
        'country': [country]
      }
    };

    promises.push(filtersApply(countryFilters, false));

    let ratingArray = BondRatingHelper.getCloseRatings(rating);
    let ratingNames = []
    for (let i = 0, len = ratingArray.length; i < len; i++) {
      let item = ratingArray[i];
      ratingNames.push(item)
    }

    let ratingFilters = {
      date: date,
      filters: {
        'rating': ratingNames
      }
    };

    promises.push(filtersApply(ratingFilters, false));

    let sectorFilters = {
      date: date,
      filters: {
        sector: [sector]
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


  let _applyBenchmarkPeersSlices = function(parentBond, date, peersSlices, peersFilters, peersLimit) {
    let filtersResult, i, len, parentBondPos, peersOptionalSlices, peersResult, peersSlice, sliceIntersection;
    peersResult = peersSlices['type'];
    if (peersSlices['issuer'] != null) {
      peersResult = _.union(peersResult, peersSlices['issuer']);
    }
    peersResult = _.intersection(peersResult, peersSlices['maturityRange']);
    peersResult = _.intersection(peersResult, peersSlices['currency']);
    peersResult = _.intersection(peersResult, peersSlices['country']);
    peersResult = _.intersection(peersResult, peersSlices['ratingAdjacent']);
    peersResult = _.uniq(peersResult);
    parentBondPos = peersResult.indexOf(parentBond.isin);
    if (parentBondPos !== -1) {
      peersResult.splice(parentBondPos, 1);
    }
    sliceIntersection = _.intersection(peersResult, peersSlices['industrySimilar']);
    if (sliceIntersection.length > peersLimit) {
      peersResult = sliceIntersection;
    }
    return peersResult;
  };


  return _preformParentBondData(isin, date).then((response) => {
    let parentBond = {
      isin: isin,
      'info': response[0][0].data,
      'daily': response[1][0].data,
    };
    return _getBenchmarkPeersSlices(parentBond, date).then((response) => {
      let peersSlices = {
        type: response[0].result,
        maturityRange: response[1].result,
        currency: response[2].result,
        country: response[3].result,
        ratingAdjacent: response[4].result,
        industrySimilar: response[5].result
      };
      if (parentBond.info.isSubordinated) {
        peersSlices['issuer'] = response[6].industrySimilar
      }
      return _applyBenchmarkPeersSlices(parentBond, date, peersSlices, peersFilters, peersLimit)
    })
  });
};

export const getSummary = () => {
  return DataApi.getSummary()
}
