import React, { useEffect, useRef, useState } from 'react'
import style from '../css/box.module.css'
import { images } from './Images';
import Card from './Card';
export default function Box() {
    const [allimages, setAllImages] = useState([]);
    const [cardSelected1, setCardSelected1] = useState(null)
    const [cardSelected2, setCardSelected2] = useState(null)
    const [moves, setMoves] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timer, setTimer] = useState(null);

    // console.log('img: ',allimages)

    const startGame = () => {
        const randomize = [...images, ...images].sort(()=>Math.random() -0.5).
            map((cards)=>({...cards,id:Math.random()}))

        setAllImages(randomize);
        setCardSelected1(null);
        setCardSelected2(null)
    }

    useEffect(()=>{
        startGame()
    },[])

    const handleCardClick = (card) => {
        console.log('card: ',card)
        if(cardSelected1 && cardSelected2){
            cardSelected1? setCardSelected2(card) : setCardSelected1(card);
            setMoves(moves=>moves+1)
        }
    }
    return (
        <div>
            <div className={style.grid_container}>
                {allimages.map((image)=>{
                    return <div>
                        <Card className card={image} 
                            handleClick={handleCardClick} 
                            flip={image==cardSelected1 || image==cardSelected2} ></Card>
                    </div>
                })}
            </div>
        </div>
    )
}