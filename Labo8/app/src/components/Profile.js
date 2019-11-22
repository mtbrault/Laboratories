import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const Profile = () => {

	let history = useHistory();
	const [username, setUsername] = useState('');

	useEffect(() => {
		const token = Cookies.get('token');
		if (!token)
			history.push('/');
		axios.get('http://localhost:8080/profile', {headers: {token}})
		.then(res => {
			setUsername(res.data);
		})
		.catch(() => {
			Cookies.remove('token');
			history.push('/');
		});
	}, []);

	return (
		<p>{username}</p>
	);
}

export default Profile;