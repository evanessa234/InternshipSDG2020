import { writable } from 'svelte/store';
const localUser = localStorage.getItem("user");
export const searchQuery = writable('')
export const searchFilter = writable(0)
export const user = writable( localUser ? JSON.parse(localUser): {});
user.subscribe((value) => {
    localStorage.setItem("user", JSON.stringify(value))
})

export const courseStore = writable({});

export const isLab = writable(false);

export const dqaStore = writable({});