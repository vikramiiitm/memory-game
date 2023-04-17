import React from 'react'

import style from '../assets/css/box.module.css'

export default function Card({card, handleClick, turn, disable}) {
    const Click = () => {
        if(!disable){
            handleClick(card)
        }
    }
  return (

    <div className={style.card}>    
            <div className={turn ? style.turn : ""}>
                <img className={style.image} src={card.location} alt="card front" />
                <img className={style.background} src={require('../assets/images/solved.jpg')} onClick={Click} alt="cover" />
            </div>
        </div>
  )
}
