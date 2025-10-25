import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

/* 
  function ReactElement() {
    const reactElement = {
      type: 'h1',
      props: {id: 'custom-app'},
      children: 'This is a heading'
    }
    return reactElement;
  }

  // Won't work if directly passed to render method
  // This is because, here we created a custom object of our own and the 'render' method defined by React always expects React's own custom object (ReactNode)
*/

// What will work then?:
function ElementJSX() {
  const elementUsingJSX = (
    <h1>This is a heading</h1>
  )
  return elementUsingJSX;
}

function ReactElement() {
  const reactElement = React.createElement(
    'h1', // type
    {id:'react-heading'}, // props
    'This is React Heading. ', // children
    randomTextFunc() // Evaluated Expressions
  );
  return reactElement;
}


function randomTextFunc() {
  const charArr = [], chars = 'abcdefghijklmnopqrstuvwxyz';
  for(let i = 0; i < chars.length; i++) {
    charArr.push(chars[parseInt(Math.random() * chars.length)]);
  }
  return charArr.join('');
}


createRoot(document.getElementById('root')).render(
    // ReactElement // will work if passed alone
    // elementUsingJSX // will work if passed alone
    <StrictMode>
      <App />
      <ElementJSX />
      <ReactElement />
    </StrictMode>
)
