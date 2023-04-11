import React, { useEffect, useRef, useState } from 'react'
import style from '../css/box.module.css'
import { images } from './Images';
export default function Box() {
    const [allimages, setAllImages] = useState(() => images.sort(() => Math.random() - 0.36));
    const [activeImage, setActiveImage] = useState([]);
    const [unactiveImages, setUnactiveImages] = useState(0);
    const [moves, setMoves] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timer, setTimer] = useState(null);
    const [modal, setModal] = useState(false);
    const [playAgain, setPlayAgain] = useState(false);
    // console.log('img: ',allimages)

    // Count Time
    useEffect(() => {
        if (moves === 1) {
            setTimer(setInterval(() => {
                setSeconds(i => i + 1)
            }, 1000))
        }

    }, [moves]);

    useEffect(() => {
        console.log('unactiveImages: ', unactiveImages)
        if (unactiveImages === 16){
            checkWin()
        }
    })
    // Stop Time On Win
    const stopTime = () => {
        clearInterval(timer)
        setTimer(null)
    }


    // CHeck winning Condition
    const checkWin = () => {
        if (unactiveImages === 16)
            stopTime()
            // set the playAgain state to True
            setPlayAgain(true)
    }

    // Reset the game
    const reset = () => {
        setAllImages(() => images.sort(() => Math.random()*0.36));
        setUnactiveImages(0);
        setMoves(0);
        setSeconds(0);
        setTimer(null);

        // Make playgame true to show game
        setPlayAgain(false)
    }

    const similar = (image) => {
        if (activeImage) {
            let [img1, img2] = activeImage
            if (img1 !== undefined && img2 !== undefined)
                if (img1?.title == img2?.title) {
                    console.log('called simi', img1.index, img2.index)

                    // Removing the image from img element and adding solved style to parent element
                    document.getElementById(img1.title + img1.index).classList.add(style.hide)
                    document.getElementById(img1.title + img1.index + '_c').classList.add(style.solved)
                    document.getElementById(img2.title + img2.index).classList.add(style.hide)
                    document.getElementById(img2.title + img2.index + '_c').classList.add(style.solved)

                    // Setting the images which are solved to true, it will be used before flipping os images
                    let img_object1 = allimages.findIndex((image => image.title == img1.title));
                    allimages[img_object1].solved = true
                    console.log('fff: ', img_object1, allimages[img_object1])
                    let img_object2 = allimages.findIndex((image => image.title == img2.title)); // Jan's method: a.indexOf(99, a.indexOf(99) + 1)
                    allimages[img_object2].solved = true
                    // console.log('fff: ',img_object2,allimages[img_object2])
                    // getting the index of other image of pair
                    var img2_index = 0
                    allimages.forEach(function (image, index) {
                        if (image.title == img2.title && img_object1 !== index) {
                            img2_index = index
                        }
                    })
                    allimages[img2_index].solved = true
                    setUnactiveImages(unactiveImages + 2)
                }

        }
    }

    const unflip = (img_index) => {
        images.forEach(function (image, index) {
            // console.log('called unflip', image.title+index)
            document.getElementById(image.title + index).classList.add(style.hide)
            image.display = false
            activeImage.pop()
        })
    }

    useEffect(() => {
        // timeout for flip
        const timer = setTimeout(() => {
        }, 2000);
        return () => clearTimeout(timer);

    })
    useEffect(() => {
        if (activeImage.length === 2) {
            setTimeout(similar, 500);
        }
    }, [activeImage]);

    const flip = (image, index) => {
        // console.log('index: ', index)
        if ((moves) % 2 == 0) {
            // similar()
            unflip(index)
            similar(image)
        }
        if ((moves) % 2 == 0) {
            // similar(image)
            // unflip(index)
        }
        if (!image.display && !image.solved) {
            setMoves(moves + 1)
            let id = image.title + index
            let [img1, img2] = activeImage
            // console.log('called flip', id)
            document.getElementById(id).classList.remove(style.hide)
            image.display = true
            setActiveImage([...activeImage, { 'title': image.title, 'index': index }])
        }
    }

    return (
        <div className={style.container} style={{ backgroundColor: '#f4dcdc' }}>
            {playAgain
                &&
                <div>
                    <div className={style.text}>You won</div>
                    <div className={style.reset} style={{padding:"0px"}} onClick={()=>{reset()}}>Play Again?</div>
                </div>}
            {!playAgain
                &&
                <>
                    <div className={style.play_score}> Move: {moves}   Time: {seconds} seconds</div>
                    <div className={style.grid_container}>
                        {allimages.map((image, index) => {
                            return <div id={image.title + index + '_c'} className={style.grid_item} onClick={() => flip(image, index)}>
                                <img src={image.location} className={style.hide} id={image.title + index} key={index}></img>
                            </div>
                        })}
                    </div>
                </>
            }
        </div>

    )
}