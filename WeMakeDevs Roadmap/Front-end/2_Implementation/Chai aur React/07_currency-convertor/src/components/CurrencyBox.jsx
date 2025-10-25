import { useId } from 'react';

// useId can be used for optimization
// mostly used for efficiently designing accesibility flow via tab-key presses
// should NOT be used to generate unique IDs for list/loop element or maps

function CurrencyBox({
    labelText,
    currency,
    onCurrencyChange,
    amount,
    onAmountChange,
    amountDisable,
    currencyOptions
}) {
    const amountInputId = useId();
    const selectedCurrency = currency.toLowerCase();

    return (
        <div className='flex justify-between p-3 bg-white text-gray-500 rounded-lg w-11/12'>
            <div className='flex flex-col gap-y-3'>
                <label htmlFor={amountInputId}>
                    {labelText}
                </label>
                <input
                    id={amountInputId}
                    className="text-black"
                    type="text"
                    name="amount"
                    value={amount}
                    onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
                    disabled={amountDisable} />
                {/* 
                    Here,
                    onChange={.....} -> Checks if method is not defined or null 
                    disabled={...} -> Enables or Stops the user from providing input in the input box.
                */}
            </div>

            <div className='flex flex-col gap-y-3 items-end'>
                <label htmlFor="currency-list">
                    Currency Type
                </label>
                <select
                    className="text-black w-16 p-2 rounded-md"
                    name="currency-list"
                    value={selectedCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value.toUpperCase())}
                >

                    {currencyOptions.map(curr => <option key={curr} value={curr}>{curr}</option>)}
                    {/* keys are used inside loops to enchance React's performance */}
                </select>
            </div>
        </div>
    )
}

export default CurrencyBox;