export async function getAllRetentions() {
	try {
		const response = await fetch('https://storage.googleapis.com/estoty-temp/retention.json');
		if (!response.ok) {
			console.error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		console.log('retention data', data);
		return data;
	} catch (error) {
		console.error('Failed to fetch:', error);
		return null;
	}
}
