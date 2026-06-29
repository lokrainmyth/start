/* =========================
   translations.js — Io First Light
   Poetic meaning layer (not i18n)
   ========================= */

const IoLexicon = {
  states: {
    NIGHT: {
      word: "NIGHT",
      echo: "everything is still forming",
      symbol: "∴",
      colorHint: "cold-dark"
    },
    DEEP_NIGHT: {
      word: "DEEP NIGHT",
      echo: "thoughts without name",
      symbol: "∷",
      colorHint: "void-warm"
    },
    PRE_DAWN: {
      word: "PRE-DAWN",
      echo: "something starts remembering itself",
      symbol: "⋯",
      colorHint: "breathing"
    },
    DAWN: {
      word: "DAWN",
      echo: "light becomes aware of shape",
      symbol: "◐",
      colorHint: "soft-rise"
    },
    MORNING: {
      word: "MORNING",
      echo: "everything has already happened",
      symbol: "◑",
      colorHint: "clear-distance"
    }
  },

  systemWords: {
    PATH: {
      echo: "sequence becomes identity"
    },
    IO: {
      echo: "input becomes memory"
    },
    HOME: {
      echo: "return is never identical"
    }
  },

  tracks: {
    0: {
      echo: "entry without consent",
      hint: "beginning is always mistaken"
    },
    1: {
      echo: "movement disguised as routine",
      hint: "you are already elsewhere"
    },
    2: {
      echo: "dependency with a human face",
      hint: "connection has weight"
    },
    3: {
      echo: "sky that forgets it is sky",
      hint: "darkness is structural"
    },
    4: {
      echo: "exposure without protection",
      hint: "nothing hides anymore"
    },
    5: {
      echo: "sound without owner",
      hint: "emotion detaches"
    },
    6: {
      echo: "time becomes visible",
      hint: "months collapse into one point"
    },
    7: {
      echo: "age that stops being number",
      hint: "identity loosens"
    },
    8: {
      echo: "beauty without demand",
      hint: "no need to hold it"
    },
    9: {
      echo: "arrival that was never departure",
      hint: "end folds into origin"
    }
  },

  final: {
    myth: {
      title: "GO DEEPER",
      echo: "this is not the end of listening",
      hint: "it is the beginning of remembering"
    }
  }
};

/* =========================
   helper access layer
   ========================= */

window.IoLexicon = IoLexicon;

window.getStateLexicon = function(state) {
  return IoLexicon.states[state.toUpperCase()];
};

window.getTrackLexicon = function(index) {
  return IoLexicon.tracks[index];
};
