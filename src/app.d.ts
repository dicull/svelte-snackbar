// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	type SnackbarMessage = {
		id: number,
		message: string,
		isWiggle?: boolean,
		onClick?: Function
		closeCallback?: Function
	}
}

export {};
