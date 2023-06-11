
export const callAPI = async (url, method = 'GET', body = null) => {
	const API_URL = 'http://localhost:5000/api/';
	const response = await fetch(`${API_URL}${url}`, {
		method,
		body: body === null ? null : JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await response.json();

	return data;
};
