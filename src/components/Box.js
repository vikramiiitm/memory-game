import React, { useEffect, useRef, useState } from 'react'
import style from '../css/box.module.css'
import { images } from './Images';
export default function Box() {
    const renderCount = useRef(0);
    const [name, setname] = useState(true)
    const [allimages, setAllImages] = useState(images)
    const [activeImage, setActiveImage] = useState([])
    const [unactiveImages, setUnactiveImages] = useState([])

    const similar = (image) => {
        if(activeImage){
            let [img1, img2] = activeImage 
            if(img1!==undefined && img2!==undefined)
            if (img1?.title==img2?.title){
                console.log('called simi', img1.index, img2.index)
                
                // Removing the image from img element and adding solved style to parent element
                document.getElementById(img1.title+img1.index).classList.add(style.hide)
                document.getElementById(img1.title+img1.index+'_c').classList.add(style.solved)
                document.getElementById(img2.title+img2.index).classList.add(style.hide)
                document.getElementById(img2.title+img2.index+'_c').classList.add(style.solved)

                // Setting the images which are solved to true, it will be used before flipping os images
                let img_object1 = allimages.findIndex((image => image.title == img1.title));
                allimages[img_object1].solved = true
                console.log('fff: ',img_object1,allimages[img_object1])
                let img_object2 = allimages.findIndex((image => image.title == img2.title)); // Jan's method: a.indexOf(99, a.indexOf(99) + 1)
                allimages[img_object2].solved = true
                console.log('fff: ',img_object2,allimages[img_object2])
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
    // count number of renders
    useEffect(() => {
        renderCount.current = renderCount.current + 1

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
        if ((renderCount.current + 1) % 2 == 0 ) {
            // similar()
            unflip(index)
        }
        if ((renderCount.current) % 2 == 0) {
            similar(image)
            // unflip(index)
        }
        if (!image.display && !image.solved) {
            let id = image.title + index
            let [img1, img2] = activeImage 
            // console.log('called flip', id)
            document.getElementById(id).classList.remove(style.hide)
            image.display = true
            setActiveImage([...activeImage,{'title':image.title,'index':index}])
        }
    }

    return (
        <div className={style.container} style={{backgroundColor:'#f4dcdc'}}>
            <div className={style.play_score}> Move: {renderCount.current}</div>
            <div className={style.grid_container}>
                {allimages.map((image, index) => {
                    return <div id={image.title+index+'_c'} className={style.grid_item} onClick={() => flip(image, index)}>
                        <img src={image.location} className={style.hide} id={image.title+index}></img>
                    </div>
                })}
            </div>
        </div>

    )
}