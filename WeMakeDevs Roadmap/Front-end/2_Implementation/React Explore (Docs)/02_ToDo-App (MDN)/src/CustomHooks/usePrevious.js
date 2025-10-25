import { useRef, useEffect } from 'react';

// Custom hook: usePrevious() returns previous value of state

function usePrevious(value) {
  const ref = useRef(); // 1. On each render, this line executes. 
  // 'useRef()' either creates a new ref object (on the first render) 
  //  or, on subsequent renders, returns the same ref object from the previous render.

  useEffect(() => { ref.current = value }); // 3. On each update (after each call/render), due to absence of dependency array, this useEffect updates the 'current' property (updates previous value based on current value of passed prop)

  return ref.current; // 2. Returns the present value of the 'current' property, from the ref object. This will return the previous data of 'value'.
}

// In above case, we are simply using the ref as a container to hold the previous value (data persistence) across renders and no state is directly involved.

export default usePrevious;