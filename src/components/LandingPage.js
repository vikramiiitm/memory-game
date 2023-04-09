import React from 'react'
import { useNavigate } from "react-router-dom";
import '../css/landing.css'

export default function LandingPage() {
  const navigate = useNavigate()
  return (
  <div className='container'>
      <div className='main-container'>
      <p className='main-heading'>Memory Games
        <br/>
        <button className='play-button' onClick={()=>navigate("/play")}>Play Now!</button>
      </p>
    </div>
  </div>
  )
}
