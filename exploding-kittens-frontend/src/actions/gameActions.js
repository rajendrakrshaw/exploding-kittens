// src/actions/gameActions.js

export const drawCard = (card) => ({
    type: 'DRAW_CARD',
    payload: card,
  });
  
  export const restartGame = () => ({
    type: 'RESTART_GAME',
  });
  
  export const gameOver = (msg) => ({
    type: 'GAME_OVER',
    payload: msg,
  });

  // src/actions/gameActions.js

export const useDefuseCard = (defuseCard) => {
  return {
    type: 'USE_DEFUSE_CARD',
    payload: defuseCard,
  };
};
export const defuseCard = (card) => ({
  type: 'DEFUSE_CARD',
  payload: card,
});


  