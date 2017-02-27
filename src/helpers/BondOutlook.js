export const getLabel = (outlook) => {
  if ( typeof outlook === 'string') {
    switch (outlook.toLowerCase()) {
      case 'positive':
      case 'pos':
        return 'Positive ↑';
      case 'negative':
      case 'neg':
        return 'Negative ↓';
      case 'stable':
      case 'sta':
        return 'Stable ≈';
      default:
        return 'NA outlook';
    }
  } else
  {
    return 'NA outlook';
  }
};
