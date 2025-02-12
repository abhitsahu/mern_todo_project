import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home'>
        <div className="container"> 
            <h1>Welcome to Our Website!</h1>
            <p>Your one-stop solution for all your needs.</p>
            <button className="cta-button">
                <Link to="/todo">Get Started</Link>
            </button>
        </div>
    </div>
  )
}

export default Home