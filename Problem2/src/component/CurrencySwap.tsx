import { useEffect, useState } from 'react'
import Select from './Select'

export type CurrencyType = {
  currency: string,
  date: string,
  price: number,
}

const getListOfCurrency = (currencyList: Array<CurrencyType>) => {
  return currencyList.map((item) => item.currency)
}

const CurrencySwap = () => {
  const [ currencyList, setCurrencyList]=  useState<Array<CurrencyType>>([]);
  const [ currencyFromSelected, SetCurrencyFromSelected ] = useState<CurrencyType>({
    currency: "",
    date: "",
    price: 0,
  })
  const [ currencyToSelected, SetCurrencyToSelected ] = useState<CurrencyType>({
    currency: "",
    date: "",
    price: 0,
  })

  const onChangeCurrencyFrom = (option: string) => {
    const selectedCurrencyFrom = currencyList.find(x => x.currency === option);
    if (selectedCurrencyFrom) {
      SetCurrencyFromSelected(selectedCurrencyFrom);
    }
  }
  const onChangeCurrencyTo = (option: string) => {
    const selectedCurrencyTo = currencyList.find(x => x.currency === option);
    if (selectedCurrencyTo) {
      SetCurrencyToSelected(selectedCurrencyTo);
    }
  }

  useEffect(() => {
    fetchCurrencyData()
  }, [])

  const fetchCurrencyData = async () => {
    const response = await fetch("https://interview.switcheo.com/prices.json");
    if (response.ok)
    {
      const data = await response.json();
      setCurrencyList(data);
    }
  }

  console.log("currency from: ", currencyFromSelected);
  console.log("currency to: ", currencyToSelected); 

  return (
    <>
      <div>
        <div className="text-blue-500 mb-10 uppercase font-bold text-lg">Currency Swap</div>    
        <form >
          <div className='flex gap-2.5 mb-5'>
            <h5>Swap</h5>
            <div>From</div>
              <Select options={getListOfCurrency(currencyList)} className="bg-amber-200" onSelect={onChangeCurrencyFrom}/>
            <div>To</div>
              <Select options={getListOfCurrency(currencyList)} className="bg-amber-200" onSelect={onChangeCurrencyTo}/>
          </div>
          
          {/* <label htmlFor="input-amount">Amount to send</label>
          <input id="input-amount" />
          <label htmlFor="output-amount">Amount to receive</label>
          <input id="output-amount" /> */}

          
          <div className="grid grid-cols-3 gap-5 items-center mb-5">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="input-amount">
              Amount to send
            </label>
            <input className="col-span-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="input-amount" type="text" placeholder="Amount to send"/>
          
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="output-amount">
              Amount to receive
            </label>          
            <input className="bg-gray-300 col-span-2 shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="output-amount" type="password" placeholder="Amount to receive" disabled/>
            <p className="text-red-500 text-xs italic col-end-4 col-span-2">Please choose a correct format.</p>
          </div>
          
          <button className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>CONFIRM SWAP</button>
      </form>  
      </div>
      
    </>
  )
}

export default CurrencySwap;