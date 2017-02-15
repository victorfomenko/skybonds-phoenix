const ACTUAL_BONDS_STATUSES = ["outstanding", "being placed", "suspended"];

const isBondActual = (bondInfo, date) => {
  now = date.getTime();

  if(bondInfo.maturityDate != null && bondInfo.maturityDate.getTime() < now) {
    return false;
  }

  if(bondInfo.finalDate != null && bondInfo.finalDate.getTime() < now) {
    return false;
  }

  if(bondInfo.issueDate != null && bondInfo.issueDate.getTime() < now) {
    return true;
  }

  if(bondInfo.status != null && ACTUAL_BONDS_STATUSES.indexOf(bondInfo.status) != -1) {
    return true;
  }

  return false;
};
