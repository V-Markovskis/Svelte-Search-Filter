export async function getAllGames() {
	try {
		const response = await fetch('https://storage.googleapis.com/estoty-temp/games.json');
		if (!response.ok) {
			console.error(`HTTP error! Status: ${response.status}`);
		}
		return await response.json();
	} catch (error) {
		console.error('Failed to fetch:', error);
		return null;
	}
}
