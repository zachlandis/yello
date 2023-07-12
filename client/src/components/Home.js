import React from 'react'
import { Link } from 'react-router-dom'

function Home({allCards}) {
  return (
    <div>
        <h1>Welcome to Yello!</h1>
        <div>
            <p><strong>Total Cards:</strong> {allCards.length} </p>
            <Link to="/cards">See All Cards</Link>
        </div>
    </div>
  )
}

export default Home