import { useState } from 'react'

const colorsArr = ['red', 'green', 'blue', 'olive', 'gray', 'yellow', 'pink', 'purple', 'lavender', 'white', 'black'];
const diffTextColorNames = ["white", "lavender", "yellow", "pink"];

function App() {

  const [color, setColor] = useState('white');

  return (
    <>
      {/* We can pass a style object to adjust style */}
      <div className="w-full h-screen duration-200" style={{ backgroundColor: color }}>
        <div className="fixed flex flex-wrap justify-center bottom-4 inset-x-0 m-4 rounded-md">
          <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
            {
              colorsArr.map((color) =>
                <button
                  className="outline-none px-4 py-1 rounded-full shadow-lg text-white"
                  style={{ 
                    backgroundColor: color, 
                    color: (diffTextColorNames.indexOf(color) < 0)? "white": "black"
                  }} 
                  onClick={() => setColor(color)}
                >
                  {color[0].toUpperCase() + color.slice(1)}
                </button>
              )
            }
            
          </div>
        </div>
      </div>

    </>
  )
}

export default App
