import { useState } from 'react'
import useCurrencyinfo from './Hooks/useCurrencyinfo'

import './App.css'
import InputBox from './Components/InputForm.jsx'

function App() {
  const [amount, setAmount] = useState('')
  const [to,setTo] = useState("inr")
  const [from,setForm] = useState("usd")
  const [convertedamount,setConvertedamount] = useState('')
  const [converting, setConverting] = useState(false);

  const currencyinfo2 = useCurrencyinfo(to)
  const currencyinfo = useCurrencyinfo(from)

  const options = Object.keys(currencyinfo)
  const optionsTo = Object.keys(currencyinfo2)

  const convert = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from.toUpperCase()}&to=${to.toUpperCase()}`
      );
      const data = await res.json();

      setConvertedamount(data.rates[to.toUpperCase()]);
    } catch (error) {
      console.error("Error Fetching", error);
    } finally {
      setConverting(false);
    }
  };

  const swap = () =>{
    setForm(to)
    setTo(from)
    setConvertedamount(amount)
    setAmount(convertedamount)
  }
  
  return (
   
   <div
        className="w-screen bg-red-500 h-screen flex flex-wrap justify-center items-center overflow-x-hidden bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images4.alphacoders.com/133/1338472.png')`,
        }}
    >
        <div className="w-[100%]">
            <div className="w-[100%] max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convert()
                       
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(currency) => setForm(currency)}
                            selectCurrency={from}
                            onAmountChange={(amount) => setAmount(amount)}
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedamount}
                            currencyOptions={optionsTo}
                            onCurrencyChange={(currency) => setTo(currency)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {from.toUpperCase()} to {to.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
   
  )
}

export default App





