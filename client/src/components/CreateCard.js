import React, { useState } from 'react'

function CreateCard({onCreateCard}) {
    const [cardName, setCardName] = useState('')
    const [description, setDescription] = useState('')


    function handleCreateCard(e) {
        e.preventDefault()

        const newCardData = {
            card_name: cardName,
            description: description
        }

        console.log("Submitted Create Card Form")
        fetch('/cards', {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newCardData)
        }
        )
        .then(r => {
            if (r.ok) {
                r.json().then(data => onCreateCard(data))
            }
        })
        
    }


  return (
    <div>
        <form onSubmit={handleCreateCard}>
            <label>
                Card Name
            </label>
            <input
                type='text'
                name='cardName'
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
            />
            <br/>
            <label>
                Card Description
            </label>
            <input
                type='text'
                name='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input type='submit' />
        </form>
    </div>
  )
}

export default CreateCard