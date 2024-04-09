import { writable } from 'svelte/store';

export const gamesData = writable([]);
export const retentionData = writable([]);
export const selectedGame = writable('All');
export const selectedVersion = writable('All');
export const selectedCountry = writable('All');
