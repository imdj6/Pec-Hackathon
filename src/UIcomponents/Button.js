import React from 'react'
import './Button.css'
function Button(props) {
  const Icon=props.icon;
  return (
    <button onClick={props.clickHandler} className={"button "+(props.active ? "active-button" : "cta-button")}
    style={props.properties}>
        <span className='icon'><Icon size='1.3rem'/></span>
        {props.buttonText}
    </button>
  )
}

export default Button