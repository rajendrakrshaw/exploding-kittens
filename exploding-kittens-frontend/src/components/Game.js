// src/components/Game.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { drawCard, restartGame, gameOver, defuseCard } from '../actions/gameActions.js';
import { increasePoints, setCurrentUser } from '../actions/userActions.js';
import Header from './Header.js';
import Footer from './Footer.js';
import './Game.css';

const Game = () => {
  const dispatch = useDispatch();
  const { deck, drawnCards, defuseCards, gameInProgress, gameOverReason } = useSelector((state) => state.game);
  const { currentUser } = useSelector((state) => state.user);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showWinConfirmation, setShowWinConfirmation] = useState(false);

  const [showDefuseMessage, setShowDefuseMessage] = useState(false);
  const nav = useNavigate();
  const handleDrawCard = () => {
    if (!currentUser.username) {
      alert("Create a user first!");
      nav("/");
      // return;
    }

    const card = deck[deck.length - 1];

    if (card === '🙅‍♂️') {
      dispatch(defuseCard(card));
    }

    dispatch(drawCard(card));

    if (card === '😼') {
      // Cat card - do nothing
    } else if (card === '💣') {
      if (defuseCards.length === 0) {
        setShowConfirmation(true);
        // dispatch(gameOver('Oops! You drew a bomb.'));
        
      } else {
        defuseCards.pop();
        setShowDefuseMessage(true);
        dispatch(increasePoints());
        // dispatch(setCurrentUser({ ...currentUser, points: currentUser.points + 1 }));
      }
    } else if (card === '🔀') {
      const shuffleCardElement = document.querySelector('.card.hidden');
      if (shuffleCardElement) {
        shuffleCardElement.classList.add('shuffle-card');
        setTimeout(() => {
          shuffleCardElement.classList.remove('shuffle-card');
          dispatch(restartGame());
        }, 1000);
      }
    }

    if (deck.length === 1) {
      alert("you win");
      dispatch(increasePoints({ ...currentUser, points: currentUser.points + 1 }));
      // dispatch(setCurrentUser({ ...currentUser, points: currentUser.points + 1 }));
      setShowWinConfirmation(true);
    }

    const cardElement = document.querySelector('.card.hidden');
    if (cardElement) {
      cardElement.classList.add('drawn-card');
      setTimeout(() => {
        cardElement.classList.remove('drawn-card');
      }, 500);
    }
  };


  return (
    <div className="game-wrapper">
      <Header />
      <main>
        {gameInProgress && currentUser ? (
          <div className="game-container">
            <div className="user-info">
              <p>Username: {currentUser.username}</p>
              <p>Points: {currentUser.points}</p>
            </div>
            <div className="deck-container">
              <div className="deck" onClick={handleDrawCard}>
                {deck.length > 0 && <div className="card hidden"></div>}
              </div>
              <div className="drawn-cards">
                <h3>Drawn Cards:</h3>
                {drawnCards.map((card, index) => (
                  <div key={index} className="card drawn-card">{card}</div>
                ))}
              </div>
              <div className="defused-cards">
                <h3>Defused Cards:</h3>
                {defuseCards.map((card, index) => (
                  <div key={index} className="card defused-card">{card}</div>
                ))}
              </div>
              <div className="remaining-cards">
                <h3>Remaining Cards: {deck.length}</h3>
              </div>
            </div>
            {deck.length === 0 && (
              <div className="win-message">
                <p>Congratulations! You've won the game!</p>
              </div>
            )}
            {showDefuseMessage && (
              <div className="confirmation-message">
                <p>Yay! You drew a bomb. But it is defused by your defuse card.</p>
              </div>
            )}
            {showConfirmation && (
              <div className="confirmation-message">
                <p>Oops! You drew a bomb. Do you want to play again?</p>
                <button onClick={() => { dispatch(restartGame()); setShowConfirmation(false) }}>Yes</button>
                <button onClick={() => { alert("Thank you for playing. Have a nice day!"); }}>No</button>
              </div>
            )}
            {showWinConfirmation && (
              <div className="confirmation-message">
                <p>Congrats! You win. Do you want to play again?</p>
                <button onClick={() => {
                  setShowWinConfirmation(false); 
                  dispatch(restartGame());  
                  }
                }>Yes</button>
                <button onClick={() => { alert("Thank you for playing. Have a nice day!"); nav("/");}}>No</button>
              </div>
            )}
            {gameOverReason && !showConfirmation && (
              <div className="game-over-message">
                <p>Game Over: {gameOverReason}</p>
              </div>
            )}
          </div>
        ) : (
          <p>Please wait while the game restarts...</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Game;
