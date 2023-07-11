import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { Switch, Route } from "react-router-dom";
import Navbar from './Navbar';
import SignUpForm from "./SignUpForm";
import { useContext } from "react";
import { UserContext } from "../context/user";
import CardsList from "./CardsList";
import CardPage from "./CardPage";
import Login from "./Login";
import Logout from "./Logout";

function App() {
  const [page, setPage] = useState("/")
  const [allCards, setAllCards] = useState([])
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
    fetch(`/cards`)
    .then((r) => {
        if(r.ok) {
            r.json().then((data) => setAllCards(data))
        } else {
            console.log("Cards not found")
        }
    })
}, [])

console.log("From App, current user:", currentUser)

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

  if(!currentUser) return <Login setCurrentUser={setCurrentUser}/>

  return (
    <>
    <Navbar onChangePage={setPage}/>
      <div className="App">
        <Switch>
          <Route path="/cards/:id">
            <CardPage onCommentDelete={handleCommentDelete} allCards={allCards} onCommentSubmit={handleCommentSubmit}/>
          </Route>
          <Route path="/cards">
            <CardsList cards={allCards} />
          </Route> 
          <Route path="/auth" component={Login}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/users/new" component={SignUpForm}/>
          <Route path="/">
            <h1>HOME</h1>
          </Route>
        </Switch>
    </div>
    </>
    
  );
}

export default App;
