import loginHTML from './login.html';
import { renderComponent } from '../shared/utils';

renderComponent(loginHTML);

const loginForm = document.getElementById('login-form'),
	passwordElement = document.getElementById('password'),
	errorMessageElement = document.getElementById('password-error-message');


loginForm.addEventListener('submit', handleSubmit);
passwordElement.addEventListener('input', () => {
	errorMessageElement.innerHTML = '';
});

function handleSubmit(event) {
	event.preventDefault();

	const formData = new FormData(loginForm),
		usernameData = formData.get('username'),
		passwordData = formData.get('password');

	fetch('http://localhost:5000/api/login', {
		body: JSON.stringify({
			username: usernameData,
			password: passwordData
		}),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	}).then((response) => {
		if (response.ok) {
			window.location.href = '../index.html';
			window.sessionStorage.setItem('username', usernameData);
		} else {
			passwordElement.value = '';
			passwordElement.focus();
			errorMessageElement.innerHTML = 'Wrong username or password! </br> Please type in the correct data and try again.'
		}
	}).catch((error) => {
		console.log(error);
	});
};
