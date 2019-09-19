import { ToastAlert } from './ToastAlert.js';

const buttonsList = document.getElementsByName("toast-button");
const input = document.getElementById('input-message');

const Toaster = new ToastAlert();

buttonsList.forEach(button => {
	button.addEventListener('click', (event) => {
		Toaster.displayToast(input.value, event.target.dataset.type);
	});
})