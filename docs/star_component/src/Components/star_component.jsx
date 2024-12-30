import './star.css';
import { useState } from 'react';
import {Data} from './star'

export function Star() {
    const [rating, setRating] = useState(0);
    const [hoverIndex, setHoverIndex] = useState(0);
    const [data,setData] = useState(null);

    const handleHover = (index) => {
        setHoverIndex(index);
    };

    const handleLeave = () => {
        setHoverIndex(rating);
    };

    const handleClick = (index) =>{
        setRating(index);
        setHoverIndex(index);
        setData(()=>Data[index-1]);
    }

    return (
        <div className='flex flex-col w-80 p-2 rounded rating'>
            <h1 className="text-center font-semibold">How many stars would you give to our Online Code Editor?</h1>
            <div className="flex gap-3 justify-center stars-container my-2" onMouseLeave={handleLeave}>
                {[1, 2, 3, 4, 5].map((index) => (
                    <span
                        key={index}
                        className={`star ${index <= hoverIndex ? "star-filled" : ""}`}
                        onMouseOver={() => handleHover(index)}
                        onMouseLeave={handleLeave}
                        onClick={()=>handleClick(index)}
                        style={{
                            cursor:"pointer",
                            
                        }}
                    >
                        &#9733;
                    </span>
                ))}
            </div>
            <div className=" text-center self-end my-2 text-sm font-thin">{data}</div>
        </div>
    );
}



