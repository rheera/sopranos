<script setup lang="ts">
import { quotes } from "@/assets/data/quotes.js";
import { ref, computed } from "vue";
import { useQuotesStore } from "@/stores/quotesStore";

const store = useQuotesStore();

function randomize() {
  let oldNum = store.activeId;
  let newNum = Math.floor(Math.random() * 20);
  console.log(newNum);
  newNum == oldNum ? randomize() : store.$patch({ activeId: newNum });
}
// TODO: figure out how to get just one quote instead of getAll from Lambda, something to do with Lambda proxy integration is enabled?
// async function fetchQuote(quoteId: number) {
//   const response = await fetch(
//     "https://hsk49u89s7.execute-api.us-east-1.amazonaws.com/quotes?id= " +
//       quoteId
//       "https://hsk49u89s7.execute-api.us-east-1.amazonaws.com/quote",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id: quoteId }),
//       }
//   );
//   let newQuote = await response.json();
//   console.log(newQuote);

//   store.$patch({ quote: { newQuote } });
// }
// const quote = computed(() => {
//   store.$subscribe;
//   return store.quotes[store.activeId];
// });
const countVotes = computed(() => {
  return store.activeQuote.upvote >= store.activeQuote.downvote
    ? store.activeQuote.upvote - store.activeQuote.downvote
    : 0;
});
</script>

<template>
  <main>
    <div class="app-wrapper container">
      <div class="quote-cnt">
        <h3 class="quote">{{ store.activeQuote.quote }}</h3>
        <p class="author">- {{ store.activeQuote.author }}</p>
      </div>
      <div class="vote-btns">
        <span class="vote vote-up" @click="store.vote('up')">
          <svg width="36" height="36">
            <path d="M2 10h32L18 26 2 10z" fill="currentColor"></path>
          </svg>
        </span>
        <p class="votes">{{ countVotes }}</p>
        <span class="vote vote-down" @click="store.vote('down')">
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
