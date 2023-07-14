import React from 'react'
import { Link } from 'react-router-dom'

function Home({allCards}) {

  const logo = "https://trello.com/1/cards/64af21902dfd4fd9ceb8c77a/attachments/64af21957fd7793076865370/download/Y.png"

  return (
    <div style={{textAlign: "center"}}>
        <h1>Welcome to Yello!</h1>
        <div>
            <p><strong>Total Cards:</strong> {allCards.length} </p>
            <Link to="/cards">See All Cards</Link>
        </div>
        <img src={logo} alt="Yello log" style={{ width: "30%" }}/>
    </div>
  )
}

export default Home