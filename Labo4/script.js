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

    initToken = async() => {
        try {
            const response = await axios.post(this.url + '/users');
            this.userId = response.data.id;
            localStorage.setItem("userId", this.userId);
        } catch (e) {
            alert("Cannot init token");
        }
        this.loadTask();
    }

    addTask = async(value) => {
        if (value === "") {
            alert("Please task need at least 1 character");
            return ;
        }
        try {
            await axios.post(this.url + '/' + this.userId + '/tasks', {
                name: value,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        } catch (e) {
            alert("Cannot add task");
        }
        this.loadTask();
    }

    deleteTask = async(id) => {
        try {
            await axios.delete(this.url + '/' + this.userId + '/tasks/' + id);
        } catch (e) {
            alert("Cannot delete this task")
        }
        this.loadTask();
    }

    updateTask = async(id) => {
        const value = document.getElementById('input-' + id).value;
        if (value === "") { 
            alert("Task need at least 1 character");
            return ;
        }
        await axios.put(this.url + '/' + this.userId + '/tasks/' + id, {
            name: value,
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        this.loadTask();
    }

    loadTask = async()  => {
        try {
            this.table.innerHTML = "";
            const { data: { tasks } } = await axios.get(this.url + '/' + this.userId + '/tasks')
            for (var x = 0; x < tasks.length; x++)
                this.table.innerHTML += "<tr><td><input type=\"text\" id=\"input-" + tasks[x].id + "\" class=\"form-control\" value=\"" + tasks[x].name + "\" /></td><td class=\"update\"><button type=\"button\" id=\"modif-" + x + "\" class=\"btn btn-info\">Modifier</td><td class=\"delete\"><button id=\"suppr-" + x + "\" type=\"button\" class=\"btn btn-danger\">Supprimer</button></td></tr>";
            for (var i = 0; i < tasks.length; i++) {
                const id = tasks[i].id;
                document.getElementById('suppr-' + i).addEventListener('click', () => this.deleteTask(id));
                document.getElementById('modif-' + i).addEventListener('click', () => this.updateTask(id));
            }
        } catch (e) {
            alert("Cannot get Task")
        }
    }
}