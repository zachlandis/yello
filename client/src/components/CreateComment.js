import React, { useState, useContext } from 'react'
import { UserContext } from '../context/user'

function CreateComment({setCardPage, cardId, onCommentSubmit}) {
    const [comment, setComment] = useState("")
    const [errors, setErrors] = useState([])
    const {currentUser, setCurrentUser} = useContext(UserContext)


    function handleCommentSubmit(e) {
        e.preventDefault()
        const commentValue = {
            body: comment,
            card_id: cardId,
            user_id: currentUser.id
        }

        fetch(`/comments`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(commentValue)
        })
        .then(r => {
            if (r.ok) {
              r.json().then(data => onCommentSubmit(data))
            } else {
                r.json().then(data => setErrors(Object.entries(data.errors)))
            }
            setComment('');
        })
    }
    
    


  return (
    <div>
        <form onSubmit={handleCommentSubmit}>
            <input
                type='text'
                placeholder='Add a comment'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <input type='submit'/>
        </form>
    </div>
  )
}

export default CreateComment