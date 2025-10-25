import Card from './Card'
// Props make component reusable
// In React, the flow of data is unidirectional: props can only be passed from parent components down to child components.
// The mindset when using react is to NOT segregate based on technology or syntax (HTML, CSS, JS) but to segregate based on what purpose a component serves

function App() {

  const cardDetails = {
    cardId: Math.floor(Math.random() * 400),
    cardPrice: Math.random().toFixed(2)
  }
  const greetFunc = function (message) {
    console.log('Greeting:', message);
  }
  // If in StrictMode, component rendering will execute twice.

  return (
    <>
      <h1 className="bg-green-200 text-black rounded-xl">Tailwind CSS Test</h1>
      <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
        <img
          className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto"
          src="https://tailwindcss.com/_next/static/media/sarah-dayan.de9b3815.jpg"
          alt=""
          width="384"
          height="512"
        />
        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
          <blockquote>
            <p className="text-lg font-medium">
              “Tailwind CSS is the only framework that I've seen scale
              on large teams. It’s easy to customize, adapts to any design,
              and the build size is tiny.”
            </p>
          </blockquote>
          <figcaption className="font-medium">
            <div className="text-sky-500 dark:text-sky-400">
              Sarah Dayan
            </div>
            <div className="text-slate-700 dark:text-slate-500">
              Staff Engineer, Algolia
            </div>
          </figcaption>
        </div>
      </figure>

      {/* Comment in JSX!! Shortcut: Ctrl + /

        The chosen prop names will be passed as 'keys' while the assigned evaluated expression from JS will be passed as the 'value' for the corresponding key.

        We can even pass functions and objects as values
        These key-value pairs will be assigned to the 'props' object which is a parameter that can be accessed inside the function that returns the component

        Thus, using props, we can pass data between components

        Note: We can pass string values without using the '{}' braces syntax
      */}
      <Card cardDetails={cardDetails} greetInConsole={greetFunc} strVal="Val1" strVal2={"Val2"} />
    </>
  )
}

export default App
