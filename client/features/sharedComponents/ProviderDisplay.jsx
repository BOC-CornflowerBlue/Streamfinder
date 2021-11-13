import React from 'react';
import './ProviderDisplay.css'
const ProviderDisplay = (props) => (

  <div className='provider-container'>
  {props.providers.map((p, i) => {
    if (p !== undefined) {
      return (<img key={i}className="provider-image"src={p}/>)
    }
  })}
  </div>
)



export default ProviderDisplay