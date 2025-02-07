import { useEffect, useState } from 'react'
import Select from './Select'
import Input from './Input '
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export type CurrencyType = {
  currency: string,
  date: string,
  price: number,
}

type AmountInputType = {
  InputAmount: number
}

const schema = yup.object().shape({
  InputAmount: yup.number()
    .required("Input Amount is required")
    .typeError("Input Amount must be a number")
})

const getListOfCurrency = (currencyList: Array<CurrencyType>) => {
  return currencyList.map((item) => item.currency)
}

const CurrencySwap = () => {
  const [ currencyList, setCurrencyList]=  useState<Array<CurrencyType>>([]);
  const [ currencyFromSelected, SetCurrencyFromSelected ] = useState<CurrencyType>({
    currency: "USD",
    date: "2023-08-29T07:10:30.000Z",
    price: 1,
  })
  const [ currencyToSelected, SetCurrencyToSelected ] = useState<CurrencyType>({
    currency: "USDC",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.989832,
  })
  
  const [inputAmount, setInputAmount]= useState<number>(1);
  const outputAmountDefault = (currencyToSelected.price / currencyFromSelected.price);
  const [outputAmount, setOutputAmount] = useState<number>(outputAmountDefault);

  useEffect(() => {
    const outputAmountResult = (currencyToSelected.price / currencyFromSelected.price) * inputAmount;
    setOutputAmount(outputAmountResult);
  }, [inputAmount, currencyFromSelected, currencyToSelected])

  const methods = useForm<AmountInputType>({
    resolver: yupResolver(schema),
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

  const handleGetInputValue = (data: AmountInputType) => {
    setInputAmount(data.InputAmount);
  }

  return (
    <>
      <div>
        <div className="text-blue-500 mb-10 uppercase font-bold text-2xl">Currency Swap</div>    
        <form onSubmit={methods.handleSubmit(handleGetInputValue)}>
          <FormProvider {...methods}>
            <div className='flex gap-2.5 mb-7 items-center text-gray-600'>
              <h5>Swap</h5>
              <div>From</div>
                <Select 
                  options={getListOfCurrency(currencyList)} 
                  className="bg-blue-200" 
                  onSelect={onChangeCurrencyFrom}
                  selected = {currencyFromSelected.currency}
                />
              <div className='ms-5'>To</div>
                <Select 
                  options={getListOfCurrency(currencyList)} 
                  className="bg-blue-200" 
                  onSelect={onChangeCurrencyTo}
                  selected = {currencyToSelected.currency}
                />
            </div>
            
            <div className="flex flex-col gap-5 items-center mb-5">
              <Input 
                id='input-amount'
                name='InputAmount'
                value = {inputAmount.toString()}
                labelClassName="block text-gray-600 text-sm font-bold mb-2 w-50"
                inputClassName="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                labelName='Amount to send'
                placeholder='Amount to send'
                type='text'
              />
              <Input 
                id='output-amount'
                name ='OutputAmount'
                value = {outputAmount.toFixed(5)}
                labelClassName="block text-gray-600 text-sm font-bold mb-2 w-50"
                inputClassName="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                labelName='Amount to receive'
                placeholder='Amount to receive'
                type='text'
                disable= {true}
              />
            </div>
            <button className='bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>CONFIRM SWAP</button>
          </FormProvider>
      </form>  
      </div>
      
    </>
  )
}

export default CurrencySwap;