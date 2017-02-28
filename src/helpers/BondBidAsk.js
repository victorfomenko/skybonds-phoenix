export const getQuotes = (collection = [], principal, currencyRate, type) => {
    let quotes = [];
    let quotesDays = {};

    let _getTimeByTimestamp = (timestamp) => {
      if (timestamp) {
        return timestamp.slice(-9, -4)
      }
    };
    for (let i = 0, len = collection.length; i < len; i++) {
      let quote = collection[i];

      if (!(quote.bid || quote.ask)) {
        continue;
      }
      let timestampDate = new Date(quote.timestamp);
      let quoteDay = timestampDate.toDateString().substring(8, 10) + ' ' + timestampDate.toDateString().substring(4, 7)

      if (!quotesDays[quoteDay]) {
        quotesDays[quoteDay] = true;
      } else {
        quoteDay = null;
      }
      quotes.push({
        name: quote.source,
        priceBid: quote.bid,
        yieldBid: quote.bidYield,
        sizeBid: type === 'short' && (quote.bidSize != null) ? quote.bidSize / 1000 : quote.bidSize,
        marketValueBid: quote.bidSize * principal * quote.bid * currencyRate || null,
        priceAsk: quote.ask,
        yieldAsk: quote.askYield,
        sizeAsk: type === 'short' && (quote.askSize != null) ? quote.askSize / 1000 : quote.askSize,
        marketValueAsk: quote.askSize * principal * quote.ask * currencyRate || null,
        priceSpread: quote.bidAskPriceSpread,
        yieldSpread: quote.bidAskYieldSpread,
        date: quote.timestamp,
        day: quoteDay,
        time: _getTimeByTimestamp(quote.timestamp)
      });
    }
    return quotes;
};

export const getMax = (collection) => {
  let max = null;
  for (let i = 0, len = collection.length; i < len; i++) {
    let quote = collection[i];
    if (quote.priceBid != null) {
      if ((max == null) || quote.priceBid > max) {
        max = quote.priceBid;
      }
    }
  }
  return max;
};

export const getMin = (collection) => {
  let min = null;
  for (let i = 0, len = collection.length; i < len; i++) {
    let quote = collection[i];
    if (quote.priceAsk != null) {
      if ((min == null) || quote.priceAsk < min) {
        min = quote.priceAsk;
      }
    }
  }
  return min;
};


export const getTotals = (collection) => {

  let _getWeightedAverage = (collection, field) => {
    let count, i, len, quote, sum;
    count = 0;
    sum = 0;
    for (i = 0, len = collection.length; i < len; i++) {
      quote = collection[i];
      if (!(quote[field] != null)) {
        continue;
      }
      sum += quote[field];
      count++;
    }
    return sum / count || null;
  };

  let _getSum = (collection, field) => {
    let i, len, quote, sum;
    sum = 0;
    for (i = 0, len = collection.length; i < len; i++) {
      quote = collection[i];
      if (quote[field] != null) {
        sum += quote[field];
      }
    }
    return sum || null;
  };

  return {
    priceBid: _getWeightedAverage(collection, 'priceBid'),
    priceAsk: _getWeightedAverage(collection, 'priceAsk'),
    priceSpread: _getWeightedAverage(collection, 'priceSpread'),
    yieldBid: _getWeightedAverage(collection, 'yieldBid'),
    yieldAsk: _getWeightedAverage(collection, 'yieldAsk'),
    yieldSpread: _getWeightedAverage(collection, 'yieldSpread'),
    sizeBid: _getSum(collection, 'sizeBid'),
    sizeAsk: _getSum(collection, 'sizeAsk'),
    marketValueBid: _getSum(collection, 'marketValueBid'),
    marketValueAsk: _getSum(collection, 'marketValueAsk')
  };
};

export const getTimestamp = (collection) => {
  let ref;
  if ((ref = collection[0]) != null ? ref.date : void 0) {
    let diffTime = new Date().getTime() - (new Date(collection[0].date)).getTime();

    let seconds=(diffTime/1000)%60;
    let minutes=(diffTime/(1000*60))%60;
    let hours=(diffTime/(1000*60*60))%24;

    let roundHours = Math.floor(hours)
    if ( 1 <= roundHours <= 2 ) {
      return roundHours + ' hour ago'
    }

    if (roundHours >= 2) {
      return roundHours + ' hours ago'
    }

    let roundMinutes = Math.floor(minutes)
    if ( 1 <= roundMinutes <= 2 ) {
      return roundMinutes + ' minute ago'
    }

    if (roundMinutes >= 2) {
      return roundMinutes + ' minutes ago'
    }

    let roundSeconds = Math.floor(seconds)
    if ( 1 <= roundSeconds <= 2 ) {
      return roundSeconds + ' second ago'
    }

    if (roundSeconds >= 2) {
      return roundSeconds + ' seconds ago'
    }



    return {
      'seconds': seconds,
      'minutes': minutes,
      'hours': hours
    }
  } else {
    return null;
  }
}
