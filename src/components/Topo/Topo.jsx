import { useEffect, useState } from "react";
import "./Topo.css"
const matrix = [0, 1, 2, 3];

const generateXY = () => ({ x: Math.floor(Math.random() * 4), y: Math.floor(Math.random() * 4) })
let stopTimer = false;
export default function Topo() {
    const [topoPosition, setTopoPosition] = useState(generateXY());
    const [count, setCount] = useState(0);
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        setTimeout(() => {
            const generatePosition = () => {
                const newTopoPosition = generateXY();
                if (newTopoPosition.x === topoPosition.x && newTopoPosition.y === topoPosition.y) {
                    generatePosition();
                } else {
                    setTopoPosition(newTopoPosition)
                }
            }

            if (!stopTimer) {
                generatePosition();
            }
        }, 500)
    }, [topoPosition])

    useEffect(() => {
        setTimeout(() => {
            if (timer === 0) {
                stopTimer = true;
            } else {
                setTimer(timer - 1)
            }
        }, 1000)
    }, [timer])

    return <div className="c-topo">
        <h2>Segundos: {timer}</h2>
        <h2>Contador: {count}</h2>
        <div className="c-topo__game">
            {matrix.map((x, xIndex) => matrix.map((y, yIndex) => <div className="c-topo__square" key={xIndex + " " + yIndex}>
                {x === topoPosition.x && y === topoPosition.y && <img onClick={() => !stopTimer && setCount(count + 1)} src="images/mole.png" alt="mole" draggable="false" />}
                {(x !== topoPosition.x || y !== topoPosition.y) && <img src="images/bg.jpg" alt="background" draggable="false" />}
            </div>)
            )}
        </div>
    </div>
}