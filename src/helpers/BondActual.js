const ACTUAL_BONDS_STATUSES = ['outstanding', 'being placed', 'suspended'];

export const isBondActual = (bondData, date) => {
  let now = date.getTime();

  if(bondData.maturityDate != null && bondData.maturityDate.getTime() < now) {
    return false;
  }

  if(bondData.finalDate != null && bondData.finalDate.getTime() < now) {
    return false;
  }

  if(bondData.issueDate != null && bondData.issueDate.getTime() < now) {
    return true;
  }

  if(bondData.status != null && ACTUAL_BONDS_STATUSES.indexOf(bondData.status) != -1) {
    return true;
  }

  return false;
};
