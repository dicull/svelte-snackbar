<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import { snackBar } from "$lib/store";

	const handleClick = (type = 'default') => {
		switch (type) {
			case 'default':
				snackBar.message(`기본 메시지`);
				break;
			case 'wiggle':
				snackBar.messageWiggle(`강조 메시지`);
				break;
			case 'keep':
				snackBar.message(`닫을때까지 유지`, 0);
				break;
			case 'click_event':
				snackBar.message(`메시지 클릭 이벤트`, null, (message) => {
					alert('메시지 클릭')
					snackBar.close(message.id);
				});
				break;
			case 'close_event':
				snackBar.message(`메시지 닫기 이벤트`, null, null, () => {
					alert('메시지 닫기')
				});
				break;
		}
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<picture>
				<source srcset={welcome} type="image/webp" />
				<img src={welcome_fallback} alt="Welcome" />
			</picture>
		</span>
	</h1>
</section>

<div class="text-center pt-[20px]">
	<button
		type="button"
		class="w-[140px] text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
		on:click={()=> { handleClick('default') }}
	>
		Default
	</button>
	<button
		type="button"
		class="w-[140px] text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
		on:click={()=> { handleClick('wiggle') }}
	>
		Wiggle
	</button>
	<button
		type="button"
		class="w-[140px] text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
		on:click={()=> { handleClick('keep') }}
	>
		Keep message
	</button>
	<button
		type="button"
		class="w-[140px] text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
		on:click={()=> { handleClick('click_event') }}
	>
		Click event
	</button>
	<button
		type="button"
		class="w-[140px] text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
		on:click={()=> { handleClick('close_event') }}
	>
		Close event
	</button>
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}

	.welcome img {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		display: block;
	}
</style>
