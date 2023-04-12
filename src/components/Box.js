import React, { useEffect, useRef, useState } from 'react'
import style from '../css/box.module.css'
import { images } from './Images';
import Card from './Card';
export default function Box() {
    const [allimages, setAllImages] = useState([]);
    const [cardSelected1, setCardSelected1] = useState(null)
    const [cardSelected2, setCardSelected2] = useState(null)
    const [moves, setMoves] = useState(0);
    const [disable, setDisabled] = useState(false);
    const [timer, setTimer] = useState(null);
    const [seconds, setSeconds] = useState(0)
    const [win, setWin] = useState(false)

    // Count Time
    useEffect(() => {
        if(moves===1){
            setTimer(setInterval(() => {
                setSeconds(i => i + 1)
            }, 1000))
        }
        // call the win method to check win condition
        checkWin()
    }, [moves]);
    
    //WiN Condition
    const checkWin = () => {
        let count = 0;
        allimages.forEach((image)=>{
            if(image.solved){
                count=count+1
            }
        if(count===16){
            setWin(true)
            stopTime()
        }
        })
    }

    // Method for stoping timer
    const stopTime = () => {
        clearInterval(timer)
        setTimer(null)
    }

    const startGame = () => {
        const randomize = [...images, ...images].sort(() => Math.random() - 0.5).
            map((cards) => ({ ...cards, id: Math.random() }))

        setAllImages(randomize);
        setCardSelected1(null);
        setCardSelected2(null)
        setTimer(null);
        setMoves(0);
        setSeconds(0);
        setWin(false);
        setDisabled(false)
        stopTime()
    }
    // compare 2 selected cards
    useEffect(() => {
        if (cardSelected1 || cardSelected2){
            setMoves(preMoves=>preMoves + 1)
        }
        if (cardSelected1 && cardSelected2) {
            // Counting the User moves ie every click.
            // Disabling the clicking of Images until two images are evaluated
            setDisabled(true)
            if (cardSelected1.location === cardSelected2.location) {
                console.log('inside card compare')

                setAllImages(prevallimages => {
                    return prevallimages.map(image => {
                        if (image.location === cardSelected1.location) {
                            return { ...image, solved: true }
                        } else {
                            return image
                        }
                    })
                })
                nextTurn()
            } else {
                setTimeout(() => nextTurn(), 1000)
            }

        }
    }, [cardSelected1, cardSelected2])

    const nextTurn = () => {
        // setting the two selected images as null and enabling clicking of images
        setCardSelected1(null);
        setCardSelected2(null);
        setDisabled(false)
    }
    useEffect(() => {
        startGame()
    }, [])

    const handleCardClick = (card) => {

        cardSelected1 ? setCardSelected2(card) : setCardSelected1(card);
        // setMoves(moves=>moves+1)
        console.log('card selected: ', card)
    }
    return (
        <div className={style.container}>
            {!win && <div className={style.moves}>Moves: {moves} Time: {seconds} seconds</div>}
            {win && <div className={style.moves}>Congrats!! You won. Moves: {moves} Time: {seconds} seconds</div>}
            {win && <div className={style.moves} onClick={startGame}>Play again</div>}
            <div className={style.grid_container}>
                {allimages.map((image, index) => {
                    return <div>
                        <Card key={image.id} className card={image}
                            handleClick={handleCardClick}
                            disable={disable}
                            turn={image === cardSelected1 || image === cardSelected2 || image.solved} ></Card>
                    </div>
                })}
            </div>
        </div>
    )
}