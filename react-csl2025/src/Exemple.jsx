import React from 'react'
import { useState } from 'react'

const Exemple = () => {
    const [count, setCount] = useState(0);
    return <div>
        <p>Valeur actuelle = {count}</p>
        <button onClick={() => setCount((prevCount)=>prevCount+1)}>Incrémenter</button>
        <button onClick={() => setCount(0)}>Reinitialiser</button>
    </div>
}

export default Exemple