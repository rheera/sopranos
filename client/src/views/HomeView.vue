<script setup lang="ts">
import { quotes } from "@/assets/data/quotes.js";
import { ref, computed } from "vue";
import { useQuoteStore } from "@/stores/quoteStore";

const store = useQuoteStore();
let quote = store.quote;

function randomize() {
  let oldNum = quoteNum.value;
  quoteNum.value = Math.floor(Math.random() * quoteArr.value.length);
  quoteNum.value == oldNum ? randomize() : null;
}

const countVotes = computed(() => {
  return quote.upvote >= quote.downvote ? quote.upvote - quote.downvote : 0;
});
</script>

<template>
  <main>
    <div class="app-wrapper container">
      <div class="quote-cnt">
        <h3 class="quote">{{ quote.quote }}</h3>
        <p class="author">- {{ quote.author }}</p>
      </div>
      <div class="vote-btns">
        <span class="vote vote-up" @click="quote.upvote++">
          <svg width="36" height="36">
            <path d="M2 10h32L18 26 2 10z" fill="currentColor"></path>
          </svg>
        </span>
        <p class="votes">{{ countVotes }}</p>
        <span class="vote vote-down" @click="quote.downvote++">
          <svg width="36" height="36">
            <path d="M2 10h32L18 26 2 10z" fill="currentColor"></path>
          </svg>
        </span>
      </div>
      <button class="btn btn-primary" @click="randomize()">Random Quote</button>
    </div>
  </main>
</template>

<style lang="scss">
.app-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // max-width: 900px;
  // margin: 0 auto;
  .quote-cnt {
  }
  .vote-btns {
    display: flex;
    .vote {
      display: inline-block;
      color: #687074;
      &:hover {
        cursor: pointer;
      }
      &-up {
        transform: rotate(180deg) translateY(5px);
      }
    }
  }
}
</style>
