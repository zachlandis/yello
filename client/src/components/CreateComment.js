import React, { useState } from 'react'

function CreateComment({setCardPage, cardId, onCommentSubmit}) {
    const [comment, setComment] = useState("")


    function handleCommentSubmit(e) {
        e.preventDefault()
        const commentValue = {
            body: comment,
            card_id: cardId,
            user_id: 3
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
                r.json().then(e => console.log("error"))
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