import { computed, ref } from "vue";
import { defineStore } from "pinia";

/*export const useQuotesStore = defineStore("quotes", () => {
  //   const quotes = ref([] as quote[]);
  //   const activeId = 5;
  //   const activeQuote = computed(() => {
  //     return quotes[activeId];
  //   });

  const quotes = ref([
    {
      id: 0,
      quote:
        "Someday soon you’re gonna have families of your own, and if you’re lucky, you’ll remember the little moments like this that were good",
      author: "Tony Soprano",
      season: 1,
      episode: "",
      episodeTitle: "I Dream of Jeannie Cusamano",
      year: "",
      category: "Family",
      upvote: 0,
      downvote: 0,
    },
    {
      id: 1,
      quote: "More is lost by indecision than by wrong decision",
      author: "Carmela Soprano",
      season: 4,
      episode: "",
      episodeTitle: "Whitecaps",
      year: "",
      category: "Motivation",
      upvote: 0,
      downvote: 0,
    },
    {
      id: 2,
      quote:
        "You steer the ship the best way you know. Sometimes it’s smooth. Sometimes you hit the rocks. In the meantime, you find your pleasures where you can",
      author: "Junior Soprano",
      season: 3,
      episode: "",
      episodeTitle: "He Is Risen",
      year: "",
      category: "Motivation",
      upvote: 0,
      downvote: 0,
    },
    {
      id: 3,
      quote:
        "Other people’s definitions of you, sometimes they’re more about making themselves feel better. You gotta define yourself",
      author: "Christopher Moltisanti",
      season: 5,
      episode: "",
      episodeTitle: "Sentimental Education",
      year: "",
      category: "Motivation",
      upvote: 0,
      downvote: 0,
    },
  ]);
  const activeId = ref(2);
  const activeQuote = computed(() => {
    return activeId;
  });

  function vote(upOrDown: string) {
    upOrDown === "up"
      ? quotes[activeId].value.upvote++
      : quotes[activeId].value.downvote++;
  }

  return {
    quotes,
    activeId,
    activeQuote,
    vote,
  };
});*/
export const useQuotesStore = defineStore("quotes", {
  //   const quotes = ref([] as quote[]);
  //   const activeId = 5;
  //   const activeQuote = computed(() => {
  //     return quotes[activeId];
  //   });
  state: () => {
    return {
      quotes: [] as quote[],
      activeId: 3 as number,
      loaded: false as boolean,
    };
  },
  getters: {
    activeQuote(state) {
      return state.quotes[state.activeId];
    },
  },
});

interface quote {
  id: number;
  quote: string;
  author: string;
  season: number;
  episode: number;
  episodeTitle: string;
  year: number;
  category: string;
  upvote: number;
  downvote: number;
}
