const TOKEN_KEY = 'Authorization';
const REFRESH_TOKEN_KEY = 'Refresh';
const EXPIRE_TIME = 'Expire';

const TokenService = {
	saveToken(axiosInstance, token) {
		localStorage.setItem(TOKEN_KEY, token);
		axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
	},
	getToken() {
		return localStorage.getItem(TOKEN_KEY);
	},
	removeToken(axiosInstance) {
		localStorage.removeItem(TOKEN_KEY);
		delete axiosInstance.defaults.headers.common.Authorization;
	},
	
	saveRefreshToken(token) {
		localStorage.setItem(REFRESH_TOKEN_KEY, token);
	},
	getRefreshToken() {
		return localStorage.getItem(REFRESH_TOKEN_KEY);
	},
	removeRefreshToken() {
		localStorage.removeItem(REFRESH_TOKEN_KEY);
	},
	
	saveExpireTime(time) {
		localStorage.setItem(EXPIRE_TIME, time);
	},
	getExpireTime() {
		return parseInt(localStorage.getItem(EXPIRE_TIME));
	},
	removeExpireTime() {
		localStorage.removeItem(EXPIRE_TIME);
	},
	
	
	removeAll(axiosInstance) {
		localStorage.removeItem(TOKEN_KEY);
		delete axiosInstance.defaults.headers.common.Authorization;
		
		localStorage.removeItem(REFRESH_TOKEN_KEY);
		localStorage.removeItem(EXPIRE_TIME);
	},
};

export default TokenService;