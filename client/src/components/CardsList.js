import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../context/user';
import CreateCard from './CreateCard';

function CardsList({cards, onCreateCard}){
  const [newCardFormVisible, setNewCardFormVisible] = useState(false)

  const { currentUser, setCurrentUser } = useContext(UserContext)
  
  console.log("From CardList, current user:", currentUser)

  
  const mappedCards = cards.map((eachCard) => (
    <div key={eachCard.id} className='card'>
        <h1>{eachCard.card_name}</h1>
        <Link to={`/cards/${eachCard.id}`}>See More</Link>
        <button>Delete Card</button>
    </div>
  ));


  return (
    <>
    <button onClick={() => setNewCardFormVisible(!newCardFormVisible)}>Create a Card</button>
    {newCardFormVisible ? <CreateCard onCreateCard={onCreateCard} /> : null}
    {mappedCards}
    </>
  )
}

export default CardsList