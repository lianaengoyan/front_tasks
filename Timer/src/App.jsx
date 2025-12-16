import { useState } from "react";
import Timer from "./components/Timer";

export default function App () {
  const [timer, setTimer] = useState([]);

  const createTimer = () => {
    const newTimer = {id: Date.now(), initialValue: Math.floor(Math.random() * 500)};
    
    setTimer(prev => [...prev, newTimer]);
  };

  const deleteTimer = (id) => {
    setTimer(prev => prev.filter(t => t.id !== id));
  }

  const duplicateTimer = (id) => {
    const timerToDup = timer.find(t => t.id === id);
    if(timerToDup) {
      const newTimer = {...timerToDup, id: Date.now()};
      setTimer(prev => [...prev, newTimer]);
    }
  }

  return (
    <div className="boardContainer">
      <button onClick={createTimer} className="createT">Create Timer</button>
      {
        timer.map(t => (
          <Timer key={t.id}
                 id={t.id}
                 initialValue={t.initialValue}
                 onDel={deleteTimer}
                 onDup={duplicateTimer}
          />
        ))
      }
    </div>
  )

}