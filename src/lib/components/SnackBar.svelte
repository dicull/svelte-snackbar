<script lang="ts">
  import { snackBar } from "$lib/store";
  import { fly } from "svelte/transition";
</script>

<div class="snack-bar bottom-7 w-full max-h-[500px]">
  {#each $snackBar as item, index ($snackBar[index])}
    <div transition:fly={{ y: 50, duration: 200 }} class="w-full flex items-center justify-center mt-[15px]">
      <div
        class="message-wrapper w-[90%] min-h-[55px] flex justify-between text-white rounded-[18px]"
        class:wiggle-y={item.isWiggle}
      >
        <button class="px-[23px] py-[10px] w-full" on:click={item.onClick?.bind(null, item) || null}>{item.message}</button>
        <button class="focus:outline-none w-[55px] h-[55px] float-right" on:click|stopPropagation={() => snackBar.close(item.id)}>
          <div class="w-full h-full flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" viewBox="0 0 30 30" fill="currentColor">
              <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .snack-bar {
    position: fixed;
    z-index: 1000;
  }

  .message-wrapper {
    background-color: #2170ba;
  }

  .wiggle-y {
    animation-duration: 1s;
    animation-name: wiggle-y;
    animation-iteration-count: infinite;
  }

  @keyframes wiggle-y {
    0% {
      transform: translateY(0px);
    }
    33% {
      transform: translateY(0px);
    }
    39.6% {
      transform: translateY(10px);
    }
    46.3% {
      transform: translateY(-10px);
    }
    53% {
      transform: translateY(5px);
    }
    59.6% {
      transform: translateY(-5px);
    }
    63% {
      transform: translateY(1px);
    }
    64.6% {
      transform: translateY(-1px);
    }
    66% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(0px);
    }
  }
</style>
