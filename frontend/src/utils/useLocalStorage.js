export const setToken = (token) => {
	localStorage.setItem("token", token);
};

export const getToken = (storage) => localStorage.getItem(storage);
