<script setup lang="ts">
import { quotes } from "@/assets/data/quotes.js";
import { ref, computed } from "vue";
import { useQuotesStore } from "@/stores/quotesStore";
import BaseIcon from "@/components/BaseIcon.vue";
import IconGun from "@/components/Icons/IconGun.vue";

const store = useQuotesStore();

function randomize() {
  let oldNum = store.activeId;
  let newNum = Math.floor(Math.random() * 20);
  console.log(newNum);
  newNum == oldNum ? randomize() : store.$patch({ activeId: newNum });
}
async function upvote(id: number) {
  await fetch("https://hsk49u89s7.execute-api.us-east-1.amazonaws.com/quote", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      upvoteAmt: parseInt(store.activeQuote.upvote) + 1,
      downvoteAmt: parseInt(store.activeQuote.downvote),
    }),
  });
  store.quotes[store.activeId].upvote++;
}
async function downvote(id: number) {
  await fetch("https://hsk49u89s7.execute-api.us-east-1.amazonaws.com/quote", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      upvoteAmt: parseInt(store.activeQuote.upvote),
      downvoteAmt: parseInt(store.activeQuote.downvote) + 1,
    }),
  });
  store.quotes[store.activeId].downvote++;
}
// TODO: figure out how to get just one quote instead of getAll from Lambda, something to do with Lambda proxy integration is enabled?
/* async function fetchQuote(quoteId: number) {
  const response = await fetch(
    "https://hsk49u89s7.execute-api.us-east-1.amazonaws.com/quotes?id= " +
      quoteId
      "https://hsk49u89s7.execute-api.us-east-1.amazonaws.com/quote",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: quoteId }),
      }
  );
  let newQuote = await response.json();
  console.log(newQuote);

  store.$patch({ quote: { newQuote } });
}
const quote = computed(() => {
  store.$subscribe;
  return store.quotes[store.activeId];
}); */
const countVotes = computed(() => {
  if (store.loaded) {
    return store.activeQuote.upvote >= store.activeQuote.downvote
      ? store.activeQuote.upvote - store.activeQuote.downvote
      : 0;
  } else {
    return 0;
  }
});
</script>

<template>
  <main>
    <section class="app-wrapper container mx-auto">
      <div class="card w-3/4 bg-base-300 text-base-content">
        <div class="card-body items-center text-center">
          <div class="quote-cnt">
            <h3 class="quote text-xl md:text-5xl">
              {{ store.loaded ? store.activeQuote.quote : "Loading" }}
            </h3>
            <p class="author">
              - {{ store.loaded ? store.activeQuote.author : "Loading" }}
            </p>
          </div>
          <div class="vote-btns card-actions justify-end">
            <span class="vote vote-up" @click="upvote(store.activeQuote.id)">
              <BaseIcon
                icon-name="upvoteGun"
                :width="11"
                :height="28"
                hover-color="rose-100"
                ><IconGun
              /></BaseIcon>
              <!-- <svg width="36" height="36">
                <path d="M2 10h32L18 26 2 10z" fill="currentColor"></path>
              </svg> -->
            </span>
            <p class="votes">{{ countVotes }}</p>
            <span
              class="vote vote-down"
              @click="downvote(store.activeQuote.id)"
            >
              <!-- <svg width="36" height="36">
                <path d="M2 10h32L18 26 2 10z" fill="currentColor"></path>
              </svg> -->
              <BaseIcon
                icon-name="downvoteGun"
                :width="11"
                :height="28"
                hover-color="cyan-100"
                ><IconGun
              /></BaseIcon>
            </span>
          </div>
          <button class="btn btn-primary" @click="randomize()">
            Random Quote
          </button>
        </div>
      </div>
    </section>
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
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
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
