import React, { useEffect, useRef, useState } from 'react'
import '../css/box.css'
import { images } from './Images';
export default function Box() {
    const renderCount = useRef(0);
    const [name, setname] = useState(true)
    const [allimages, setAllImages] = useState(images.concat(images))
    const [activeImage, setActiveImage] = useState([])

    const similar = () => {

    }

    const unflip = (img_index) =>{
        console.log('called unflip')
            images.forEach(function(image, index){
                document.getElementById(image.title+img_index).classList.add('hide')
            })
    }
    // count number of renders
    useEffect(()=>{
        renderCount.current = renderCount.current + 1

        // timeout for flip
        const timer = setTimeout(() => {
          }, 2000);
          return () => clearTimeout(timer);

    })
    const flip = (image, index) => {
        if ((renderCount.current+1)%2==0){
            unflip(index)
        }
        if (!image.display){
            let id = image.title+index
            console.log('called flip', id)
            document.getElementById(id).classList.remove('hide')
            image.display = true
            setname(!name)
        }
    }
    console.log('count: ', renderCount.current)

    return (
    <div className='container'>
        <div className='grid-container'>
            {allimages.map((image, index)=>{
                return <div className='grid-item' onClick={()=>flip(image, index)}>
                    <img src={image.location} className='hide' id={image.title+index}></img>
                </div>
            })}
        </div>
    </div>
    
  )
}