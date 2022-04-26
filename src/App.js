import axios from 'axios';
import { useState, useEffect } from 'react';
import './App.css';
import Audio from './Audio';

// import song from './asset/audio.mp3';

function App() {
	const CLIENT_ID = 'bef2369a3c2c48df9a42aa639e57e225';
	const REDIRECT_URI = 'http://localhost:3000';
	const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
	const RESPONSE_TYPE = 'token';

	const [token, setToken] = useState('');
	const [spotifyData, setSpotifyData] = useState([]);

	useEffect(() => {
		const hashLink = window.location.hash;

		let token = window.localStorage.getItem('token');

		// getToken()

		if (!token && hashLink) {
			token = hashLink
				.substring(1)
				.split('&')
				.find((elem) => elem.startsWith('access_token'))
				.split('=')[1];

			window.location.hash = '';
			window.localStorage.setItem('token', token);
		}

		setToken(token);
	}, []);

	const getSongs = async () => {
		const { data } = await axios.get('https://api.spotify.com/v1/tracks', {
			headers: {
				Authorization: 'Bearer ' + token,
			},
			params: {
				ids: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
			},
		});

		console.log(data?.tracks);
		setSpotifyData(data?.tracks);
	};

	const logout = () => {
		setToken('');
		window.localStorage.removeItem('token');
	};

	return (
		<div className="App">
			<h1>Spotify and ts-audio</h1>
			{!token ? (
				<a
					href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
				>
					Login to Spotify
				</a>
			) : (
				<button onClick={logout}>Logout</button>
			)}
			<button onClick={getSongs}>Get songs</button>

			{spotifyData &&
				spotifyData.map((track) => (
					<Audio key={track.id} track={track.href} />
					// <p key={track.id}>{track.external_urls.spotify}</p>
				))}

		</div>
	);
}

export default App;
