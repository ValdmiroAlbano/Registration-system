/* eslint-disable react/prop-types */
import "./Input.css"

function Input({type, placeholder, value, onChange}) {
  return (
    <input 
    type={type}
    placeholder={placeholder}
    value={value} 
    onChange={onChange} 
    className="input_style"
    />
    
  )
}

export default Input