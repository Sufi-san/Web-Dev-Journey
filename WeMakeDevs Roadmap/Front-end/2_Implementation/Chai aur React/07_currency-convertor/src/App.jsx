import { useState } from 'react';
import background from './assets/bg-image.jpg'
import { CurrencyBox } from './components/'; // 'index' file gets called by default
import useCurrencyInfo from './hooks/useCurrencyInfo' // importing custom hook


function App() {

  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [firstCurr, setFirstCurr] = useState('USD');
  const [secondCurr, setSecondCurr] = useState('INR');

  const currencyInfo = useCurrencyInfo(firstCurr.toLowerCase()); // returns a 'state' value
  const currencyOptions = Object.keys(currencyInfo);

  const swapCurrency = function () {
    setFirstCurr(secondCurr);
    setSecondCurr(firstCurr);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
    // temp variable won't be required as the change will not be made immediately 
  }

  const convertAmount = function () {
    setConvertedAmount((amount * currencyInfo[secondCurr.toLowerCase()]).toFixed(2));
  }

  return (
    <div
      className="w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>

      <div
        className='flex flex-col items-center py-5 rounded-lg bg- w-1/3 min-w-96 gap-y-2 border-white border-2' 
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
      >

        <CurrencyBox
          labelText="From"
          currency={firstCurr}
          onCurrencyChange={setFirstCurr}
          currencyOptions={currencyOptions}
          amount={amount}
          onAmountChange={setAmount}
          amountDisable={false}
        />

        <button
          className='text-white bg-blue-700 rounded-md px-2 -m-5 z-10 border-white border-2 py-0.5'
          onClick={() => swapCurrency()}
        >
          swap
        </button>

        <CurrencyBox
          labelText="To"
          currency={secondCurr}
          onCurrencyChange={setSecondCurr}
          currencyOptions={currencyOptions}
          amount={convertedAmount}
          onAmountChange={setConvertedAmount}
          amountDisable={true}
        />

        <button
          className='text-white bg-blue-700  rounded-md opacity-100 py-3 mt-2 w-11/12'
          onClick={() => convertAmount()}
        >
          Convert {firstCurr} to {secondCurr}
        </button>

      </div>

    </div>
  )
}

export default App
