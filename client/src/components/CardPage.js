import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import CreateComment from './CreateComment'
import { UserContext } from '../context/user'



function CardPage({ onCommentDelete, onCommentSubmit, onCommentUpdate, allCards, onCardUpdate }) {
  const [cardPage, setCardPage] = useState({})
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false)
  const [editedComment, setEditedComment] = useState(null)
  const [cardName, setCardName] = useState('');
  const [isCardNameEditing, setCardNameEditing] = useState(false);
  const [cardDescription, setCardDescription] = useState('')
  const [isCardDescriptionEditing, setIsCardDescriptionEditing] = useState('')
  const [errors, setErrors] = useState(null)

  const { currentUser, setCurrentUser } = useContext(UserContext)

  const params = useParams()
  
  useEffect(() => {
    const foundCard = allCards.find(card => card.id === parseInt(params.id));
    if (foundCard) {
      setCardPage(foundCard);
      setCardName(foundCard.card_name)
      setCardDescription(foundCard.description)
      setErrors(null)
    } else {
      setErrors( { message: "Card not found" } )
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
      if (comment.user_id === currentUser.id) {
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

    function handleCardNameUpdate() {
      fetch(`/cards/${cardPage.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ card_name: cardName }),
      })
        .then((response) => {
          if (response.ok) {
            const updatedCard = {...cardPage, card_name: cardName}
            onCardUpdate(updatedCard)
            setCardNameEditing(false);
          }
        })
        .catch((error) => {
          console.error('Error updating card name:', error);
        });
    }

    function handleCardDescriptionUpdate() {
      fetch(`/cards/${cardPage.id}`, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify({description: cardDescription}),
      })
      .then((response) => {
        if (response.ok) {
          const updatedCard = {...cardPage, description: cardDescription}
          onCardUpdate(updatedCard)
          setIsCardDescriptionEditing(false)
        }
      })
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
        return datetimeString;
      }      
      return date.toLocaleString(undefined, options);
    }

  
    const sortedComments = cardPage.comments ? cardPage.comments.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) : [];


    if (errors !== null) {
      return <div>{errors.message}</div>
    }
  
  return (
    <div className='card-page'>
        <div className='card-name-container'>
          <h1>
            {isCardNameEditing ? (
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
            ) 
            : 
            (cardPage.card_name)} 
          </h1>
          {isCardNameEditing ? (
              <button onClick={handleCardNameUpdate}>Save</button>) 
              : 
              (<button onClick={() => setCardNameEditing(!isCardNameEditing)}>Edit</button>)}
          </div>
        <h6>Description:</h6>
        <p className={isCardDescriptionEditing ? null : 'card-description'}>{isCardDescriptionEditing ? (
          <textarea 
            className='card-description-box'
            type="text"
            value={cardDescription}
            onChange={(e) => setCardDescription(e.target.value)}
          />) 
          :
          (cardPage.description)}
        </p>
        {isCardDescriptionEditing ? (
          <button onClick={handleCardDescriptionUpdate}>Save</button>)
          :
          (<button onClick={() => setIsCardDescriptionEditing(!isCardDescriptionEditing)}>Edit</button>)
        }
        <h6>Comments:</h6>
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
                    <p><strong>{comment.username}</strong></p>
                    <p>{comment.body}</p>
                    <div>
                      {formatDateTime(comment.created_at)}
                    </div>
                    { comment.user_id === currentUser.id ? <div className="button-group">
                      <button onClick={() => handleEdit(comment)}>EDIT</button>
                      <button onClick={() => handleDelete(comment)}>DELETE</button>
                    </div> : null}
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