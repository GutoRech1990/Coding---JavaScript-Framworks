import React from 'react'

const App = () => {
  const name = "José"
  const a = 5
  const b = 10
  const noms = ['José', 'Marie', 'Jean', 'Pierre']
  return (
    <div style={{ border: '1px solid red', backgroundColor: 'pink' }}>
      App
      <h1>Bonjour {name}</h1>
      <p>Resultat: {a + b}</p>
      <ul>
        {noms.map((nom, index) => (
          <li key={index}>{nom}</li>
        ))}
      </ul>
    </div>
  )
}

export default App