import "./Button.css"

// eslint-disable-next-line react/prop-types
function Button({Text, onClick, type = "button"}) {
  return (
    <button className="btn-style" type={type} onClick={onClick}>
      {Text} 
    </button>
  )
}

export default Button