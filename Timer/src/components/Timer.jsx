import { useEffect, useState } from "react";
import "./Timer.css";

export default function Timer ({id, initialValue, onDel, onDup}) {
    const [count, setCount] = useState(initialValue);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if(count <= 0 || isPaused) return;

        const timeout = setTimeout(() => {
            setCount(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timeout);

    }, [count, isPaused]);

    return (
        <div className="container">
            <div className="rectangle"> {count} </div>

            <div className="btns">
                <button onClick={() => setIsPaused(!isPaused)}> 
                    {isPaused ? "Continue" : "Pause"}
                </button>
                <button onClick={() => onDel(id)}> Delete </button>
                <button onClick={() => onDup(id)}> Duplcate </button>
            </div>
        </div>
    )
}