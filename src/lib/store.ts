import { writable, get } from "svelte/store";

const randomInt = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const snackBar = (() => {
	const _this = writable<SnackbarMessage[]>([]);
	const maxMessageLength = 5;

	const { subscribe, set, update } = _this;

	return {
		subscribe,
		set,
		update,

		/**
		 * 일반 메시지. 일정 시간지나면 닫힘.
		 * @param message
		 * @param ms
		 */
		message: (message: string, ms: number = 3000, onClick?: Function, closeCallback?: Function) => {
			const id = randomInt(10, 99);
			update((messages)  => {
				// 최대 갯수 넘으면 fifo 제거
				if (messages.length === maxMessageLength) {
					messages.splice(0, 1);
				}

				return [...messages, {
					id,
					message,
					isWiggle: false,
					onClick,
					closeCallback,
				}];
			});

			if (ms !== 0 && !onClick && !closeCallback) {
				setTimeout(() => {
					snackBar.close(id);
				}, ms);
			}

			return id;
		},
		/**
		 * 강조용 메시지. 자동으로 안닫힘.
		 * @param message
		 * @param onClick
		 * @param closeCallback
		 */
		messageWiggle: (message: string, onClick?: Function, closeCallback?: Function) => {
			const snackbarMessages = get(_this);

			// Wiggle 은 동일 메시지 있는 경우 추가 안함
			const sameMessage = snackbarMessages.find(el => message === el.message);
			if (sameMessage) {
				return sameMessage.id;
			}

			const id = randomInt(10, 99);
			update((messages)  => {
				// 최대 갯수 넘으면 fifo 제거
				if (messages.length === maxMessageLength) {
					messages.splice(0, 1);
				}

				return [...messages, {
					id,
					message,
					isWiggle: true,
					onClick,
					closeCallback,
				}];
			});

			return id;
		},
		close: (id?: number | undefined) => {
			update((messages)  => {
				const index = id ? messages.findIndex(el => id === el.id) : messages.length - 1;
				if (index < 0) {
					return [];
				}

				const closeCallback = messages[index].closeCallback;
				if (closeCallback && typeof closeCallback === "function") {
					closeCallback();
				}

				messages.splice(index, 1);
				return [...messages];
			});
		},
		clear: () => {
			set([]);
		},
	}
})();