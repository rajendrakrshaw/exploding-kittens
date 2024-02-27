// src/actions/userActions.js

export const setUsers = (users) => ({
    type: 'SET_USERS',
    payload: users,
  });
  
  export const setCurrentUser = (user) => ({
    type: 'SET_CURRENT_USER',
    payload: user,
  });
  
  export const increasePoints = (user) => ({
    type: 'INCREASE_POINTS',
    payload: user,
  });
  // src/actions/userActions.js

export const increaseDefuseCards = (amount) => {
  return {
    type: 'INCREASE_DEFUSE_CARDS',
    payload: amount,
  };
};

export const restartUser = () => ({
  type: 'RESTART_USER',
});
  