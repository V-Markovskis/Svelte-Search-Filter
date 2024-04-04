// Store for the raw data
import { writable } from 'svelte/store';

export const gamesData = writable([]);
export const retentionData = writable([]);

// Stores for filtered data
export const filteredGames = writable([]);
export const filteredVersions = writable([]);
export const filteredCountries = writable([]);
