import React, { useEffect, useRef, useState } from 'react'
import '../css/box.css'
export default function Box() {
    const renderCount = useRef(1);
    const [name, setname] = useState(true)

    const unflip = (id) =>{
        document.getElementById('elon').classList.remove('flip')
        setname(!name) //Changing state for flip
    }
    // count number of renders
    useEffect(()=>{
        renderCount.current = renderCount.current + 1

        // timeout for flip
        const timer = setTimeout(() => {
            console.log('calling unflip')
            unflip('elon');
          }, 2000);
          return () => clearTimeout(timer);

    })
    const flip = () => {
        document.getElementById("elon").classList.add('flip')
        setname(!name) //chnaging state for flip
    }

    return (
    <div className='container'>
        <div className='grid-container'>
            <div className='grid-item'>
                <div className='elon' id="elon" onClick={()=>{flip()}}></div>
            </div>
            <div className='grid-item'>Item1</div>
            <div className='grid-item'>Item2</div>
            <div className='grid-item'>Item3</div>
            <div className='grid-item'>Item4</div>
            <div className='grid-item'>Item5</div>
            <div className='grid-item'>Item6</div>
            <div className='grid-item'>Item7</div>
            <div className='grid-item'>Item8</div>
            <div className='grid-item'>Item9</div>
            <div className='grid-item'>Item10</div>
            <div className='grid-item'>Item11</div>
            <div className='grid-item'>Item11</div>
            <div className='grid-item'>Item11</div>
            <div className='grid-item'>Item11</div>
            <div className='grid-item'>Item11</div>
        </div>
    </div>
    
  )
}