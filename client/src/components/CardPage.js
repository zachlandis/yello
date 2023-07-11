import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import CreateComment from './CreateComment'
import { UserContext } from '../context/user'


function CardPage({ onCommentDelete, onCommentSubmit, onCommentUpdate, allCards }) {
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false)
  const [cardPage, setCardPage] = useState({})
  const [editedComment, setEditedComment] = useState(null)
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
      setEditedComment({...comment})
      const updatedComment = {
        ...comment,
        user_id: currentUser.id,
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
        body: JSON.stringify({ 
          body: comment.body,
          user_id: currentUser.id
        }
          ),
      })
        .then((response) => {
          if (response.ok) {
            onCommentUpdate(comment)
          }
        })
        .catch((error) => {
          console.error("Error updating comment:", error);
        });
    }


    function formatDateTime(datetimeString) {
      const options = { 
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      };
      
      const date = new Date(datetimeString);
      if (isNaN(date.getTime())) {
        // Invalid date format, return the original datetimeString
        return datetimeString;
      }
      
      return date.toLocaleString(undefined, options);
    }

  
    const sortedComments = cardPage.comments ? cardPage.comments.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) : [];

    
  
  return (
    <div className='card-page'>
        <h1>{cardPage.card_name}</h1>
        <h1>Comments:</h1>
        <ul>
        {sortedComments.map((comment) => (
            <li key={comment.id}>
              {comment.editing && editedComment && comment.id === editedComment.id ? (
                  <div>
                    <input
                      type="text"
                      value={editedComment.body}
                      onChange={(e) =>
                        setEditedComment((prevComment) => ({
                          ...prevComment,
                          body: e.target.value,
                        }))
                      }
                    />
                    <button onClick={() => handleSave(editedComment)}>SAVE</button>
                  </div>
                ) : (
                  <div className='comment-div'>
                    {comment.body}
                    <div>
                      {formatDateTime(comment.created_at)}
                    </div>
                    <div className="button-group">
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