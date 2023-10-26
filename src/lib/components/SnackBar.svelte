<script lang="ts">
  import { snackBar } from "$lib/store";
  import { fly } from "svelte/transition";
</script>

<div class="snack-bar bottom-7 w-full max-h-[500px]">
  {#each $snackBar as item, index ($snackBar[index])}
    <div transition:fly={{ y: 50, duration: 200 }} class="w-full flex items-center justify-center mt-[15px]">
      <div
        class="message-wrapper w-[90%] min-h-[55px] flex items-center justify-between text-white rounded-[18px]"
        class:wiggle-y={item.isWiggle}
      >
        <button class="px-[23px] py-[10px] w-full" on:click={item.onClick?.bind(null, item) || null}>{item.message}</button>
        <button class="focus:outline-none h-[45px] w-[45px] float-right" on:click|stopPropagation={() => snackBar.close(item.id)}>
          X
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
