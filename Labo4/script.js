window.onload = function() {
	var listToDo = document.getElementById("todo");
	const Manager = new ApiManager(this.localStorage.getItem("userId"), listToDo, 'https://glo3102lab4.herokuapp.com');
	const addButton = document.getElementById("buttonAdd");
	const input = document.getElementById("taskName");
	const refresh = document.getElementById("refreshToken");

	addButton.addEventListener('click', () => {
		Manager.addTask(input.value);
	});
	refresh.addEventListener('click', () => {
		Manager.initToken();
	})
}

class ApiManager {

	constructor(token, table, url) {
		this.table = table;
		this.url = url;
		if (token === null)
			this.initToken();
		else {
			this.userId = token;
			this.loadTask();
		}
	}

	async initToken() {
		const response = await axios.post(this.url + '/users');
		this.userId = response.data.id;
		localStorage.setItem("userId", this.userId);
		this.loadTask();
	}

	async addTask(value) {
		if (value === "") {
			alert("Veuillez nommer votre tâche");
			return ;
		}
		await axios.post(this.url + '/' + this.userId + '/tasks', {
			name: value,
		}, {
			  headers: {
				'Content-Type': 'application/json',
			  }
		});
		this.loadTask();
	}

	async loadTask() {
		this.table.innerHTML = "";
		await axios.get(this.url + '/' + this.userId + '/tasks')
		.then(response => {
			response.data.tasks.forEach((value, index) => {
				//Ajouter la tâche dans le HTML avec un bouton Supprimer et un bouton Edit
				//Link l'event onclick sur Supprimer qui appelle this.deleteTask(id);
				//Link l'event onclick sur Modifier qui appelle this.updateTask(id, value);
			});
		})
		.catch(err => {
			this.initToken();
		});
	}

	async deleteTask(id) {
		await axios.delete(this.url + '/' + this.userId + '/tasks/' + id);
		this.loadTask();
	}

	async updateTask(id, value) {
		await axios.put(this.url + '/' + this.userId + '/tasks/' + id, {
			name: value,
		}, {
			  headers: {
				'Content-Type': 'application/json',
			  }
		});
		this.loadTask();
	}

}