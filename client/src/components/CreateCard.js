import React, { useState } from 'react'

function CreateCard() {
    const [cardName, setCardName] = useState('')
    const [description, setDescription] = useState('')


  return (
    <div>
        <form>
            <input
                type='text'
                name='card_name'
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
            />
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