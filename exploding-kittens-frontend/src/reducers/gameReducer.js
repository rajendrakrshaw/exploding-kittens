// src/reducers/gameReducer.js
// import { DRAW_CARD, GAME_OVER, RESTART_GAME } from '../actions/types';
// src/reducers/gameReducer.js

const initialStateG = {
  deck: ["😼", "💣", "🙅‍♂️", "🔀", "😼"],
  // deck: ["😼", "🔀"],
  drawnCards: [],
  defuseCards: [],
  gameInProgress: true,
  gameOverReason: null, // Set to true to start the game
};

const resetGameState = (state) => {
  const newDeck = shuffleDeck([...initialStateG.deck]);
  return {
    ...state,
    deck: newDeck,
    drawnCards: [],
    defuseCards: [],
    gameInProgress: true,
    gameOverReason: null,
  };
};

const gameReducer = (state = initialStateG, action) => {
  switch (action.type) {
    case "DRAW_CARD":
   
      const updatedDefuseCards =
        state.defuseCards.length > 0
          ? state.defuseCards.slice(0, -1)
          : state.defuseCards;

      return {
        ...state,
        drawnCards: [...state.drawnCards, action.payload],
        deck: state.deck.slice(0, -1),
        defuseCards: updatedDefuseCards,
      };
    case "USE_DEFUSE_CARD":
      const { payload: defuseCard } = action;
      return {
        ...state,
        deck: state.deck.filter((card) => card !== defuseCard),
        defuseCards: [...state.defuseCards, defuseCard],
      };
    case "DEFUSE_CARD":
      // Defusing card - remove from the deck and place at side
      return {
        ...state,
        deck: state.deck.slice(0, -1), // Remove the last card from the deck
        defuseCards: [...state.defuseCards, action.payload], // Add the defused card to the side
      };
    case "RESTART_GAME":
      return resetGameState(state);

    case "GAME_OVER":
      return {
        ...state,
        gameInProgress: false,
        gameOverReason: action.payload,
      };

    default:
      return state;
  }
};

const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export default gameReducer;
