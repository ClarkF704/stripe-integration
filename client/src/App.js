import React from 'react'
import './App.css';
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import { toast } from 'react-toastify'

toast.configure()

function App() {
  const [product] = React.useState({
    name: 'Product Number One',
    price: '99.00'
  })
  async function handleToken(token){
    // console.log(token, addresses)
    const response = await axios.post('http://localhost:8080/checkout', {
      token,
      product
    })
    const {status} = response.data
    if(status === "success"){
      toast("Success ! Check email for details", {type: 'success'})
    } else {
      toast("Failure ! Something went wrong ):", {type: 'error'})
    }
  }
  return (
    <div className="App">
      <h1>{product.name}</h1>
      <h2>{product.price}</h2>
      <StripeCheckout
      stripeKey={"your public api key here"}
      token={handleToken}
      billingAddress
      shippingAddress
      amount={product.price * 100}
       />
    </div>
  );
}

export default App;
