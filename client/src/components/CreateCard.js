import React, { useState } from 'react'

function CreateCard({onCreateCard}) {
    const [cardName, setCardName] = useState('')
    const [description, setDescription] = useState('')
    const [errors, setErrors] = useState([])


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
            } else {
                r.json().then(data => 
                    setErrors(Object.entries(data.errors)))
            }
            setCardName("")
            setDescription("")
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
        {errors ? errors.map((e) => <div style={{color: "red"}}>{e[0]} {e[1]}</div>):null}
    </div>
  )
}

export default CreateCard