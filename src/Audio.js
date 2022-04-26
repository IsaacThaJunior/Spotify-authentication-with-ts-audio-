import React from 'react';

import { AudioPlaylist } from 'ts-audio';

export default function Audio({ track }) {
	const playlist = AudioPlaylist({
		files: track,
	});

	const play = () => {
		playlist.play();
	};

	return (
		<>
			<button onClick={play}>Play</button>
		</>
	);
}
