import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StripeCheckout from "react-stripe-checkout"
import axios from 'axios';


function App() {
  const [product, setProduct] = useState({
    name:"React from FB",
    price:10,
    productBy:"facebook"
  })

  const makePayment = async (token) => {
    const formattedProduct = {
      ...product,
      price: Number(product.price) // Ensure price is a number
    };
  
    console.log("Sending product:", formattedProduct);
  
    try {
      const response = await axios.post('http://localhost:8000/payment', 
        { token, product: formattedProduct }, 
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      console.log("RESPONSE:", response);
      console.log("STATUS:", response.status);
    } catch (error) {
      console.error("ERROR:", error.response ? error.response.data : error.message);
    }
  };
  

  const apiKey = import.meta.env.VITE_API_KEY;
  


  return (
    <>
      <StripeCheckout stripeKey={apiKey}
        token={makePayment}
        name="Buy React"
        amount = {product.price * 100}
        >
        <button class="button-82-pushable" role="button">
          <span class="button-82-shadow"></span>
          <span class="button-82-edge"></span>
          <span class="button-82-front text">
          Buy React for {product.price}
          </span>
        </button>
      </StripeCheckout>
    </>
  )
}

export default App;