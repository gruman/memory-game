import React, { useState, useEffect } from 'react';

import './App.css'
import SingleCard from './components/SingleCard';

const cardImages = [
  {
    "src": "img/1.png",
    "matched": false
  },
  {
    "src": "img/2.png",
    "matched": false
  },
  {
    "src": "img/3.png",
    "matched": false
  },
  {
    "src": "img/4.png",
    "matched": false
  },
  {
    "src": "img/5.png",
    "matched": false
  },
  {
    "src": "img/6.png",
    "matched": false
  },
]

function App() {

  // shuffle cards

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

 const handleChoice = (card) => {
   choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
 }

 const resetTurn = () => {
   setChoiceOne(null);
   setChoiceTwo(null);
   setTurns(prevTurns => prevTurns + 1);
 }

 useEffect(() => {
  if (choiceOne && choiceTwo) {
    if (choiceOne.src === choiceTwo.src)
    {
      setCards(prevCards => {
        return prevCards.map(card => {
          if (card.src === choiceOne.src)
          {
            return {...card, matched: true}
          }
          else
          {
            return card;
          }
        })
      })
      resetTurn();
    }
    else
    {
      setDisabled(true);
      setTimeout(() => {
        resetTurn();

        setDisabled(false);
      }, 1000)
    }
  }
 }, [choiceOne, choiceTwo])

useEffect(() => {
  shuffleCards();
}, []);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {
          cards.map((card) => (
            <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            disabled={disabled}
            flipped={card === choiceOne || card === choiceTwo || card.matched} />
            
          ))
        }
      </div>
      <p>Turn: {turns}</p>
    </div>
  );
}

export default App