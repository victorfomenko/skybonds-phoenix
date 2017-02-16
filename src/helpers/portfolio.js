export const isPortfolioScb = (user) => {
	const email = typeof user !== "undefined" && user !== null ? user.email : void 0;
	return checkEmailAccess(email)
}

const checkEmailAccess = (email) => {
	if(email !== null){
    	return email.indexOf('@sovcombank.ru') !== -1 || email.indexOf('@msk.sovcombank.ru') !== -1
	}
}