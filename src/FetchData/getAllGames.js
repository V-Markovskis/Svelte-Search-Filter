export async function getAllGames() {
	try {
		const response = await fetch('https://storage.googleapis.com/estoty-temp/games.json');
		if (!response.ok) {
			console.error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Failed to fetch:', error);
		return null;
	}
}
