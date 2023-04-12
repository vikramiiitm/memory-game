import React from 'react'
import style from '../css/box.module.css'

export default function Card({card, handleClick, flip}) {
    console.log('flip: ',flip)
  return (
        <div className={style.card}>
            <div className={flip? style.flip:style.flip}>
                <img className={style.image} src={card.location}></img>
                <img className={style.background} src={require('../assets/solved.jpg')} onClick={()=>handleClick(card)}></img>
            </div>
        </div>
  )
}
