import { useState, useEffect, useContext } from "react";
import { useParams, Switch, Route } from 'react-router-dom'
import Navbar from './Navbar';
import SignUpForm from "./SignUpForm";
import { UserContext } from "../context/user";
import CardsList from "./CardsList";
import CardPage from "./CardPage";
import Login from "./Login";
import Logout from "./Logout";
import Home from "./Home";

function App() {
  const [page, setPage] = useState("/")
  const [allCards, setAllCards] = useState([])
  const [errors, setErrors] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()
  
  const { currentUser, setCurrentUser } = useContext(UserContext)

  useEffect(() => {
    fetch('/auth')
    .then(r => {
      if(r.ok) {
        r.json().then(user => setCurrentUser(user))
      } 
    })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    fetch(`/cards`)
    .then((r) => {
        if(r.ok) {
            r.json().then((data) => {
              setIsLoading(false)
              setAllCards(data)})
        } else {
            r.json().then((data) => setErrors(data.errors))
            setIsLoading(false)
        }
    })
}, [currentUser])

// CARD CRUD

function handleCardUpdate(updatedCard) {
  const updatedCards = allCards.map((card) => {
    if (card.id === updatedCard.id) {
      return updatedCard
    }
    return card
  })
  setAllCards(updatedCards)
}

function handleCreateCard(newCard) {
  setAllCards(prevCards => [...prevCards, newCard]);
}

function handleDeleteCard(deletedCard) {
  const updatedCards = allCards.filter((card) => card.id !== deletedCard.id)
  setAllCards(updatedCards)
}


// COMMENT CRUD
function handleCommentUpdate(comment) {
  const cardId = comment.card_id;
  const commentId = comment.id;
  const updatedCards = allCards.map((card) => {
    if (card.id === cardId) {
      const updatedComments = card.comments.map((c) => 
        c.id === comment.id ? comment : c
      );
      return {
        ...card,
        comments: updatedComments
      };
      }
      return card;
    });
    setAllCards(updatedCards)
}

function handleCommentDelete(comment) {
  const cardId = comment.card_id;
  const commentId = comment.id;
  const updatedCards = allCards.map((card) => {
    if (card.id === cardId) {
      const updatedComments = card.comments.filter((c) => c.id !== commentId);
        return {
          ...card,
          comments: updatedComments,
        };
    }
    return card;
  });
  setAllCards(updatedCards)
}

function handleCommentSubmit(comment) {
  const cardId = comment.card_id
  const updatedCards = allCards.map((card) => {
    if (card.id === cardId) {
      return {
        ...card,
        comments: [...card.comments, comment]
      };
    }
    return card
  });
  setAllCards(updatedCards)
}

  if (isLoading) return <h1>Loading...</h1>

  if(!currentUser) return <Login setCurrentUser={setCurrentUser}/>

  return (
    <>
    <Navbar onChangePage={setPage}/>
      <div className="App">
        <Switch>
          <Route path="/cards/:id">
            <CardPage onCommentDelete={handleCommentDelete} allCards={allCards} onCommentSubmit={handleCommentSubmit} onCommentUpdate={handleCommentUpdate} onCardUpdate={handleCardUpdate}/>
          </Route>
          <Route path="/cards">
            <CardsList cards={allCards} onCreateCard={handleCreateCard} onDeleteCard={handleDeleteCard} />
          </Route> 
          <Route path="/auth" component={Login}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/users/new" component={SignUpForm}/>
          <Route path="/">
            <Home allCards={allCards}/>
          </Route>
        </Switch>
    </div>
    </>
    
  );
}

export default App;
