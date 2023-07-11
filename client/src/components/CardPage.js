import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import CreateComment from './CreateComment'
import { UserContext } from '../context/user'


function CardPage({ onCommentDelete, onCommentSubmit, allCards }) {
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false)
  const [cardPage, setCardPage] = useState({})
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const params = useParams()

  const { card_name } = allCards.find(card => card.id === params.id) || {};

  useEffect(() => {
    const foundCard = allCards.find(card => card.id === params.id);
    if (foundCard) {
      setCardPage(foundCard);
    } else {
      fetch(`/cards/${params.id}`)
        .then(r => r.json())
        .then(data => setCardPage(data));
    }
  }, [params.id, allCards]);
    
    function handleDelete(comment) {
      fetch(`/comments/${comment.id}`, {
        method: "DELETE",
      })
      .then(response => {
        if (response.ok) {
          onCommentDelete(comment)
        }
      });
    }

    function handleEdit(comment) {
      const updatedComment = {
        ...comment,
        editing: true,
      };
      setCardPage((prevCardPage) => ({
        ...prevCardPage,
        comments: prevCardPage.comments.map((c) =>
          c.id === comment.id ? updatedComment : c
        ),
      }));    
    }


    function handleSave(comment) {
      fetch(`/comments/${comment.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: comment.body }),
      })
        .then((response) => response.json())
        .then((updatedComment) => {
          setCardPage((prevCardPage) => ({
            ...prevCardPage,
            comments: prevCardPage.comments.map((c) =>
              c.id === updatedComment.id ? updatedComment : c
            ),
          }));
        })
        .catch((error) => {
          console.error("Error updating comment:", error);
        });
    }
  
  return (
    <div className='card-page'>
        <h1>{cardPage.card_name}</h1>
        <h1>Comments:</h1>
        <ul>
        {cardPage.comments &&
          cardPage.comments.map((comment) => (
            <li key={comment.id}>
              {comment.editing ? (
                <div>
                  <input
                    type="text"
                    value={comment.body}
                    onChange={(e) => {
                      const updatedComment = {
                        ...comment,
                        body: e.target.value,
                      };
                      setCardPage((prevCardPage) => ({
                        ...prevCardPage,
                        comments: prevCardPage.comments.map((c) =>
                          c.id === comment.id ? updatedComment : c
                        ),
                      }));
                    }}
                  />
                  <button onClick={() => handleSave(comment)}>SAVE</button>
                </div>
              ) : (
                <div>
                  {comment.body}
                  <div className='button-group'>
                    <button onClick={() => handleEdit(comment)}>EDIT</button>
                    <button onClick={() => handleDelete(comment)}>DELETE</button>
                  </div>
                </div>
              )}
            </li>
            ))}
        </ul>
        <button onClick={() => setIsCreateFormVisible(!isCreateFormVisible)}>Create Comment</button>
        {isCreateFormVisible ? <CreateComment onCommentSubmit={onCommentSubmit} cardId={params.id}/> : null}
    </div>
  )
}

export default CardPage