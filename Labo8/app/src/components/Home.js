import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Home = () => {

	let history = useHistory();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [apiUrl, setUrl] = useState('http://localhost:8080');

	const createAccount = () => {
		if (username === '' || password === '') {
			alert('Veuillez remplir tous les champs');
			return ;
		}
		axios.post(apiUrl + '/users', {username, password})
		.then(() => {
			alert('Votre compte a bien été créé');
		})
	}

	const submitForm = () => {
		if (username === '' || password === '') {
			alert('Veuillez remplir tous les champs');
			return ;
		}
		axios.post(apiUrl + '/login', {
			username, password
		})
		.then(res => {
			console.log(Cookies.get('token'));
			//history.push('/userprofile')
		})
		.catch(() => {
			alert("Bad password or username");
		})
	}

	return (
		<div>
			<input type="text" placeholder="username" onChange={val => setUsername(val.target.value)}/>
			<input type="password" placeholder="password" onChange={val => setPassword(val.target.value)} />
			<input type="submit" onClick={submitForm} />
			<input type="submit" value="Créer une compte" onClick={createAccount} />
		</div>
	);
}

export default Home;