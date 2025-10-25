import { useState } from 'react'

function App() {

  const [counter, setCounter] = useState(5);

  function addOne() {
    if(counter == 20) return;

    // Here we see batched updates in action
    // All the state updates will be sent as one batch and the final update will be used to update state
    setCounter(counter + 1); 
    setCounter(counter + 1); 
    setCounter(counter + 1); 
    setCounter(counter + 1);  
    // The counter will still increment by 1 on every click
    console.log('addOne used');
  }

  function addFour() {
    if(counter >= 17) return;
    
    // Here we will see how to bypass the behavior if we need to apply all updates in the batch
    setCounter(prevCounter => prevCounter + 1);
    setCounter(prevCounter => prevCounter + 1);
    setCounter(prevCounter => prevCounter + 1);
    setCounter(prevCounter => prevCounter + 1);
    // Here, counter will increment by 4
    console.log('addFour used');
  }

  function useRandomAddFunc() {
    return (Math.random() > 0.5)? addOne(): addFour();
  }

  function subtractOne() {
    if(counter == 0) return;
    setCounter(counter - 1);
  }

  const styleObj1 = {color: 'green'};
  const styleObj2 = {color: 'red'};

  return (
    <>
      <h1>Counter: {counter}</h1>
      <button onClick={useRandomAddFunc} style={styleObj1}>Add Value ({counter})</button><br />
      <button onClick={subtractOne} style={styleObj2}>Subtract Value ({counter})</button>
      <p>Current value is: {counter}</p>
    </>
  )
}

export default App
