import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [strLen, setStrLen] = useState(8);
  const [hasNum, setHasNum] = useState(false);
  const [hasChar, setHasChar] = useState(false);
  const [text, setText] = useState('');

  // Creating a reference variable to store the reference to an element: (useRef)
  const textRef = useRef(null);

  // Optimizing for multiple function calls: (useCallback)
  // If no element of the 'dependencies' array has changed then same (memoized) callback will be used (no change in function definition)
  // We can understand this as:
  //    - Before executing instructions inside a function, an object of that function is created internally
  //    - If useCallback is NOT used, then on each render a new object of the function is created
  //    - This new object is stored in memory and has a 'different' reference pointing to it
  //    - To prevent the creation of a new object and hence a new reference when no dependency has changed, we use the useCallback() hook.
  // It can be used to:
  //    - Prevent unnecessary re-renders of child components that receive a function as a prop.
  //    - Prevent execution of the useEffect function if the another function is passed as a dependency.
  const textGenerator = useCallback(() => {
    let txt = [], str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if (hasNum) str = str.concat('0123456789');
    if (hasChar) str = str.concat(`!@#$%^&*()-_[]{}/\\|'"<>,.?+=~\``);

    for (let i = 0; i < strLen; i++) {
      const randomChar = str[Math.floor(Math.random() * str.length)];
      txt.push(randomChar);
    }

    setText(txt.join(''));

  }, [strLen, hasNum, hasChar, setText]); // setting 'setText' as a dependency is optional

  const copyTextToClipboard = useCallback(() => {
    // we can access clipboard via 'window.navigator.clipboard' and copy text in it using the method 'writeText()'
    window.navigator.clipboard.writeText(text);

    // making use of the reference of the component from which the text was copied to provide better feedback to user
    textRef.current?.select()
    // 'current' refers to the most recent text inside the component
    // '?' checks whether it is null or empty

    // to select custom range:
    // textRef.current?.setSelectionRange(2, 5);
  }, [text]);

  // Detecting change in states and rendering: (useEffect)
  // In React, the user doesn't handle the rendering of components, it is handled by React. We just need to focus on the change of states in our program while React will handle the rendering.
  // Similarly, to add a side-effect to each render of the component we can use the 'useEffect()' hook while we just need to pass dependencies to check for when the side-effect should execute.
  // The code inside the function passed to useEffect will be executed after the full rendering is complete and there is change in value of any dependency from the dependency array.
  useEffect(() => {
    textGenerator();
  }, [strLen, hasNum, hasChar, textGenerator])
  // setting 'textGenerator' as a dependency is optional
  // however, if we do pass it as a dependency, a useCallback on the dependency function must be used to prevent unnecessary execution of the useEffect function (like in this case, 'textGenerator' is enclosed in useCallback)
  // if useCallback is not used and the function is passed as dependency to useEffect:
  //    - textGenerator's internal object will change at every render
  //    - useEffect will detect this change and even if other dependencies haven't change, will still execute
  //    - inside textGenerator the the 'text' state will be updated again which will again rerender component
  //    - this will cause an infinite loop

  return (
    <div className='w-full h-screen bg-black flex justify-center'>
      <div className='flex flex-col gap-4 px-4 py-3 mt-8 h-fit w-fit bg-gray-800 rounded-md items-left'>
        <h1 className='text-white text-center text-3xl font-bold'>Random Text Generator</h1>
        <div className='flex h-8 w-[450px] '>
          <input
            className="bg-white rounded-l-md outline-none text-orange-600 px-3 py-1 h-full w-full text-md"
            value={text}
            readOnly
            ref={textRef}
          /> {/* <- storing input's reference in 'textRef' variable */}
          <button
            className='rounded-r-md text-white px-3 h-full bg-blue-700'
            onClick={() => copyTextToClipboard()}
          >
            copy
          </button>
        </div>
        <div className='flex items-center gap-2 text-orange-600 text-sm '>
          <input
            className='w-28 cursor-pointer'
            type="range"
            name='length'
            min={6}
            max={100}
            defaultValue={strLen}
            onChange={(e) => { setStrLen(e.target.value); }}
          />
          <label htmlFor="length">Length: {strLen}</label>
          <div className='flex gap-1'>
            <input
              type="checkbox"
              name="numbers"
              id="numbers"
              onClick={() => { setHasNum(prev => !prev); }}
            />
            <label className="mr-1.5" htmlFor="numbers">Numbers</label>
            <input
              type="checkbox"
              name="char"
              id="char"
              onClick={() => { setHasChar(prev => !prev); }}
            />
            <label htmlFor="char">Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
