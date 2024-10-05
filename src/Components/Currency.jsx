import React, { useState } from 'react'
import '../css/currency.css'
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import axios from 'axios';

let BASE_URL = "https://api.freecurrencyapi.com/v1/latest"
let API_KEY = import.meta.env.VITE_API_KEY;
console.log(API_KEY); // your_secret_api_key in the .env file


function currency() {

  const [amount, setAmount] = useState(0)
  const [fromCurreny, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('TRY')
  const [result, setResult] = useState(0)

  const exchange = async () => {
    if (amount > 0) {
      const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurreny}`)
      const data = response.data.data
      
      const total = amount * data[toCurrency]
      setResult(total.toFixed(4))  
    } else {
      console.log('Amount degeri 0 ya da eksi bir deger girildigi için api istek bile atılmadı. Sonuc direkt 0 olarak gosterildi')
      setResult(0)
    }
  }

  return (
    <div className='currency-wrapper'>
      
      <h3 className='title'>DÖVIZ KURU UYGULAMASI</h3>

      <hr style={{ width: '100%', margin: '0'}} />
      
      <div className='currency-div'>
        <input
          value={amount}
          onChange={(e)=>setAmount(e.target.value)}
          type="number" className='amount' placeholder='Type a number' min={0} />
      
      <select onChange={(e)=>setFromCurrency(e.target.value)} name="" id="" className='from-currenct-option'>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="TRY">TL</option>
      </select>

      <FaRegArrowAltCircleRight id='arrow' style={{color: 'white', fontSize:'2rem', margin:'0 .5rem'}}/>

      <select onChange={(e)=>setToCurrency(e.target.value)} name="" id="" className='to-currenct-option'>
        <option value="TRY">TL</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>

      <input value={result} onChange={(e)=>setResult(e.target.value)} type="number" className='result' readOnly={true} />

      </div>

      <button onClick={exchange} className='convert-btn'>Çevir</button>

    </div>
  )
}

export default currency