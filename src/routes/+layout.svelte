<script>
	import Header from './Header.svelte';
	import './styles.css';
	import SnackBar from "$lib/components/SnackBar.svelte";
	import { onMount } from "svelte";
	import { snackBar } from "$lib/store";

	onMount(() => {
		snackBar.message(`기본 메시지`);

		setTimeout(() => {
			snackBar.messageWiggle(`강조 메시지`);
		}, 1000);

		setTimeout(() => {
			snackBar.message(`닫을때까지 유지`, 0);
		}, 2000);

		setTimeout(() => {
			snackBar.message(`메시지 클릭 이벤트`, null, (message) => {
				alert('메시지 클릭')
				snackBar.close(message.id);
			});
		}, 3000);

		setTimeout(() => {
			snackBar.message(`메시지 닫기 이벤트`, null, null, () => {
				alert('메시지 닫기')
			});
		}, 4000);

	});
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
	<SnackBar />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
