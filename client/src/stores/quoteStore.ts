import { ref } from "vue";
import { defineStore } from "pinia";

export const useQuoteStore = defineStore("quote", () => {
  const quote = ref({
    id: null,
    quote: "",
    author: "",
    season: null,
    episode: null,
    episodeTitle: "",
    year: null,
    category: "",
    upvote: 0,
    downvote: 0,
  });
  function vote(upOrDown: string) {
    upOrDown === "up" ? quote.value.upvote++ : quote.value.downvote++;
  }

  return {
    quote,
    vote,
  };
});
