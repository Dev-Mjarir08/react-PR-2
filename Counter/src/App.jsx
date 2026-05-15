import React, { useEffect, useState } from "react";
import "./App.css"

const App = () => {
    const [count, setCount] = useState(0);
    const [number, setNumber] = useState(1);

    const increment = () => {
        setCount(count + (number <= 0 ? 1 : number));
        localStorage.setItem('counter', JSON.stringify(count))
    };

    const decrement = () => {
        setCount(count - (number <= 0 ? 1 : number));
        localStorage.setItem('counter', JSON.stringify(count))
    };

useEffect(()=>{
    let oldCount = JSON.parse(localStorage.getItem('counter'))
    setCount(oldCount)
},[])

    return (
        <div className="counter-container">
    <div className="counter-box">

        <p className="count-text">
            Count: <span>{count}</span>
        </p>

        <input
            className="input-field"
            type="number"
            onChange={(e) =>
                setNumber(Number(e.target.value) || 1)
            }
        />

        <div className="button-group">
            <button
                className="btn increment-btn"
                onClick={increment}
            >
                Increment
            </button>

            <button
                className="btn decrement-btn"
                onClick={decrement}
                disabled={count <= 0}
            >
                Decrement
            </button>

            <button
                className="btn reset-btn"
                onClick={() => setCount(0)}
            >
                Reset
            </button>
        </div>

    </div>
</div>
    );
};

export default App;