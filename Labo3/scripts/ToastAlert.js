export class ToastAlert {
	constructor() {
		this.toastList = document.createElement('div');
		this.toastList.className = 'toaster-list';
		this.removeTime = 2000;

		document.body.appendChild(this.toastList);
	}

	displayToast = (text, type) => {
		const toast = document.createElement('div');
		toast.className = `toast-${type.toLowerCase()}`;
		toast.textContent = text;

		this.toastList.appendChild(toast);

		setTimeout(() => toast.remove(), this.removeTime);
	}
}