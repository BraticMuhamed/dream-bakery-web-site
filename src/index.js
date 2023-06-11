import './index.scss';

if (sessionStorage.length === 0) {
	import('./login/login');
} else {
	import('./home/home');
}
