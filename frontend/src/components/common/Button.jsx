function Button({text, onClick}) {
  return (
    <button 
      onClick={onClick ? ()=>onClick() : ()=>{}}
      className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >{text}</button>
  )
}

export default Button 