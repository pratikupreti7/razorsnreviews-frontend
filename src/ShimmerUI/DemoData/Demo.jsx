import React from 'react'
import Data from '../Data/Data'
import './styles.css'
const Demo = () => {
  const numbers = [1, 2, 3, 4, 5, 6]
  return (
    <div className="data">
      <div className="data-list">
        {numbers.map((item) => (
          <Data key={item} />
        ))}
      </div>
    </div>
  )
}

export default Demo
