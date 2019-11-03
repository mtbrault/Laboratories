<template>
	<div>
		<div class="header">
			<h1>My todo list</h1>
			<button class="btn btn-primary" id="refreshToken" v-on:click="initToken">Reinitialiser token</button>
		</div>
		<div class="input-group mb-3 adding">
			<input v-model="taskName" id="taskName" type="text" class="form-control" placeholder="Nom de la tâche" aria-label="Recipient's username" aria-describedby="basic-addon2">
			<div class="input-group-append">
				<button v-on:click="addTask" id="buttonAdd" class="btn btn-outline-secondary" type="button">Ajouter</button>
			</div>
		</div>
		<div class="container">
			<div class="list">
				<table class="table">
					<thead class="thead-dark" style="text-align: center;">
						<tr>
							<th colspan="3">À faire</th>
						</tr>
					</thead>
					<tbody id="todo">
						<tr v-for="(task, id) in taskList" v-bind:key="id">
							<td><input type="text" class="form-control" :value="task.name" :ref="task.id" /></td>
							<td class="update"><button type="button" class="btn btn-info" v-on:click="updateTask(task.id)">Modifier</button></td>
							<td class="delete"><button type="button" class="btn btn-danger" v-on:click="deleteTask(task.id)">Supprimer</button></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script>

import axios from 'axios';

export default {
	data() {
		return {
			url: 'https://glo3102lab4.herokuapp.com',
			token: '',
			taskName: '',
			taskList: []
		};
	},
	mounted: async function() {
		const token = await localStorage.getItem('token');
		if (token) {
			this.token = token;
			this.loadTask();
		} else {
			this.initToken();
		}
	},
	methods: {
		initToken: async function() {
			const response = await axios.post(this.url + '/users');
			if (response.data) {
				this.token = response.data.id;
				localStorage.setItem('token', this.token);
			} else {
				alert("Impossible to get a token");
			}
			this.loadTask();
		},
		addTask: async function() {
			if (this.taskName === '') {
				alert("Task need at least 1 character");
				return ;
			}
			await axios.post(this.url + '/' + this.token + '/tasks', {
				name: this.taskName,
			}, {
				headers: {
					'Content-Type': 'application/json',
				}
			});
			this.loadTask();
		},
		deleteTask: async function(id) {
			await axios.delete(this.url + '/' + this.token + '/tasks/' + id);
			this.loadTask();
		},
		updateTask: async function(id) {
			const value = this.$refs[id][0].value;
			if (value === "") {
				alert("Task need at least 1 character");
				return ;
			}
			await axios.put(this.url + '/' + this.token + '/tasks/' + id, {
				name: value,
			}, {
				headers: {
					'Content-Type': 'application/json',
				}
			});
			this.loadTask();
		},
		loadTask: async function() {
			const response = await axios.get(this.url + '/' + this.token + '/tasks');
			this.taskList = response.data.tasks;
		}
	}
}
</script>

<style scoped>
.header {
    text-align: center;
    margin-bottom: 5%;
    margin-top: 5%;
}

.container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin-top: 5%;
}

.list {
    width: 40%;
}

.adding {
    margin-left: 35%;
    width: 30%;
}

.delete {
    width: 10%;
}
</style>